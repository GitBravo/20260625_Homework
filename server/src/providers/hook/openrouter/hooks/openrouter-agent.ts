/**
 * OpenRouter agent CLI for Pixel Agents.
 *
 * Interactive REPL that calls OpenRouter API and fires hook events to the
 * local Pixel Agents server so a character appears in the pixel office.
 *
 * Usage: node dist/hooks/openrouter-agent.js
 *
 * Requires:
 *   - Pixel Agents server running (npx pixel-agents)
 *   - ~/.pixel-agents/openrouter-config.json with { apiKey, model }
 *     OR environment variable OPENROUTER_API_KEY
 */

import * as crypto from 'crypto';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as os from 'os';
import * as path from 'path';
import * as readline from 'readline';

import { SERVER_JSON_DIR, SERVER_JSON_NAME } from '../../../../constants.js';
import { OPENROUTER_CONFIG_NAME, OPENROUTER_DEFAULT_MODEL } from '../constants.js';

// ── Config ──────────────────────────────────────────────────────

interface OpenRouterConfig {
  apiKey: string;
  model: string;
}

interface ServerConfig {
  port: number;
  token: string;
}

function loadConfig(): OpenRouterConfig {
  const apiKey =
    process.env['OPENROUTER_API_KEY'] ??
    (() => {
      const cfgPath = path.join(os.homedir(), SERVER_JSON_DIR, OPENROUTER_CONFIG_NAME);
      try {
        const raw = JSON.parse(fs.readFileSync(cfgPath, 'utf-8')) as Partial<OpenRouterConfig>;
        return raw.apiKey;
      } catch {
        return undefined;
      }
    })();

  if (!apiKey) {
    console.error(
      '[OpenRouter] API key not found.\n' +
        `Set OPENROUTER_API_KEY env var, or create ~/.pixel-agents/${OPENROUTER_CONFIG_NAME}:\n` +
        '  { "apiKey": "sk-or-v1-...", "model": "google/gemma-3-27b-it" }',
    );
    process.exit(1);
  }

  const model = (() => {
    const cfgPath = path.join(os.homedir(), SERVER_JSON_DIR, OPENROUTER_CONFIG_NAME);
    try {
      const raw = JSON.parse(fs.readFileSync(cfgPath, 'utf-8')) as Partial<OpenRouterConfig>;
      return raw.model ?? OPENROUTER_DEFAULT_MODEL;
    } catch {
      return OPENROUTER_DEFAULT_MODEL;
    }
  })();

  return { apiKey, model };
}

function loadServerConfig(): ServerConfig | null {
  const serverJsonPath = path.join(os.homedir(), SERVER_JSON_DIR, SERVER_JSON_NAME);
  try {
    return JSON.parse(fs.readFileSync(serverJsonPath, 'utf-8')) as ServerConfig;
  } catch {
    return null;
  }
}

// ── Hook event firing ────────────────────────────────────────────

function fireHook(server: ServerConfig, payload: Record<string, unknown>): void {
  const body = JSON.stringify(payload);
  const req = http.request({
    hostname: '127.0.0.1',
    port: server.port,
    path: '/api/hooks/openrouter',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
      Authorization: `Bearer ${server.token}`,
    },
    timeout: 2000,
  });
  req.on('error', () => {});
  req.on('timeout', () => req.destroy());
  req.end(body);
}

function fireHookAsync(server: ServerConfig, payload: Record<string, unknown>): Promise<void> {
  return new Promise((resolve) => {
    const body = JSON.stringify(payload);
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: server.port,
        path: '/api/hooks/openrouter',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
          Authorization: `Bearer ${server.token}`,
        },
        timeout: 2000,
      },
      (res) => {
        res.resume();
        res.on('end', resolve);
      },
    );
    req.on('error', resolve);
    req.on('timeout', () => {
      req.destroy();
      resolve();
    });
    req.end(body);
  });
}

// ── OpenRouter API call ──────────────────────────────────────────

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

async function callOpenRouter(
  apiKey: string,
  model: string,
  messages: Message[],
  onChunk: (text: string) => void,
): Promise<string> {
  const body = JSON.stringify({ model, messages, stream: true });

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'openrouter.ai',
        path: '/api/v1/chat/completions',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://github.com/pixel-agents-hq/pixel-agents',
          'X-Title': 'Pixel Agents',
        },
      },
      (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          let errBody = '';
          res.on('data', (c: Buffer) => (errBody += c.toString()));
          res.on('end', () => reject(new Error(`HTTP ${res.statusCode}: ${errBody}`)));
          return;
        }

        let buffer = '';
        let fullText = '';

        res.on('data', (chunk: Buffer) => {
          buffer += chunk.toString();
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data) as {
                choices?: Array<{ delta?: { content?: string } }>;
              };
              const text = parsed.choices?.[0]?.delta?.content ?? '';
              if (text) {
                fullText += text;
                onChunk(text);
              }
            } catch {
              /* ignore SSE parse errors */
            }
          }
        });

        res.on('end', () => resolve(fullText));
        res.on('error', reject);
      },
    );

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    req.end(body);
  });
}

// ── Main REPL ────────────────────────────────────────────────────

async function main(): Promise<void> {
  const config = loadConfig();
  const server = loadServerConfig();

  const sessionId = crypto.randomUUID();
  const cwd = process.cwd();

  if (server) {
    fireHook(server, {
      hook_event_name: 'SessionStart',
      session_id: sessionId,
      cwd,
    });
  }

  const modelShort = config.model.split('/').pop() ?? config.model;
  console.log(`\n🤖 OpenRouter Agent (${modelShort})`);
  if (!server) {
    console.log('⚠️  Pixel Agents server not running — visual office disabled');
    console.log('   Start it with: npx pixel-agents\n');
  } else {
    console.log('✓  Connected to Pixel Agents server\n');
  }
  console.log('Type your message and press Enter. Press Ctrl+C or type /exit to quit.\n');

  const messages: Message[] = [];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });

  const askQuestion = (): void => {
    rl.question('You: ', async (input) => {
      const trimmed = input.trim();
      if (!trimmed || trimmed === '/exit') {
        rl.close();
        return;
      }

      messages.push({ role: 'user', content: trimmed });

      if (server) {
        fireHook(server, {
          hook_event_name: 'PreToolUse',
          session_id: sessionId,
          tool_name: 'Thinking',
          tool_input: { prompt: trimmed },
        });
      }

      process.stdout.write('Agent: ');

      try {
        const reply = await callOpenRouter(config.apiKey, config.model, messages, (text) => {
          process.stdout.write(text);
        });
        process.stdout.write('\n\n');

        if (server) {
          fireHook(server, {
            hook_event_name: 'PostToolUse',
            session_id: sessionId,
            tool_name: 'Thinking',
          });
          fireHook(server, {
            hook_event_name: 'Stop',
            session_id: sessionId,
          });
        }

        messages.push({ role: 'assistant', content: reply });
      } catch (err) {
        process.stdout.write('\n');
        console.error(`[OpenRouter] Error: ${err instanceof Error ? err.message : String(err)}`);

        if (server) {
          fireHook(server, { hook_event_name: 'Stop', session_id: sessionId });
        }
      }

      askQuestion();
    });
  };

  let shuttingDown = false;
  const shutdown = (): void => {
    if (shuttingDown) return;
    shuttingDown = true;
    void (async () => {
      if (server) {
        await fireHookAsync(server, {
          hook_event_name: 'SessionEnd',
          session_id: sessionId,
          reason: 'exit',
        });
      }
      process.exit(0);
    })();
  };

  rl.on('close', () => {
    process.stdout.write('\nGoodbye!\n');
    shutdown();
  });

  process.on('SIGTERM', shutdown);
  process.on('SIGHUP', shutdown);

  askQuestion();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
