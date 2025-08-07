export interface ApiResponse<T> {
  status: "success";
  message?: string;
  timestamp: string;
  data: T;
}

export function success<T>(data: T, message?: string): ApiResponse<T> {
  return {
    status: "success",
    data,
    message,
    timestamp: new Date().toISOString(),
  };
}