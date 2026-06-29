/**
 * OpenRouter provider constants.
 * Kept separate so server/ doesn't depend on OpenRouter unless it's the active provider.
 */

export const OPENROUTER_AGENT_SCRIPT_NAME = 'openrouter-agent.js';
export const OPENROUTER_TERMINAL_NAME_PREFIX = 'OpenRouter';

/** Config file written to ~/.pixel-agents/openrouter-config.json */
export const OPENROUTER_CONFIG_NAME = 'openrouter-config.json';

/** OpenRouter API endpoint */
export const OPENROUTER_API_BASE = 'https://openrouter.ai/api/v1';

/** Default model — override in ~/.pixel-agents/openrouter-config.json */
export const OPENROUTER_DEFAULT_MODEL = 'google/gemma-4-31b-it';
