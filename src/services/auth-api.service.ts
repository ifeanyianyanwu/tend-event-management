import { BaseApiService } from "./base-api.service"

interface LoginCredentials {
  email: string
  password: string
}

interface SignupCredentials {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface AuthResponse {
  access_token: string
  refresh_token: string
  user: {
    id: string
    email: string
    name: string
  }
}

interface RefreshResponse {
  access_token: string
}

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
}

// Mock database for password reset tokens
const resetTokens = new Map<string, { email: string; expires: number }>()

class AuthApiService extends BaseApiService {
  private routes = {
    login: "/auth/login",
    signup: "/auth/signup",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    profile: "/auth/profile",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Mock implementation for development
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (credentials.email === "admin@tend.com" && credentials.password === "Password123!") {
      return {
        access_token: "mock_access_token_" + Date.now(),
        refresh_token: "mock_refresh_token_" + Date.now(),
        user: {
          id: "1",
          email: credentials.email,
          name: "Admin User",
        },
      }
    }

    throw new Error("Invalid credentials")
  }

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    // Mock implementation for development
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      access_token: "mock_access_token_" + Date.now(),
      refresh_token: "mock_refresh_token_" + Date.now(),
      user: {
        id: Date.now().toString(),
        email: credentials.email,
        name: credentials.name,
      },
    }
  }

  async refresh(refresh_token: string): Promise<RefreshResponse> {
    // Mock implementation for development
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (refresh_token.startsWith("mock_refresh_token_")) {
      return {
        access_token: "mock_access_token_" + Date.now(),
      }
    }

    throw new Error("Invalid refresh token")
  }

  async logout(refresh_token: string): Promise<void> {
    // Mock implementation for development
    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log("Logged out with token:", refresh_token)
  }

  async getProfile(): Promise<User> {
    // Mock implementation for development
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      id: "1",
      email: "admin@tend.com",
      name: "Admin User",
      avatar: "/placeholder-user.jpg",
      createdAt: new Date().toISOString(),
    }
  }

  async forgotPassword(email: string): Promise<void> {
    // Mock implementation for development
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate a mock reset token
    const token = "reset_" + Math.random().toString(36).substring(2) + Date.now()
    const expires = Date.now() + 60 * 60 * 1000 // 1 hour from now

    // Store the token (in a real app, this would be in a database)
    resetTokens.set(token, { email, expires })

    // In a real app, you would send an email here
    console.log(`Password reset email sent to: ${email}`)
    console.log(
      `Reset link: ${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${token}`,
    )

    // For demo purposes, you can use this URL to test the reset flow
    if (typeof window !== "undefined") {
      console.log(`Demo reset URL: /reset-password?token=${token}`)
    }
  }

  async resetPassword(token: string, password: string): Promise<void> {
    // Mock implementation for development
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const tokenData = resetTokens.get(token)

    if (!tokenData) {
      throw new Error("Invalid or expired reset token")
    }

    if (Date.now() > tokenData.expires) {
      resetTokens.delete(token)
      throw new Error("Reset token has expired")
    }

    // In a real app, you would update the user's password in the database
    console.log(`Password reset successful for: ${tokenData.email}`)
    console.log(`New password length: ${password.length}`)

    // Remove the used token
    resetTokens.delete(token)
  }
}

export const authApiService = new AuthApiService()
