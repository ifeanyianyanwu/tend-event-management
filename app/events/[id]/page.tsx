"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, ArrowLeft, MapPin, Clock, Users, Share2, CheckCircle, UserPlus, Edit, Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock event data
const mockEvent = {
  id: "1",
  name: "Tech Conference 2024",
  description:
    "Join us for the biggest technology conference of the year featuring industry leaders, innovative workshops, and networking opportunities.",
  start_time: "2024-03-15T09:00:00Z",
  end_time: "2024-03-15T17:00:00Z",
  location: "Convention Center, Downtown",
  status: "UPCOMING",
  creator: "John Doe",
  attendees: 150,
  maxAttendees: 200,
  isRegistered: true,
  isCreator: true,
}

const mockAttendees = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", status: "REGISTERED" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", status: "CHECKED_IN" },
  { id: "3", name: "Carol Davis", email: "carol@example.com", status: "REGISTERED" },
]

export default function EventDetailsPage({ params }: { params: { id: string } }) {
  const [isRegistering, setIsRegistering] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "UPCOMING":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "ONGOING":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "COMPLETED":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      case "CANCELLED":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const handleRegister = async () => {
    setIsRegistering(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setRegistrationSuccess(true)
    } catch (error) {
      console.error("Registration failed")
    } finally {
      setIsRegistering(false)
    }
  }

  const handleCancelRegistration = async () => {
    setIsRegistering(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Update registration status
      mockEvent.isRegistered = false
      setRegistrationSuccess(false)
    } catch (error) {
      console.error("Cancellation failed")
    } finally {
      setIsRegistering(false)
    }
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
                <Sparkles className="h-2 w-2 text-primary absolute -top-0.5 -right-0.5" />
              </div>
              <h1 className="text-xl font-bold">Event Details</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            {mockEvent.isCreator && (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/events/${params.id}/edit`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  <Link href={`/events/${params.id}/manage`}>Manage Event</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Event Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold">{mockEvent.name}</h1>
                <Badge className={getStatusColor(mockEvent.status)}>{mockEvent.status}</Badge>
              </div>
              <p className="text-muted-foreground text-lg mb-4">{mockEvent.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Start</div>
                    <div className="text-muted-foreground">{formatDate(mockEvent.start_time)}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">End</div>
                    <div className="text-muted-foreground">{formatDate(mockEvent.end_time)}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-muted-foreground">{mockEvent.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {!mockEvent.isCreator && (
              <div className="ml-8">
                {registrationSuccess ? (
                  <Alert className="w-64 border-2 bg-gradient-to-br from-green-500/5 to-green-500/10">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription>Successfully registered! Check your email for the ticket.</AlertDescription>
                  </Alert>
                ) : mockEvent.isRegistered ? (
                  <Card className="w-64 border-2 bg-gradient-to-br from-card to-card/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Registration Status</CardTitle>
                      <CardDescription>You're registered for this event</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="outline" className="w-full border-2 bg-transparent" asChild>
                        <Link href={`/tickets/${params.id}`}>View Ticket</Link>
                      </Button>
                      <Button variant="destructive" className="w-full" onClick={handleCancelRegistration}>
                        Cancel Registration
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="w-64 border-2 bg-gradient-to-br from-card to-card/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Register for Event</CardTitle>
                      <CardDescription>
                        {mockEvent.attendees} / {mockEvent.maxAttendees} registered
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={handleRegister}
                        disabled={isRegistering}
                        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                      >
                        {isRegistering ? "Registering..." : "Register Now"}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Event Details Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {mockEvent.isCreator && <TabsTrigger value="attendees">Attendees</TabsTrigger>}
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-2 bg-gradient-to-br from-card to-card/50">
                  <CardHeader>
                    <CardTitle>About This Event</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{mockEvent.description}</p>
                  </CardContent>
                </Card>

                <Card className="border-2 bg-gradient-to-br from-card to-card/50">
                  <CardHeader>
                    <CardTitle>Event Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 bg-muted/20 rounded-lg border">
                        <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                          09:00 AM
                        </div>
                        <div>
                          <div className="font-medium">Registration & Welcome</div>
                          <div className="text-sm text-muted-foreground">Check-in and networking</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-muted/20 rounded-lg border">
                        <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                          10:00 AM
                        </div>
                        <div>
                          <div className="font-medium">Keynote Presentation</div>
                          <div className="text-sm text-muted-foreground">Future of Technology</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-4 bg-muted/20 rounded-lg border">
                        <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                          12:00 PM
                        </div>
                        <div>
                          <div className="font-medium">Lunch & Networking</div>
                          <div className="text-sm text-muted-foreground">Catered lunch provided</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-2 bg-gradient-to-br from-card to-card/50">
                  <CardHeader>
                    <CardTitle>Event Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Registered</span>
                      <span className="font-medium">{mockEvent.attendees}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Capacity</span>
                      <span className="font-medium">{mockEvent.maxAttendees}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Available</span>
                      <span className="font-medium">{mockEvent.maxAttendees - mockEvent.attendees}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 bg-gradient-to-br from-card to-card/50">
                  <CardHeader>
                    <CardTitle>Organizer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{mockEvent.creator}</div>
                        <div className="text-sm text-muted-foreground">Event Organizer</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {mockEvent.isCreator && (
            <TabsContent value="attendees">
              <Card className="border-2 bg-gradient-to-br from-card to-card/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Event Attendees</CardTitle>
                    <CardDescription>{mockAttendees.length} registered attendees</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-2 bg-transparent">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Scanner
                    </Button>
                    <Button size="sm" variant="destructive">
                      Cancel Event
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAttendees.map((attendee) => (
                      <div
                        key={attendee.id}
                        className="flex items-center justify-between p-4 border rounded-lg bg-muted/20"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{attendee.name}</div>
                            <div className="text-sm text-muted-foreground">{attendee.email}</div>
                          </div>
                        </div>
                        <Badge
                          className={
                            attendee.status === "CHECKED_IN"
                              ? "bg-green-500/10 text-green-500 border-green-500/20"
                              : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                          }
                        >
                          {attendee.status === "CHECKED_IN" ? "Checked In" : "Registered"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  )
}
