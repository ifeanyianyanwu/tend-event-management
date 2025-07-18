"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, ArrowLeft, MapPin, Clock, Users, Share2, CheckCircle, UserPlus } from "lucide-react"

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
        return "bg-blue-100 text-blue-800"
      case "ONGOING":
        return "bg-green-100 text-green-800"
      case "COMPLETED":
        return "bg-gray-100 text-gray-800"
      case "CANCELLED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Event Details</h1>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            {mockEvent.isCreator && (
              <Button size="sm" asChild>
                <Link href={`/events/${params.id}/manage`}>Manage Event</Link>
              </Button>
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
                <h1 className="text-3xl font-bold text-gray-900">{mockEvent.name}</h1>
                <Badge className={getStatusColor(mockEvent.status)}>{mockEvent.status}</Badge>
              </div>
              <p className="text-gray-600 text-lg mb-4">{mockEvent.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="font-medium">Start</div>
                    <div className="text-gray-600">{formatDate(mockEvent.start_time)}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="font-medium">End</div>
                    <div className="text-gray-600">{formatDate(mockEvent.end_time)}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-gray-600">{mockEvent.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {!mockEvent.isCreator && (
              <div className="ml-8">
                {registrationSuccess ? (
                  <Alert className="w-64">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>Successfully registered! Check your email for the ticket.</AlertDescription>
                  </Alert>
                ) : mockEvent.isRegistered ? (
                  <Card className="w-64">
                    <CardHeader>
                      <CardTitle className="text-lg">Registration Status</CardTitle>
                      <CardDescription>You're registered for this event</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="outline" className="w-full bg-transparent" asChild>
                        <Link href={`/tickets/${params.id}`}>View Ticket</Link>
                      </Button>
                      <Button variant="destructive" className="w-full" onClick={handleCancelRegistration}>
                        Cancel Registration
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="w-64">
                    <CardHeader>
                      <CardTitle className="text-lg">Register for Event</CardTitle>
                      <CardDescription>
                        {mockEvent.attendees} / {mockEvent.maxAttendees} registered
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button onClick={handleRegister} disabled={isRegistering} className="w-full">
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
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {mockEvent.isCreator && <TabsTrigger value="attendees">Attendees</TabsTrigger>}
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Event</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{mockEvent.description}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Event Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-600">09:00 AM</div>
                        <div>
                          <div className="font-medium">Registration & Welcome</div>
                          <div className="text-sm text-gray-600">Check-in and networking</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-600">10:00 AM</div>
                        <div>
                          <div className="font-medium">Keynote Presentation</div>
                          <div className="text-sm text-gray-600">Future of Technology</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-600">12:00 PM</div>
                        <div>
                          <div className="font-medium">Lunch & Networking</div>
                          <div className="text-sm text-gray-600">Catered lunch provided</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Registered</span>
                      <span className="font-medium">{mockEvent.attendees}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Capacity</span>
                      <span className="font-medium">{mockEvent.maxAttendees}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Available</span>
                      <span className="font-medium">{mockEvent.maxAttendees - mockEvent.attendees}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Organizer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{mockEvent.creator}</div>
                        <div className="text-sm text-gray-600">Event Organizer</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {mockEvent.isCreator && (
            <TabsContent value="attendees">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Event Attendees</CardTitle>
                    <CardDescription>{mockAttendees.length} registered attendees</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Attendee
                    </Button>
                    <Button size="sm" variant="destructive">
                      Cancel Event
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAttendees.map((attendee) => (
                      <div key={attendee.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-medium">{attendee.name}</div>
                            <div className="text-sm text-gray-600">{attendee.email}</div>
                          </div>
                        </div>
                        <Badge variant={attendee.status === "CHECKED_IN" ? "default" : "secondary"}>
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
