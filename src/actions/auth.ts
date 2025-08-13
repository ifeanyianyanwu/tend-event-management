"use server";

import { SigninFormSchema, SigninFormState } from "@/lib/definitions/signin";
import { authApiService } from "@/services/auth.service";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

type ReturnState = SigninFormState & { errors?: { generic?: string } };

const handleError: (error: unknown) => ReturnState = (error) => {
  if (error instanceof AxiosError) {
    return {
      errors: { generic: error.response?.data?.message || error.message },
    };
  }
  if (Array.isArray(error))
    return { errors: { generic: error[0] }, success: false };
  if (typeof error === "string")
    return { errors: { generic: error }, success: false };
  else return { errors: { generic: "Something went wrong, " }, success: false };
};

export async function login(
  _state: SigninFormState,
  formData: FormData
): Promise<ReturnState> {
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  try {
    const res = await authApiService.login(validatedFields.data);
    const cookieStore = await cookies();
    cookieStore.set("access_token", res.access_token, {
      httpOnly: true,
      secure: true,
    });
    cookieStore.set("refresh_token", res.refresh_token, {
      httpOnly: true,
      secure: true,
    });
    return { success: true };
  } catch (error) {
    return handleError(error);
  }
}
// export async function login(state: FormState, formData: FormData) {}
// export async function resetPassword(state: FormState, formData: FormData) {}
