export interface ITodo {
    title: string;
    id: number;
}

export interface IFetch {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    headers?: HeadersInit;
    body?: BodyInit | Record<string, unknown>;
  }
