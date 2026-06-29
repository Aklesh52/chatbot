export interface ChatModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  gatewayOrder: string[];
  reasoningEffort?: 'low' | 'medium' | 'high';
}

export type ModelCapabilities = {
  tools: boolean;
  vision: boolean;
  reasoning: boolean;
};

export const chatModels: ChatModel[] = [
  {
    id: "deepseek/deepseek-chat",
    name: "DeepSeek V3",
    provider: "deepseek",
    description: "Highly efficient and powerful open-weights model.",
    gatewayOrder: ["deepinfra", "groq"],
  },
  {
    id: "qwen/qwen-max",
    name: "Qwen Max",
    provider: "qwen",
    description: "Alibaba's flagship multi-lingual and reasoning engine.",
    gatewayOrder: ["together", "fireworks"],
  },
  {
    id: "minimax/abab6.5-chat",
    name: "MiniMax Abab 6.5",
    provider: "minimax",
    description: "High-performance model specialized in context and speed.",
    gatewayOrder: ["minimax"],
  },
  {
    id: "deepseek/deepseek-v3.2",
    name: "DeepSeek V3.2",
    provider: "deepseek",
    description: "Fast and capable model with tool use",
    gatewayOrder: ["bedrock", "deepinfra"],
  },
  {
    id: "moonshotai/kimi-k2.5",
    name: "Kimi K2.5",
    provider: "moonshotai",
    description: "Moonshot AI flagship model",
    gatewayOrder: ["fireworks", "bedrock"],
  },
  {
    id: "openai/gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "openai",
    description: "Fast, lightweight intelligence for diverse tasks.",
    gatewayOrder: ["openai"],
  }
];

export const isDemo = process.env.IS_DEMO === "1";

type GatewayModel = {
  id: string;
  name: string;
  type?: string;
  tags?: string[];
};

export type GatewayModelWithCapabilities = ChatModel & {
  capabilities: ModelCapabilities;
};

export async function getAllGatewayModels(): Promise<GatewayModelWithCapabilities[]> {
  try {
    const res = await fetch("https://ai-gateway.vercel.sh/v1/models", {
      next: { revalidate: 86_400 },
    });

    if (!res.ok) {
      return [];
    }

    const json = await res.json();

    return (json.data ?? [])
      .filter((m: GatewayModel) => m.type === "language")
      .map((m: GatewayModel) => ({
        id: m.id,
        name: m.name,
        provider: m.id.split("/")[0],
        description: "",
        capabilities: {
          tools: m.tags?.includes("tool-use") ?? false,
          vision: m.tags?.includes("vision") ?? false,
          reasoning: m.tags?.includes("reasoning") ?? false,
        },
      }));
  } catch {
    return [];
  }
}

export function getActiveModels(): ChatModel[] {
  return chatModels;
}

export const allowedModelIds = new Set(chatModels.map((m) => m.id));

export const modelsByProvider = chatModels.reduce<Record<string, ChatModel[]>>((acc, model) => {
  if (!acc[model.provider]) {
    acc[model.provider] = [];
  }
  acc[model.provider].push(model);
  return acc;
}, {});
