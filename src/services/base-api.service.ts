import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

export abstract class BaseApiService {
  protected instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => this.handleError(error)
    );
  }

  protected handleError(error: AxiosError): Promise<never> {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        console.error("Unauthorized: Invalid or missing token");
      }
      console.error(`API Error: ${status} - ${error.message}`);
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }

  protected async get<T>(
    url: string,
    params?: Record<string, unknown>,
    cookie?: string
  ): Promise<T> {
    const headers = cookie ? { Cookie: `access_token=${cookie}` } : {};
    const response = await this.instance.get<T>(url, { params, headers });
    return response.data;
  }

  protected async post<T>(
    url: string,
    data?: unknown,
    cookie?: string
  ): Promise<T> {
    const headers = cookie ? { Cookie: `access_token=${cookie}` } : {};
    const response = await this.instance.post<T>(url, data, { headers });
    return response.data;
  }

  protected async put<T>(
    url: string,
    data?: unknown,
    cookie?: string
  ): Promise<T> {
    const headers = cookie ? { Cookie: `access_token=${cookie}` } : {};
    const response = await this.instance.put<T>(url, data, { headers });
    return response.data;
  }

  protected async patch<T>(
    url: string,
    data?: unknown,
    cookie?: string
  ): Promise<T> {
    const headers = cookie ? { Cookie: `access_token=${cookie}` } : {};
    const response = await this.instance.patch<T>(url, data, { headers });
    return response.data;
  }

  protected async delete<T>(url: string, cookie?: string): Promise<T> {
    const headers = cookie ? { Cookie: `access_token=${cookie}` } : {};
    const response = await this.instance.delete<T>(url, { headers });
    return response.data;
  }
}
