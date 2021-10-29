export interface ClientInterface {
    baseUrl: string;
    version: string;
    allowedUris: string[];
    endpoint: string;
    etag: string;
    body: Record<string, unknown>;
    status: number;
}