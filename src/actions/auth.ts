"use server"

import {
  SigninFormSchema,
  type SigninFormState,
  SignupFormSchema,
  type SignupFormState,
} from "@/lib/definitions/signin"
import { authApiService } from "@/services/auth-api.service"
import { AxiosError } from "axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createSession, deleteSession } from "@/lib/session"

type ReturnState = SigninFormState & { errors?: { generic?: string } }
type SignupReturnState = SignupFormState & { errors?: { generic?: string } }

const handleError = (error: unknown): ReturnState => {
  if (error instanceof AxiosError) {
    return {
      errors: { generic: error.response?.data?.message || error.message },
    }
  }
  if (Array.isArray(error)) return { errors: { generic: error[0] }, success: false }
  if (typeof error === "string") return { errors: { generic: error }, success: false }
  else return { errors: { generic: "Something went wrong" }, success: false }
}

export async function login(_state: SigninFormState, formData: FormData): Promise<ReturnState> {
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  try {
    const res = await authApiService.login(validatedFields.data)
    const cookieStore = await cookies()

    // Set secure HTTP-only cookies
    cookieStore.set("access_token", res.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    cookieStore.set("refresh_token", res.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })

    // Create session
    await createSession(res.user.id)

    redirect("/dashboard")
  } catch (error) {
    return handleError(error)
  }
}

export async function signup(_state: SignupFormState, formData: FormData): Promise<SignupReturnState> {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  try {
    const res = await authApiService.signup(validatedFields.data)
    const cookieStore = await cookies()

    // Set secure HTTP-only cookies
    cookieStore.set("access_token", res.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    cookieStore.set("refresh_token", res.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })

    // Create session
    await createSession(res.user.id)

    redirect("/dashboard")
  } catch (error) {
    return handleError(error) as SignupReturnState
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get("refresh_token")?.value

    if (refreshToken) {
      await authApiService.logout(refreshToken)
    }
  } catch (error) {
    console.log("Logout error:", error)
  } finally {
    await deleteSession()
    redirect("/login")
  }
}

export async function forgotPassword(
  _state: any,
  formData: FormData,
): Promise<{ success?: boolean; errors?: { email?: string[]; generic?: string } }> {
  const email = formData.get("email") as string

  if (!email || !email.includes("@")) {
    return {
      errors: { email: ["Please enter a valid email address"] },
    }
  }

  try {
    await authApiService.forgotPassword(email)
    return { success: true }
  } catch (error) {
    return handleError(error)
  }
}

export async function resetPassword(
  _state: any,
  formData: FormData,
): Promise<{ success?: boolean; errors?: { password?: string[]; generic?: string } }> {
  const token = formData.get("token") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!token) {
    return {
      errors: { generic: "Invalid or missing reset token" },
    }
  }

  if (password !== confirmPassword) {
    return {
      errors: { generic: "Passwords do not match" },
    }
  }

  const validatedFields = SigninFormSchema.pick({ password: true }).safeParse({
    password,
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    await authApiService.resetPassword(token, password)
    return { success: true }
  } catch (error) {
    return handleError(error)
  }
}
