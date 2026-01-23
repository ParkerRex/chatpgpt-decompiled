// Minimal TypeScript client API for chat, agents, threads, turns, and runs.
// Focuses on typed request/response shapes and path construction; extend as needed.

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

export type Metadata = Record<string, string | number | boolean | null>;

export interface ClientConfig {
  apiKey: string;
  baseUrl?: string; // Default: https://api.openai.com/v1
  organization?: string;
  project?: string;
  headers?: HeadersInit;
  fetch?: typeof fetch;
  timeoutMs?: number;
}

export type QueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | (string | number | boolean | null)[];

export interface RequestOptions {
  query?: Record<string, QueryValue>;
  headers?: HeadersInit;
  signal?: AbortSignal;
  timeoutMs?: number;
}

export class ApiError extends Error {
  status: number;
  body: unknown;
  headers: Headers;

  constructor(status: number, body: unknown, headers: Headers, message?: string) {
    super(message ?? `API request failed with status ${status}`);
    this.status = status;
    this.body = body;
    this.headers = headers;
  }
}

export interface Pagination<T> {
  object: "list";
  data: T[];
  first_id?: string | null;
  last_id?: string | null;
  has_more?: boolean;
}

export interface ChatMessage {
  role: "system" | "user" | "assistant" | "tool" | string;
  content:
    | string
    | Array<{
        type: "text" | "image_url" | string;
        text?: string;
        image_url?: { url: string; detail?: "low" | "high" | "auto" | string };
        [key: string]: JsonValue | undefined;
      }>;
  name?: string;
  tool_call_id?: string;
  tool_calls?: JsonValue[];
  [key: string]: JsonValue | undefined;
}

export interface ChatCompletionCreateRequest {
  model: string;
  messages: ChatMessage[];
  stream?: boolean;
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  stop?: string | string[] | null;
  tools?: JsonValue[];
  tool_choice?: JsonValue;
  metadata?: Metadata;
  [key: string]: JsonValue | undefined;
}

export interface ChatCompletionChoice {
  index: number;
  message?: ChatMessage;
  delta?: Partial<ChatMessage>;
  finish_reason?: string | null;
  [key: string]: JsonValue | undefined;
}

export interface ChatCompletion {
  id: string;
  object: "chat.completion" | "chat.completion.chunk" | string;
  created: number;
  model: string;
  choices: ChatCompletionChoice[];
  usage?: JsonValue;
  [key: string]: JsonValue | undefined;
}

export interface Agent {
  id: string;
  object: "agent" | string;
  created_at: number;
  name?: string | null;
  description?: string | null;
  instructions?: string | null;
  model?: string;
  tools?: JsonValue[];
  metadata?: Metadata;
  [key: string]: JsonValue | undefined;
}

export interface AgentCreateRequest {
  name?: string | null;
  description?: string | null;
  instructions?: string | null;
  model?: string;
  tools?: JsonValue[];
  metadata?: Metadata;
  [key: string]: JsonValue | undefined;
}

export interface AgentUpdateRequest extends AgentCreateRequest {}

export interface Thread {
  id: string;
  object: "thread" | string;
  created_at: number;
  metadata?: Metadata;
  [key: string]: JsonValue | undefined;
}

export interface ThreadCreateRequest {
  metadata?: Metadata;
  [key: string]: JsonValue | undefined;
}

export interface ThreadUpdateRequest {
  metadata?: Metadata;
  [key: string]: JsonValue | undefined;
}

export interface Turn {
  id: string;
  object: "turn" | string;
  created_at: number;
  role?: string;
  content?: JsonValue;
  status?: string;
  metadata?: Metadata;
  [key: string]: JsonValue | undefined;
}

export interface TurnCreateRequest {
  role: "user" | "assistant" | "system" | "tool" | string;
  content: JsonValue;
  metadata?: Metadata;
  [key: string]: JsonValue | undefined;
}

export interface Run {
  id: string;
  object: "run" | string;
  created_at: number;
  thread_id?: string;
  agent_id?: string;
  status?: string;
  metadata?: Metadata;
  [key: string]: JsonValue | undefined;
}

export interface RunCreateRequest {
  agent_id?: string;
  model?: string;
  instructions?: string | null;
  tools?: JsonValue[];
  metadata?: Metadata;
  [key: string]: JsonValue | undefined;
}

export interface RunUpdateRequest {
  metadata?: Metadata;
  [key: string]: JsonValue | undefined;
}

export interface ToolOutputsSubmitRequest {
  tool_outputs: Array<{
    tool_call_id: string;
    output: string;
  }>;
  [key: string]: JsonValue | undefined;
}

function normalizeBaseUrl(baseUrl?: string): string {
  const url = baseUrl?.trim() || "https://api.openai.com/v1";
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function encodePathSegment(segment: string): string {
  return encodeURIComponent(segment);
}

function buildQuery(params?: Record<string, QueryValue>): string {
  if (!params) return "";
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item === undefined) continue;
        search.append(key, item === null ? "" : String(item));
      }
      continue;
    }
    search.append(key, value === null ? "" : String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

async function readBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  if (contentType.includes("text/")) {
    return response.text();
  }
  return response.arrayBuffer();
}

export class OpenAIClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly headers?: HeadersInit;
  private readonly organization?: string;
  private readonly project?: string;
  private readonly fetchImpl: typeof fetch;
  private readonly timeoutMs?: number;

  constructor(config: ClientConfig) {
    this.baseUrl = normalizeBaseUrl(config.baseUrl);
    this.apiKey = config.apiKey;
    this.headers = config.headers;
    this.organization = config.organization;
    this.project = config.project;
    this.fetchImpl = config.fetch ?? fetch;
    this.timeoutMs = config.timeoutMs;
  }

  private async request<T>(
    method: string,
    path: string,
    body?: JsonValue,
    options?: RequestOptions
  ): Promise<T> {
    const query = buildQuery(options?.query);
    const url = `${this.baseUrl}${path}${query}`;
    const headers: HeadersInit = {
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
      ...this.headers,
      ...options?.headers,
    };
    if (this.organization) {
      (headers as Record<string, string>)["OpenAI-Organization"] = this.organization;
    }
    if (this.project) {
      (headers as Record<string, string>)["OpenAI-Project"] = this.project;
    }

    const controller = new AbortController();
    const timeoutMs = options?.timeoutMs ?? this.timeoutMs;
    const signal = options?.signal;
    const timeout =
      typeof timeoutMs === "number" && timeoutMs > 0
        ? setTimeout(() => controller.abort(), timeoutMs)
        : null;

    const response = await this.fetchImpl(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: signal ?? controller.signal,
    });
    if (timeout) clearTimeout(timeout);

    const responseBody = await readBody(response);
    if (!response.ok) {
      throw new ApiError(response.status, responseBody, response.headers);
    }
    return responseBody as T;
  }

  private async requestStream(
    method: string,
    path: string,
    body?: JsonValue,
    options?: RequestOptions
  ): Promise<ReadableStream<Uint8Array>> {
    const query = buildQuery(options?.query);
    const url = `${this.baseUrl}${path}${query}`;
    const headers: HeadersInit = {
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      ...this.headers,
      ...options?.headers,
    };
    if (this.organization) {
      (headers as Record<string, string>)["OpenAI-Organization"] = this.organization;
    }
    if (this.project) {
      (headers as Record<string, string>)["OpenAI-Project"] = this.project;
    }

    const controller = new AbortController();
    const timeoutMs = options?.timeoutMs ?? this.timeoutMs;
    const signal = options?.signal;
    const timeout =
      typeof timeoutMs === "number" && timeoutMs > 0
        ? setTimeout(() => controller.abort(), timeoutMs)
        : null;

    const response = await this.fetchImpl(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: signal ?? controller.signal,
    });
    if (timeout) clearTimeout(timeout);

    if (!response.ok || !response.body) {
      const responseBody = await readBody(response);
      throw new ApiError(response.status, responseBody, response.headers);
    }
    return response.body;
  }

  chat = {
    create: (payload: ChatCompletionCreateRequest, options?: RequestOptions) =>
      this.request<ChatCompletion>("POST", "/chat/completions", payload, options),
    createStream: (payload: ChatCompletionCreateRequest, options?: RequestOptions) =>
      this.requestStream("POST", "/chat/completions", payload, options),
  };

  agents = {
    list: (options?: RequestOptions) =>
      this.request<Pagination<Agent>>("GET", "/agents", undefined, options),
    create: (payload: AgentCreateRequest, options?: RequestOptions) =>
      this.request<Agent>("POST", "/agents", payload, options),
    retrieve: (agentId: string, options?: RequestOptions) =>
      this.request<Agent>("GET", `/agents/${encodePathSegment(agentId)}`, undefined, options),
    update: (agentId: string, payload: AgentUpdateRequest, options?: RequestOptions) =>
      this.request<Agent>("PATCH", `/agents/${encodePathSegment(agentId)}`, payload, options),
    delete: (agentId: string, options?: RequestOptions) =>
      this.request<{ id: string; object: string; deleted: boolean }>(
        "DELETE",
        `/agents/${encodePathSegment(agentId)}`,
        undefined,
        options
      ),
  };

  threads = {
    list: (options?: RequestOptions) =>
      this.request<Pagination<Thread>>("GET", "/threads", undefined, options),
    create: (payload?: ThreadCreateRequest, options?: RequestOptions) =>
      this.request<Thread>("POST", "/threads", payload ?? {}, options),
    retrieve: (threadId: string, options?: RequestOptions) =>
      this.request<Thread>("GET", `/threads/${encodePathSegment(threadId)}`, undefined, options),
    update: (threadId: string, payload: ThreadUpdateRequest, options?: RequestOptions) =>
      this.request<Thread>("PATCH", `/threads/${encodePathSegment(threadId)}`, payload, options),
    delete: (threadId: string, options?: RequestOptions) =>
      this.request<{ id: string; object: string; deleted: boolean }>(
        "DELETE",
        `/threads/${encodePathSegment(threadId)}`,
        undefined,
        options
      ),
  };

  turns = {
    list: (threadId: string, options?: RequestOptions) =>
      this.request<Pagination<Turn>>(
        "GET",
        `/threads/${encodePathSegment(threadId)}/turns`,
        undefined,
        options
      ),
    create: (threadId: string, payload: TurnCreateRequest, options?: RequestOptions) =>
      this.request<Turn>(
        "POST",
        `/threads/${encodePathSegment(threadId)}/turns`,
        payload,
        options
      ),
    retrieve: (threadId: string, turnId: string, options?: RequestOptions) =>
      this.request<Turn>(
        "GET",
        `/threads/${encodePathSegment(threadId)}/turns/${encodePathSegment(turnId)}`,
        undefined,
        options
      ),
    delete: (threadId: string, turnId: string, options?: RequestOptions) =>
      this.request<{ id: string; object: string; deleted: boolean }>(
        "DELETE",
        `/threads/${encodePathSegment(threadId)}/turns/${encodePathSegment(turnId)}`,
        undefined,
        options
      ),
  };

  runs = {
    list: (threadId: string, options?: RequestOptions) =>
      this.request<Pagination<Run>>(
        "GET",
        `/threads/${encodePathSegment(threadId)}/runs`,
        undefined,
        options
      ),
    create: (threadId: string, payload: RunCreateRequest, options?: RequestOptions) =>
      this.request<Run>(
        "POST",
        `/threads/${encodePathSegment(threadId)}/runs`,
        payload,
        options
      ),
    retrieve: (threadId: string, runId: string, options?: RequestOptions) =>
      this.request<Run>(
        "GET",
        `/threads/${encodePathSegment(threadId)}/runs/${encodePathSegment(runId)}`,
        undefined,
        options
      ),
    update: (threadId: string, runId: string, payload: RunUpdateRequest, options?: RequestOptions) =>
      this.request<Run>(
        "PATCH",
        `/threads/${encodePathSegment(threadId)}/runs/${encodePathSegment(runId)}`,
        payload,
        options
      ),
    cancel: (threadId: string, runId: string, options?: RequestOptions) =>
      this.request<Run>(
        "POST",
        `/threads/${encodePathSegment(threadId)}/runs/${encodePathSegment(runId)}/cancel`,
        undefined,
        options
      ),
    submitToolOutputs: (
      threadId: string,
      runId: string,
      payload: ToolOutputsSubmitRequest,
      options?: RequestOptions
    ) =>
      this.request<Run>(
        "POST",
        `/threads/${encodePathSegment(threadId)}/runs/${encodePathSegment(runId)}/tool_outputs`,
        payload,
        options
      ),
  };
}
