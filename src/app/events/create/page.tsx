"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, ArrowLeft, MapPin, Clock, Users, Sparkles, CheckCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    location: "",
    eventType: "",
    maxAttendees: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSuccess(true)

      // Redirect after success
      setTimeout(() => {
        router.push("/dashboard?tab=my-events")
      }, 2000)
    } catch (err) {
      setError("Failed to create event. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-full w-fit">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Event Created!</h2>
            <p className="text-muted-foreground mb-6">
              Your event has been successfully created. Redirecting to your dashboard...
            </p>
            <div className="animate-pulse">
              <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Calendar className="h-6 w-6 text-primary" />
                <Sparkles className="h-3 w-3 text-primary absolute -top-1 -right-1" />
              </div>
              <h1 className="text-xl font-bold">Create New Event</h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header Card */}
          <Card className="mb-8 border-2 bg-gradient-to-br from-card to-card/50">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl w-fit">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Create Your Event</CardTitle>
              <CardDescription className="text-base">
                Fill in the details below to create an amazing event experience
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Form Card */}
          <Card className="border-2 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <Alert variant="destructive" className="border-2">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Basic Information */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Basic Information</h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-medium">
                      Event Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter a compelling event name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-12 text-base border-2 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-base font-medium">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe what makes your event special..."
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="text-base border-2 focus:border-primary resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eventType" className="text-base font-medium">
                      Event Type *
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("eventType", value)}>
                      <SelectTrigger className="h-12 text-base border-2 focus:border-primary">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-person">🏢 In-Person</SelectItem>
                        <SelectItem value="virtual">💻 Virtual</SelectItem>
                        <SelectItem value="hybrid">🌐 Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Date & Time</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate" className="text-base font-medium">
                        Start Date *
                      </Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        className="h-12 text-base border-2 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startTime" className="text-base font-medium">
                        Start Time *
                      </Label>
                      <Input
                        id="startTime"
                        name="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={handleChange}
                        required
                        className="h-12 text-base border-2 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="endDate" className="text-base font-medium">
                        End Date *
                      </Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                        className="h-12 text-base border-2 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime" className="text-base font-medium">
                        End Time *
                      </Label>
                      <Input
                        id="endTime"
                        name="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={handleChange}
                        required
                        className="h-12 text-base border-2 focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Location</h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-base font-medium">
                      {formData.eventType === "virtual" ? "Meeting Link/Platform" : "Venue Address"}
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder={
                        formData.eventType === "virtual"
                          ? "https://zoom.us/j/... or platform name"
                          : "Enter venue address or location"
                      }
                      value={formData.location}
                      onChange={handleChange}
                      className="h-12 text-base border-2 focus:border-primary"
                    />
                  </div>
                </div>

                {/* Capacity */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Users className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Capacity</h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxAttendees" className="text-base font-medium">
                      Maximum Attendees
                    </Label>
                    <Input
                      id="maxAttendees"
                      name="maxAttendees"
                      type="number"
                      placeholder="Leave empty for unlimited capacity"
                      value={formData.maxAttendees}
                      onChange={handleChange}
                      min="1"
                      className="h-12 text-base border-2 focus:border-primary"
                    />
                    <p className="text-sm text-muted-foreground">
                      Set a limit to control event size, or leave empty for unlimited registrations
                    </p>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 h-12 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Creating Event...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Create Event
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline" asChild className="h-12 text-base border-2 bg-transparent">
                    <Link href="/dashboard">Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
