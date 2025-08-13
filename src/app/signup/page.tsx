"use client"

import { useActionState, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, Eye, EyeOff, Sparkles, ArrowLeft, CheckCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { signup } from "@/actions/auth"

export default function SignupPage() {
  const [state, action, pending] = useActionState(signup, undefined)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Calendar className="h-6 w-6 text-primary" />
                  <Sparkles className="h-2 w-2 text-primary absolute -top-0.5 -right-0.5" />
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
          {/* Welcome Card */}
          <Card className="mb-8 border-2 bg-gradient-to-br from-card to-card/50 text-center">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl w-fit">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Join Tend</CardTitle>
              <CardDescription className="text-base">
                Create your account to start managing amazing events
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Signup Form */}
          <Card className="border-2 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-8">
              <form className="space-y-6" action={action}>
                {state?.errors?.generic && (
                  <Alert variant="destructive" className="border-2">
                    <AlertDescription>{state.errors.generic}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    className="h-12 text-base border-2 focus:border-primary"
                  />
                  {state?.errors?.name && (
                    <div className="text-sm text-destructive">
                      {state.errors.name.map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="h-12 text-base border-2 focus:border-primary"
                  />
                  {state?.errors?.email && (
                    <div className="text-sm text-destructive">
                      {state.errors.email.map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
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
                      <ul className="list-disc list-inside">
                        {state.errors.password.map((error) => (
                          <li key={error}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-base font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
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
                  {state?.errors?.confirmPassword && (
                    <div className="text-sm text-destructive">
                      {state.errors.confirmPassword.map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={pending}
                  className="w-full h-12 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  {pending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline font-medium">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
