type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiOptions<TBody = unknown> {
    method?: HttpMethod;
    body?: TBody;
    headers?: Record<string, string>;
    signal?: AbortSignal;
}

interface ApiResponse<TData> {
    data: TData | null;
    error: string | null;
    status: number;
}

export async function apiCall<TData = unknown, TBody = unknown>(
    endpoint: string,
    options: ApiOptions<TBody> = {}
): Promise<ApiResponse<TData>> {
    const { method = "GET", body, headers = {}, signal } = options;

    const baseHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        ...headers,
    };

    try {
        console.log(body, "body", endpoint, "endpoint");

        const response = await fetch(endpoint, {
            method,
            headers: baseHeaders,
            body: body !== undefined ? JSON.stringify(body) : undefined,
            signal,
        });

        console.log(response);

        const contentType = response.headers.get("content-type");
        const isJson = contentType?.includes("application/json");
        const data: TData | null = isJson ? await response.json() : null;

        if (!response.ok) {
            const errorMessage =
                (data as Record<string, string> | null)?.message ??
                `Request failed with status ${response.status}`;
            return { data: null, error: errorMessage, status: response.status };
        }

        return { data, error: null, status: response.status };
    } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
            return { data: null, error: "Request was aborted", status: 0 };
        }
        const message =
            err instanceof Error ? err.message : "An unexpected error occurred";
        return { data: null, error: message, status: 0 };
    }
}

// Convenience wrappers
// export const get = <TData>(endpoint: string, headers?: Record<string, string>) =>
//     apiCall<TData>(endpoint, { method: "GET", headers });

export const get = <TData>(
    endpoint: string,
    query?: Record<string, string | number | boolean | null | undefined>,
    headers?: Record<string, string>
) => {
    if (query) {
        const params = new URLSearchParams(
            Object.entries(query)
                .filter(([, v]) => v != null)
                .map(([k, v]) => [k, String(v)])
        );
        const separator = endpoint.includes("?") ? "&" : "?";
        endpoint = `${endpoint}${separator}${params.toString()}`;
    }
    return apiCall<TData>(endpoint, { method: "GET", headers });
};


export const post = <TData, TBody = unknown>(
    endpoint: string,
    body: TBody,
    headers?: Record<string, string>
) => apiCall<TData, TBody>(endpoint, { method: "POST", body, headers });

export const put = <TData, TBody = unknown>(
    endpoint: string,
    body: TBody,
    headers?: Record<string, string>
) => apiCall<TData, TBody>(endpoint, { method: "PUT", body, headers });

export const patch = <TData, TBody = unknown>(
    endpoint: string,
    body: TBody,
    headers?: Record<string, string>
) => apiCall<TData, TBody>(endpoint, { method: "PATCH", body, headers });

export const del = <TData>(endpoint: string, headers?: Record<string, string>) =>
    apiCall<TData>(endpoint, { method: "DELETE", headers });