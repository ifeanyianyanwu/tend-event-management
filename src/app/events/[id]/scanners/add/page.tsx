"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, QrCode, UserPlus, Mail } from "lucide-react"

export default function AddScannerPage({ params }: { params: { id: string } }) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess(true)

      // Redirect after success
      setTimeout(() => {
        router.push(`/events/${params.id}?tab=scanners`)
      }, 2000)
    } catch (err) {
      setError("Failed to add scanner. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/events/${params.id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Event
            </Link>
          </Button>
          <div className="flex items-center space-x-2">
            <QrCode className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Add Scanner</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserPlus className="h-5 w-5" />
                <span>Add QR Code Scanner</span>
              </CardTitle>
              <CardDescription>Assign someone to scan QR codes at your event entrance</CardDescription>
            </CardHeader>
            <CardContent>
              {success ? (
                <Alert>
                  <Mail className="h-4 w-4" />
                  <AlertDescription>
                    Scanner invitation sent successfully! They will receive an email with instructions.
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Scanner Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <p className="text-sm text-gray-600">
                      If this person doesn't have an account, they'll be invited to create one.
                    </p>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button type="submit" disabled={loading} className="flex-1">
                      {loading ? "Sending Invitation..." : "Add Scanner"}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                      <Link href={`/events/${params.id}`}>Cancel</Link>
                    </Button>
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
