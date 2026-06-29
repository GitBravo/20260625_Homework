import type { AgentEvent, HookProvider } from '../../../../../core/src/provider.js';
import { OPENROUTER_TERMINAL_NAME_PREFIX } from './constants.js';

function formatToolStatus(toolName: string, _input?: unknown): string {
  switch (toolName) {
    case 'Thinking':
      return 'Thinking...';
    case 'Generating':
      return 'Generating response...';
    default:
      return `Using ${toolName}`;
  }
}

function normalizeHookEvent(
  raw: Record<string, unknown>,
): { sessionId: string; event: AgentEvent } | null {
  const eventName = raw.hook_event_name;
  const sessionId = raw.session_id;
  if (typeof eventName !== 'string' || typeof sessionId !== 'string') return null;

  switch (eventName) {
    case 'SessionStart':
      return {
        sessionId,
        event: {
          kind: 'sessionStart',
          cwd: typeof raw.cwd === 'string' ? raw.cwd : undefined,
        },
      };

    case 'SessionEnd':
      return {
        sessionId,
        event: {
          kind: 'sessionEnd',
          reason: typeof raw.reason === 'string' ? raw.reason : undefined,
        },
      };

    case 'PreToolUse': {
      const toolName = typeof raw.tool_name === 'string' ? raw.tool_name : 'Thinking';
      const toolInput =
        typeof raw.tool_input === 'object' && raw.tool_input !== null
          ? (raw.tool_input as Record<string, unknown>)
          : {};
      return {
        sessionId,
        event: {
          kind: 'toolStart',
          toolId: `hook-${Date.now()}`,
          toolName,
          input: toolInput,
        },
      };
    }

    case 'PostToolUse':
      return { sessionId, event: { kind: 'toolEnd', toolId: 'current' } };

    case 'Stop':
      return { sessionId, event: { kind: 'turnEnd' } };

    default:
      return null;
  }
}

export const openrouterProvider: HookProvider = {
  kind: 'hook',
  id: 'openrouter',
  displayName: 'OpenRouter',
  protocolVersion: 1,

  normalizeHookEvent,

  installHooks: () => Promise.resolve(),
  uninstallHooks: () => Promise.resolve(),
  areHooksInstalled: () => Promise.resolve(true),

  formatToolStatus,
  permissionExemptTools: new Set(),
  subagentToolNames: new Set(),
  readingTools: new Set(),
  terminalNamePrefix: OPENROUTER_TERMINAL_NAME_PREFIX,
};
