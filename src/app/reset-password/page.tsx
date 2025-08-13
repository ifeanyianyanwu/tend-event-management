"use client"

import { useActionState, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, ArrowLeft, Lock, Eye, EyeOff, CheckCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { resetPassword } from "@/actions/auth"

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [state, action, pending] = useActionState(resetPassword, undefined)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  if (!token) {
    return (
      <Card className="border-2 bg-gradient-to-br from-card to-card/50">
        <CardContent className="p-8 text-center">
          <Alert variant="destructive" className="border-2">
            <AlertDescription>
              Invalid or missing reset token. Please request a new password reset link.
            </AlertDescription>
          </Alert>
          <Button asChild className="mt-4">
            <Link href="/forgot-password">Request New Link</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (state?.success) {
    return (
      <Card className="border-2 bg-gradient-to-br from-card to-card/50">
        <CardContent className="p-8 text-center space-y-6">
          <div className="mx-auto p-3 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-950/20 dark:to-green-900/10 rounded-2xl w-fit">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Password Reset Successful</h3>
            <p className="text-muted-foreground">
              Your password has been successfully reset. You can now sign in with your new password.
            </p>
          </div>

          <Button asChild className="w-full">
            <Link href="/login">Sign In</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 bg-gradient-to-br from-card to-card/50">
      <CardContent className="p-8">
        <form className="space-y-6" action={action}>
          <input type="hidden" name="token" value={token} />

          {state?.errors?.generic && (
            <Alert variant="destructive" className="border-2">
              <AlertDescription>{state.errors.generic}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="password" className="text-base font-medium">
              New Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                required
                className="h-12 text-base border-2 focus:border-primary pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {state?.errors?.password && (
              <div className="text-sm text-destructive">
                <p>Password must:</p>
                <ul className="list-disc list-inside ml-2">
                  {state.errors.password.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-base font-medium">
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                required
                className="h-12 text-base border-2 focus:border-primary pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={pending}
            className="w-full h-12 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            {pending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Tend
                </h1>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header Card */}
          <Card className="mb-8 border-2 bg-gradient-to-br from-card to-card/50 text-center">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl w-fit">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Reset Your Password</CardTitle>
              <CardDescription className="text-base">
                Enter your new password below to complete the reset process
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Form Card */}
          <Suspense
            fallback={
              <Card className="border-2 bg-gradient-to-br from-card to-card/50">
                <CardContent className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                  <p className="mt-4 text-muted-foreground">Loading...</p>
                </CardContent>
              </Card>
            }
          >
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
