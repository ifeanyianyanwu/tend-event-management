"use client"

import { useActionState, useEffect } from "react"
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
import { createEvent } from "@/actions/events"

export default function CreateEventPage() {
  const [state, action, pending] = useActionState(createEvent, undefined)
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      setTimeout(() => {
        router.push(`/events/${state.eventId}`)
      }, 2000)
    }
  }, [state?.success, state?.eventId, router])

  const categories = ["Technology", "Business", "Education", "Networking", "Entertainment", "Sports", "Health", "Arts"]

  if (state?.success) {
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
              <form action={action} className="space-y-6">
                {state?.errors?.generic && (
                  <Alert className="border-2 bg-gradient-to-br from-destructive/5 to-destructive/10">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <AlertDescription className="text-destructive">{state.errors.generic}</AlertDescription>
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

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Short Description *
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Brief description of your event"
                    required
                    className="min-h-[100px] text-base border-2 focus:border-primary resize-none"
                  />
                  {state?.errors?.description && (
                    <div className="text-sm text-destructive">
                      {state.errors.description.map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  )}
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
                      required
                      className="h-12 text-base border-2 focus:border-primary"
                    />
                    {state?.errors?.startDate && (
                      <div className="text-sm text-destructive">
                        {state.errors.startDate.map((error) => (
                          <p key={error}>{error}</p>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startTime" className="text-sm font-medium">
                      Start Time *
                    </Label>
                    <Input
                      id="startTime"
                      name="startTime"
                      type="time"
                      required
                      className="h-12 text-base border-2 focus:border-primary"
                    />
                    {state?.errors?.startTime && (
                      <div className="text-sm text-destructive">
                        {state.errors.startTime.map((error) => (
                          <p key={error}>{error}</p>
                        ))}
                      </div>
                    )}
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
                      required
                      className="h-12 text-base border-2 focus:border-primary"
                    />
                    {state?.errors?.endDate && (
                      <div className="text-sm text-destructive">
                        {state.errors.endDate.map((error) => (
                          <p key={error}>{error}</p>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime" className="text-sm font-medium">
                      End Time *
                    </Label>
                    <Input
                      id="endTime"
                      name="endTime"
                      type="time"
                      required
                      className="h-12 text-base border-2 focus:border-primary"
                    />
                    {state?.errors?.endTime && (
                      <div className="text-sm text-destructive">
                        {state.errors.endTime.map((error) => (
                          <p key={error}>{error}</p>
                        ))}
                      </div>
                    )}
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
                    required
                    className="h-12 text-base border-2 focus:border-primary"
                  />
                  {state?.errors?.location && (
                    <div className="text-sm text-destructive">
                      {state.errors.location.map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Category and Max Attendees */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium">
                      Category *
                    </Label>
                    <Select name="category" required>
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
                    {state?.errors?.category && (
                      <div className="text-sm text-destructive">
                        {state.errors.category.map((error) => (
                          <p key={error}>{error}</p>
                        ))}
                      </div>
                    )}
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
                      required
                      min="1"
                      className="h-12 text-base border-2 focus:border-primary"
                    />
                    {state?.errors?.maxAttendees && (
                      <div className="text-sm text-destructive">
                        {state.errors.maxAttendees.map((error) => (
                          <p key={error}>{error}</p>
                        ))}
                      </div>
                    )}
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
                    disabled={pending}
                    className="flex-1 h-12 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    {pending ? (
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
