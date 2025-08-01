import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import { decrypt, deleteSession } from "./session";
import { redirect } from "next/navigation";
import { authApiService } from "@/services/auth.service";

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("access_token")?.value;
  const session = await decrypt(cookie);

  if (!session?.sub) {
    try {
      const refresh_token = cookieStore.get("refresh_token")?.value;
      const token = await decrypt(cookie);
      if (token) {
        const { access_token } = await authApiService.refresh(
          refresh_token as string
        );
        cookieStore.set("access_token", access_token, {
          secure: true,
          httpOnly: true,
        });
      } else {
        await authApiService.logout(refresh_token as string);
        await deleteSession();
        throw new Error("Unauthorized");
      }
    } catch (error) {
      redirect("/login");
    }
  }

  return { isAuth: true, userId: session?.sub };
});
