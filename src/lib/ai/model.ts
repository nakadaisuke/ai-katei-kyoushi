import { anthropic } from "@ai-sdk/anthropic";
import type { LanguageModel } from "ai";

// プロバイダー/モデルを環境変数だけで切り替えられるようにする層。
// 例えばOpenAIに乗り換えたい場合は、`npm install @ai-sdk/openai` した上で
// このswitchに case "openai": return openai(MODEL_ID); を追加し、
// AI_PROVIDER=openai / AI_MODEL=gpt-4o-mini を設定するだけでよい。
// アプリ側（tutor.ts等）はgenerateText({model: getModel(), ...})の形を変える必要はない。

const PROVIDER = process.env.AI_PROVIDER ?? "anthropic";
// ヒント・再解説は即応性が優先のため、既定はHaiku（軽量・低レイテンシ）にしている。
const MODEL_ID = process.env.AI_MODEL ?? "claude-haiku-4-5-20251001";

const REQUIRED_ENV_VAR: Record<string, string> = {
  anthropic: "ANTHROPIC_API_KEY",
};

export function isAiConfigured(): boolean {
  const envVar = REQUIRED_ENV_VAR[PROVIDER];
  return Boolean(envVar && process.env[envVar]);
}

export function getModel(): LanguageModel {
  switch (PROVIDER) {
    case "anthropic":
      return anthropic(MODEL_ID);
    default:
      throw new Error(`未対応のAI_PROVIDERです: ${PROVIDER}`);
  }
}
