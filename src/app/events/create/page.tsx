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
import { Calendar, ArrowLeft, Sparkles, User, AlertCircle, CheckCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { EventService } from "@/services/event.service"

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    longDescription: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    location: "",
    category: "",
    maxAttendees: "",
    price: "0",
    tags: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const categories = ["Technology", "Business", "Education", "Networking", "Entertainment", "Sports", "Health", "Arts"]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Validate required fields
      if (
        !formData.name ||
        !formData.description ||
        !formData.startDate ||
        !formData.startTime ||
        !formData.endDate ||
        !formData.endTime ||
        !formData.location ||
        !formData.category ||
        !formData.maxAttendees
      ) {
        setError("Please fill in all required fields")
        setLoading(false)
        return
      }

      // Validate dates
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`)
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`)

      if (startDateTime >= endDateTime) {
        setError("End date and time must be after start date and time")
        setLoading(false)
        return
      }

      if (startDateTime <= new Date()) {
        setError("Event start time must be in the future")
        setLoading(false)
        return
      }

      const eventData = {
        name: formData.name,
        description: formData.description,
        longDescription: formData.longDescription || formData.description,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        location: formData.location,
        category: formData.category,
        maxAttendees: Number.parseInt(formData.maxAttendees),
        price: Number.parseFloat(formData.price),
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        creator: "John Doe", // In a real app, this would come from auth
      }

      const result = await EventService.createEvent(eventData)
      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push(`/events/${result.eventId}`)
        }, 2000)
      } else {
        setError(result.error || "Failed to create event")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 bg-gradient-to-br from-card to-card/50">
          <CardContent className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Event Created!</h2>
            <p className="text-muted-foreground mb-4">Your event has been created successfully.</p>
            <p className="text-sm text-muted-foreground">Redirecting to event details...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
                  <Sparkles className="h-2 w-2 text-primary absolute -top-0.5 -right-0.5" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Tend
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Create New Event</h2>
            <p className="text-muted-foreground">Fill in the details to create your event</p>
          </div>

          <Card className="border-2 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
              <CardDescription>Provide the basic details about your event</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert className="border-2 bg-gradient-to-br from-destructive/5 to-destructive/10">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <AlertDescription className="text-destructive">{error}</AlertDescription>
                  </Alert>
                )}

                {/* Event Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Event Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter event name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12 text-base border-2 focus:border-primary"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Short Description *
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Brief description of your event"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="min-h-[100px] text-base border-2 focus:border-primary resize-none"
                  />
                </div>

                {/* Long Description */}
                <div className="space-y-2">
                  <Label htmlFor="longDescription" className="text-sm font-medium">
                    Detailed Description
                  </Label>
                  <Textarea
                    id="longDescription"
                    name="longDescription"
                    placeholder="Detailed description, agenda, what attendees can expect..."
                    value={formData.longDescription}
                    onChange={handleChange}
                    className="min-h-[150px] text-base border-2 focus:border-primary resize-none"
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-sm font-medium">
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
                    <Label htmlFor="startTime" className="text-sm font-medium">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-sm font-medium">
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
                    <Label htmlFor="endTime" className="text-sm font-medium">
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

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium">
                    Location *
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="Event location or 'Online'"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="h-12 text-base border-2 focus:border-primary"
                  />
                </div>

                {/* Category and Max Attendees */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium">
                      Category *
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                      <SelectTrigger className="h-12 text-base border-2 focus:border-primary">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxAttendees" className="text-sm font-medium">
                      Max Attendees *
                    </Label>
                    <Input
                      id="maxAttendees"
                      name="maxAttendees"
                      type="number"
                      placeholder="100"
                      value={formData.maxAttendees}
                      onChange={handleChange}
                      required
                      min="1"
                      className="h-12 text-base border-2 focus:border-primary"
                    />
                  </div>
                </div>

                {/* Price and Tags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm font-medium">
                      Price ($)
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="0"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="h-12 text-base border-2 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags" className="text-sm font-medium">
                      Tags
                    </Label>
                    <Input
                      id="tags"
                      name="tags"
                      type="text"
                      placeholder="networking, tech, startup (comma separated)"
                      value={formData.tags}
                      onChange={handleChange}
                      className="h-12 text-base border-2 focus:border-primary"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex space-x-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    asChild
                    className="flex-1 h-12 text-base border-2 bg-transparent"
                  >
                    <Link href="/dashboard">Cancel</Link>
                  </Button>
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
                      "Create Event"
                    )}
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
