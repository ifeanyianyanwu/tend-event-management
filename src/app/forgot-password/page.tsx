"use client"

import { useActionState, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, ArrowLeft, Mail, CheckCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { forgotPassword } from "@/actions/auth"

export default function ForgotPasswordPage() {
  const [state, action, pending] = useActionState(forgotPassword, undefined)
  const [emailSent, setEmailSent] = useState(false)

  if (state?.success && !emailSent) {
    setEmailSent(true)
  }

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
                {emailSent ? (
                  <CheckCircle className="h-8 w-8 text-green-500" />
                ) : (
                  <Mail className="h-8 w-8 text-primary" />
                )}
              </div>
              <CardTitle className="text-2xl">{emailSent ? "Check Your Email" : "Forgot Password?"}</CardTitle>
              <CardDescription className="text-base">
                {emailSent
                  ? "We've sent a password reset link to your email address"
                  : "Enter your email address and we'll send you a link to reset your password"}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Form Card */}
          <Card className="border-2 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-8">
              {emailSent ? (
                <div className="space-y-6 text-center">
                  <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800 dark:text-green-200">
                      Password reset instructions have been sent to your email address. Please check your inbox and
                      follow the link to reset your password.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Didn't receive the email? Check your spam folder or try again.
                    </p>

                    <Button variant="outline" onClick={() => setEmailSent(false)} className="w-full">
                      Send Another Email
                    </Button>
                  </div>
                </div>
              ) : (
                <form className="space-y-6" action={action}>
                  {state?.errors?.generic && (
                    <Alert variant="destructive" className="border-2">
                      <AlertDescription>{state.errors.generic}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      required
                      className="h-12 text-base border-2 focus:border-primary"
                    />
                    {state?.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={pending}
                    className="w-full h-12 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    {pending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Sending Reset Link...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Remember your password?{" "}
                      <Link href="/login" className="text-primary hover:underline font-medium">
                        Sign in here
                      </Link>
                    </p>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
