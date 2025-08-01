import { BaseApiService } from "./base-api.service";

class AuthApiService extends BaseApiService {
  private routes = {
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
  };

  async login(credentials: { email: string; password: string }) {
    return this.post<{
      access_token: string;
      refresh_token: string;
    }>(this.routes.login, credentials);
  }

  async refresh(refresh_token: string) {
    return this.post<{
      access_token: string;
    }>(this.routes.refresh, { refresh_token });
  }

  async logout(refresh_token: string) {
    return this.post(this.routes.logout, { refresh_token });
  }
}

export const authApiService = new AuthApiService();
