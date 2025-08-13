"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowLeft,
  Share2,
  Heart,
  CheckCircle,
  AlertCircle,
  Sparkles,
  User,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { eventService } from "@/services/event.service"
import { registrationService } from "@/services/registration.service"

export default function EventDetailsPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<any>(null)
  const [registering, setRegistering] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false)
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const eventData = await eventService.getEventById(params.id)
        setEvent(eventData)
        setIsRegistered(eventData?.isRegistered || false)
      } catch (error) {
        console.error("Failed to load event:", error)
      } finally {
        setLoading(false)
      }
    }

    loadEvent()
  }, [params.id])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleRegister = async () => {
    setRegistering(true)
    try {
      const result = await registrationService.registerForEvent(params.id)
      if (result.success) {
        setIsRegistered(true)
        setShowRegistrationDialog(false)
        setEvent({ ...event, attendees: event.attendees + 1 })
      }
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setRegistering(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.name,
          text: event.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <Card className="w-full max-w-md border-2 bg-gradient-to-br from-card to-card/50">
          <CardContent className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Event Not Found</h2>
            <p className="text-muted-foreground mb-4">The event you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/events">Browse Events</Link>
            </Button>
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
                <Link href="/events">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Events
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
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Header */}
            <Card className="border-2 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">{event.status}</Badge>
                      <Badge variant="outline" className="border-primary/20 text-primary">
                        {event.category}
                      </Badge>
                      <Badge variant="outline">{event.price > 0 ? `$${event.price}` : "Free"}</Badge>
                    </div>
                    <CardTitle className="text-3xl mb-2">{event.name}</CardTitle>
                    <CardDescription className="text-lg">{event.description}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setLiked(!liked)} className="ml-4">
                    <Heart className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                </div>

                {event.tags && (
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardHeader>
            </Card>

            {/* Event Details */}
            <Card className="border-2 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Event Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Date</div>
                        <div className="text-sm text-muted-foreground">{formatDate(event.start_time)}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Time</div>
                        <div className="text-sm text-muted-foreground">
                          {formatTime(event.start_time)} - {formatTime(event.end_time)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Location</div>
                        <div className="text-sm text-muted-foreground">{event.location}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Attendees</div>
                        <div className="text-sm text-muted-foreground">
                          {event.attendees} / {event.maxAttendees} registered
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {event.longDescription && (
                  <>
                    <div>
                      <h3 className="font-semibold mb-3">About This Event</h3>
                      <div className="prose prose-sm max-w-none text-muted-foreground">
                        <div className="whitespace-pre-line">{event.longDescription}</div>
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                <div>
                  <h3 className="font-semibold mb-3">Organized by</h3>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{event.creator}</div>
                      <div className="text-sm text-muted-foreground">Event Organizer</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <Card className="border-2 bg-gradient-to-br from-card to-card/50 sticky top-24">
              <CardHeader>
                <CardTitle className="text-center">{isRegistered ? "You're Registered!" : "Join This Event"}</CardTitle>
                {isRegistered && (
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                    <CardDescription>You're all set! Check your email for event details.</CardDescription>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {!isRegistered ? (
                  <>
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold text-primary">
                        {event.price > 0 ? `$${event.price}` : "Free"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {event.maxAttendees - event.attendees} spots remaining
                      </div>
                    </div>

                    <Dialog open={showRegistrationDialog} onOpenChange={setShowRegistrationDialog}>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full h-12 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                          disabled={event.attendees >= event.maxAttendees}
                        >
                          {event.attendees >= event.maxAttendees ? "Event Full" : "Register Now"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Registration</DialogTitle>
                          <DialogDescription>
                            You're about to register for "{event.name}".{" "}
                            {event.price > 0 ? `This event costs $${event.price}.` : "This event is free to attend."}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Alert className="border-2 bg-gradient-to-br from-blue-500/5 to-blue-500/10">
                            <AlertCircle className="h-4 w-4 text-blue-500" />
                            <AlertDescription className="text-blue-700 dark:text-blue-400">
                              You'll receive a confirmation email with event details and your QR code ticket.
                            </AlertDescription>
                          </Alert>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowRegistrationDialog(false)}>
                            Cancel
                          </Button>
                          <Button
                            onClick={handleRegister}
                            disabled={registering}
                            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                          >
                            {registering ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                Registering...
                              </>
                            ) : (
                              "Confirm Registration"
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </>
                ) : (
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full border-2 bg-transparent" asChild>
                      <Link href={`/tickets/${event.id}`}>View My Ticket</Link>
                    </Button>
                    <Button variant="outline" className="w-full border-2 bg-transparent">
                      Add to Calendar
                    </Button>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• Free cancellation up to 24 hours before</div>
                    <div>• Confirmation email with QR code</div>
                    <div>• Event materials included</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Event Stats */}
            <Card className="border-2 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle className="text-lg">Event Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Registered</span>
                  <span className="font-medium">{event.attendees}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Capacity</span>
                  <span className="font-medium">{event.maxAttendees}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Availability</span>
                  <span className="font-medium text-green-600">{event.maxAttendees - event.attendees} spots</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full"
                    style={{
                      width: `${(event.attendees / event.maxAttendees) * 100}%`,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
