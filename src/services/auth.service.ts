// Authentication service with dummy endpoints
export class AuthService {
  private static baseUrl = "/api/auth"
  private static currentUser: any = null

  // Mock user data
  private static mockUsers = [
    {
      id: "user-1",
      name: "John Doe",
      email: "john@example.com",
      password: "password123", // In real app, this would be hashed
      role: "user",
      avatar: "/placeholder-user.jpg",
      createdAt: "2024-01-01T00:00:00Z",
      emailVerified: true,
    },
    {
      id: "user-2",
      name: "Jane Smith",
      email: "jane@example.com",
      password: "password456",
      role: "organizer",
      avatar: "/placeholder-user.jpg",
      createdAt: "2024-01-02T00:00:00Z",
      emailVerified: true,
    },
  ]

  static async login(email: string, password: string) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const user = this.mockUsers.find((u) => u.email === email && u.password === password)

    if (!user) {
      return { success: false, error: "Invalid email or password" }
    }

    // Create session token (mock)
    const token = `token_${Math.random().toString(36).substr(2, 20)}`

    // Store user session
    this.currentUser = { ...user, password: undefined }
    localStorage.setItem("auth_token", token)
    localStorage.setItem("current_user", JSON.stringify(this.currentUser))

    return {
      success: true,
      user: this.currentUser,
      token,
      message: "Login successful",
    }
  }

  static async signup(userData: {
    name: string
    email: string
    password: string
    confirmPassword: string
  }) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Validate passwords match
    if (userData.password !== userData.confirmPassword) {
      return { success: false, error: "Passwords do not match" }
    }

    // Check if user already exists
    const existingUser = this.mockUsers.find((u) => u.email === userData.email)
    if (existingUser) {
      return { success: false, error: "User with this email already exists" }
    }

    // Create new user
    const newUser = {
      id: `user-${Math.random().toString(36).substr(2, 9)}`,
      name: userData.name,
      email: userData.email,
      password: userData.password, // In real app, this would be hashed
      role: "user",
      avatar: "/placeholder-user.jpg",
      createdAt: new Date().toISOString(),
      emailVerified: false,
    }

    this.mockUsers.push(newUser)

    // Auto-login after signup
    const token = `token_${Math.random().toString(36).substr(2, 20)}`
    this.currentUser = { ...newUser, password: undefined }
    localStorage.setItem("auth_token", token)
    localStorage.setItem("current_user", JSON.stringify(this.currentUser))

    return {
      success: true,
      user: this.currentUser,
      token,
      message: "Account created successfully",
    }
  }

  static async logout() {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    this.currentUser = null
    localStorage.removeItem("auth_token")
    localStorage.removeItem("current_user")

    return { success: true, message: "Logged out successfully" }
  }

  static async getCurrentUser() {
    // Check localStorage first
    const storedUser = localStorage.getItem("current_user")
    const token = localStorage.getItem("auth_token")

    if (!storedUser || !token) {
      return { success: false, error: "Not authenticated" }
    }

    try {
      this.currentUser = JSON.parse(storedUser)
      return { success: true, user: this.currentUser }
    } catch (error) {
      return { success: false, error: "Invalid session" }
    }
  }

  static async refreshToken() {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    const currentToken = localStorage.getItem("auth_token")
    if (!currentToken) {
      return { success: false, error: "No token found" }
    }

    // Generate new token
    const newToken = `token_${Math.random().toString(36).substr(2, 20)}`
    localStorage.setItem("auth_token", newToken)

    return { success: true, token: newToken }
  }

  static async forgotPassword(email: string) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = this.mockUsers.find((u) => u.email === email)
    if (!user) {
      return { success: false, error: "User with this email not found" }
    }

    // In real app, this would send an email
    const resetToken = `reset_${Math.random().toString(36).substr(2, 20)}`

    return {
      success: true,
      message: "Password reset email sent",
      resetToken, // Only for demo purposes
    }
  }

  static async resetPassword(token: string, newPassword: string) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In real app, this would validate the reset token
    if (!token.startsWith("reset_")) {
      return { success: false, error: "Invalid reset token" }
    }

    // For demo, just return success
    return { success: true, message: "Password reset successfully" }
  }

  static async updateProfile(userData: {
    name?: string
    email?: string
    avatar?: string
  }) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (!this.currentUser) {
      return { success: false, error: "Not authenticated" }
    }

    // Update user data
    const userIndex = this.mockUsers.findIndex((u) => u.id === this.currentUser.id)
    if (userIndex !== -1) {
      this.mockUsers[userIndex] = {
        ...this.mockUsers[userIndex],
        ...userData,
        updatedAt: new Date().toISOString(),
      }

      this.currentUser = { ...this.mockUsers[userIndex], password: undefined }
      localStorage.setItem("current_user", JSON.stringify(this.currentUser))
    }

    return { success: true, user: this.currentUser }
  }

  static async changePassword(currentPassword: string, newPassword: string) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (!this.currentUser) {
      return { success: false, error: "Not authenticated" }
    }

    const user = this.mockUsers.find((u) => u.id === this.currentUser.id)
    if (!user || user.password !== currentPassword) {
      return { success: false, error: "Current password is incorrect" }
    }

    // Update password
    user.password = newPassword
    user.updatedAt = new Date().toISOString()

    return { success: true, message: "Password changed successfully" }
  }

  static isAuthenticated() {
    return !!localStorage.getItem("auth_token") && !!this.currentUser
  }

  static getToken() {
    return localStorage.getItem("auth_token")
  }
}
