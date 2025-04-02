export interface HttpClientResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}