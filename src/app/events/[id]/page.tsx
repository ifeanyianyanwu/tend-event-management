"use client"

import { useState } from "react"
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

// Mock event data
const mockEvent = {
  id: "1",
  name: "Tech Conference 2024",
  description:
    "Join us for the most comprehensive technology conference of the year. This event brings together industry leaders, innovative startups, and tech enthusiasts to explore the latest trends in artificial intelligence, blockchain, cloud computing, and more. Network with professionals, attend hands-on workshops, and gain insights that will shape the future of technology.",
  longDescription: `
    This comprehensive technology conference spans three days of intensive learning and networking opportunities. 
    
    Day 1: AI and Machine Learning
    - Keynote: The Future of AI in Business
    - Workshop: Building ML Models with TensorFlow
    - Panel: Ethics in AI Development
    
    Day 2: Blockchain and Web3
    - Keynote: Decentralized Finance Revolution
    - Workshop: Smart Contract Development
    - Panel: NFTs and Digital Ownership
    
    Day 3: Cloud and DevOps
    - Keynote: Serverless Architecture at Scale
    - Workshop: Kubernetes in Production
    - Panel: Security in the Cloud Era
    
    All attendees will receive:
    - Conference materials and swag bag
    - Access to recorded sessions
    - Networking lunch and coffee breaks
    - Certificate of attendance
  `,
  start_time: "2024-03-15T09:00:00Z",
  end_time: "2024-03-15T17:00:00Z",
  location: "Convention Center, 123 Tech Street, San Francisco, CA",
  status: "UPCOMING",
  attendees: 150,
  maxAttendees: 200,
  creator: "TechCorp Events",
  category: "Technology",
  price: "Free",
  isRegistered: false,
  tags: ["Technology", "AI", "Blockchain", "Cloud", "Networking"],
}

export default function EventDetailsPage({ params }: { params: { id: string } }) {
  const [registering, setRegistering] = useState(false)
  const [isRegistered, setIsRegistered] = useState(mockEvent.isRegistered)
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false)
  const [liked, setLiked] = useState(false)

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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsRegistered(true)
      setShowRegistrationDialog(false)
    } catch (error) {
      console.error("Registration failed")
    } finally {
      setRegistering(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: mockEvent.name,
          text: mockEvent.description,
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
                  EventHub
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
                      <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">{mockEvent.status}</Badge>
                      <Badge variant="outline" className="border-primary/20 text-primary">
                        {mockEvent.category}
                      </Badge>
                      <Badge variant="outline">{mockEvent.price}</Badge>
                    </div>
                    <CardTitle className="text-3xl mb-2">{mockEvent.name}</CardTitle>
                    <CardDescription className="text-lg">{mockEvent.description}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setLiked(!liked)} className="ml-4">
                    <Heart className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {mockEvent.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
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
                        <div className="text-sm text-muted-foreground">{formatDate(mockEvent.start_time)}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Time</div>
                        <div className="text-sm text-muted-foreground">
                          {formatTime(mockEvent.start_time)} - {formatTime(mockEvent.end_time)}
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
                        <div className="text-sm text-muted-foreground">{mockEvent.location}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Attendees</div>
                        <div className="text-sm text-muted-foreground">
                          {mockEvent.attendees} / {mockEvent.maxAttendees} registered
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">About This Event</h3>
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    <div className="whitespace-pre-line">{mockEvent.longDescription}</div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Organized by</h3>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{mockEvent.creator}</div>
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
                      <div className="text-2xl font-bold text-primary">{mockEvent.price}</div>
                      <div className="text-sm text-muted-foreground">
                        {mockEvent.maxAttendees - mockEvent.attendees} spots remaining
                      </div>
                    </div>

                    <Dialog open={showRegistrationDialog} onOpenChange={setShowRegistrationDialog}>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full h-12 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                          disabled={mockEvent.attendees >= mockEvent.maxAttendees}
                        >
                          {mockEvent.attendees >= mockEvent.maxAttendees ? "Event Full" : "Register Now"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Registration</DialogTitle>
                          <DialogDescription>
                            You're about to register for "{mockEvent.name}". This event is free to attend.
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
                      <Link href={`/tickets/${mockEvent.id}`}>View My Ticket</Link>
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
                  <span className="font-medium">{mockEvent.attendees}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Capacity</span>
                  <span className="font-medium">{mockEvent.maxAttendees}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Availability</span>
                  <span className="font-medium text-green-600">
                    {mockEvent.maxAttendees - mockEvent.attendees} spots
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full"
                    style={{
                      width: `${(mockEvent.attendees / mockEvent.maxAttendees) * 100}%`,
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
