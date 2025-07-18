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
  QrCode,
  Download,
  Share2,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  User,
  Mail,
  Phone,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock ticket data
const mockTicket = {
  id: "TKT-2024-001234",
  eventId: "1",
  eventName: "Tech Conference 2024",
  eventDescription: "Annual technology conference featuring industry leaders",
  startTime: "2024-03-15T09:00:00Z",
  endTime: "2024-03-15T17:00:00Z",
  location: "Convention Center, 123 Tech Street, San Francisco, CA",
  attendeeName: "John Doe",
  attendeeEmail: "john.doe@example.com",
  registrationDate: "2024-02-10T10:00:00Z",
  status: "CONFIRMED",
  qrCode:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiI+UVIgQ29kZTwvdGV4dD4KPC9zdmc+",
  seatNumber: null,
  specialInstructions: "Please arrive 30 minutes early for check-in. Bring a valid ID.",
}

export default function TicketPage({ params }: { params: { eventId: string } }) {
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [cancelling, setCancelling] = useState(false)

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

  const handleDownload = () => {
    // Create a simple ticket download
    const ticketData = `
Event: ${mockTicket.eventName}
Date: ${formatDate(mockTicket.startTime)}
Time: ${formatTime(mockTicket.startTime)} - ${formatTime(mockTicket.endTime)}
Location: ${mockTicket.location}
Ticket ID: ${mockTicket.id}
Attendee: ${mockTicket.attendeeName}
    `.trim()

    const blob = new Blob([ticketData], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ticket-${mockTicket.id}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My ticket for ${mockTicket.eventName}`,
          text: `I'm attending ${mockTicket.eventName} on ${formatDate(mockTicket.startTime)}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    }
  }

  const handleCancelRegistration = async () => {
    setCancelling(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // Redirect to events page after cancellation
      window.location.href = "/events"
    } catch (error) {
      console.error("Failed to cancel registration")
    } finally {
      setCancelling(false)
      setShowCancelDialog(false)
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
                <Link href={`/events/${params.eventId}`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Event
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
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <CheckCircle className="h-4 w-4" />
              <span>Registration Confirmed</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Your Event Ticket</h1>
            <p className="text-muted-foreground">Present this QR code at the event entrance for check-in</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ticket Card */}
            <div className="lg:col-span-2">
              <Card className="border-2 bg-gradient-to-br from-card to-card/50 overflow-hidden">
                {/* Ticket Header */}
                <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-6 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20">{mockTicket.status}</Badge>
                    <div className="text-sm text-muted-foreground">Ticket ID: {mockTicket.id}</div>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{mockTicket.eventName}</h2>
                  <p className="text-muted-foreground">{mockTicket.eventDescription}</p>
                </div>

                <CardContent className="p-6">
                  {/* Event Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Date</div>
                          <div className="text-sm text-muted-foreground">{formatDate(mockTicket.startTime)}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Time</div>
                          <div className="text-sm text-muted-foreground">
                            {formatTime(mockTicket.startTime)} - {formatTime(mockTicket.endTime)}
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
                          <div className="text-sm text-muted-foreground">{mockTicket.location}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Attendee</div>
                          <div className="text-sm text-muted-foreground">{mockTicket.attendeeName}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Attendee Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Attendee Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Email</div>
                          <div className="text-sm text-muted-foreground">{mockTicket.attendeeEmail}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Registered</div>
                          <div className="text-sm text-muted-foreground">{formatDate(mockTicket.registrationDate)}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {mockTicket.specialInstructions && (
                    <>
                      <Separator className="my-6" />
                      <Alert className="border-2 bg-gradient-to-br from-blue-500/5 to-blue-500/10">
                        <AlertTriangle className="h-4 w-4 text-blue-500" />
                        <AlertDescription className="text-blue-700 dark:text-blue-400">
                          <strong>Important:</strong> {mockTicket.specialInstructions}
                        </AlertDescription>
                      </Alert>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* QR Code and Actions */}
            <div className="space-y-6">
              {/* QR Code Card */}
              <Card className="border-2 bg-gradient-to-br from-card to-card/50">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center space-x-2">
                    <QrCode className="h-5 w-5 text-primary" />
                    <span>Entry QR Code</span>
                  </CardTitle>
                  <CardDescription>Show this code at the event entrance</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="bg-white p-4 rounded-lg inline-block mb-4">
                    <img src={mockTicket.qrCode || "/placeholder.svg"} alt="QR Code" className="w-48 h-48 mx-auto" />
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">{mockTicket.id}</div>
                </CardContent>
              </Card>

              {/* Actions Card */}
              <Card className="border-2 bg-gradient-to-br from-card to-card/50">
                <CardHeader>
                  <CardTitle className="text-lg">Ticket Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={handleDownload}
                    className="w-full justify-start bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Ticket
                  </Button>

                  <Button variant="outline" className="w-full justify-start border-2 bg-transparent">
                    <Calendar className="h-4 w-4 mr-2" />
                    Add to Calendar
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="w-full justify-start border-2 bg-transparent"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Ticket
                  </Button>

                  <Separator />

                  <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="w-full justify-start">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Cancel Registration
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                          <span>Cancel Registration</span>
                        </DialogTitle>
                        <DialogDescription>
                          Are you sure you want to cancel your registration for "{mockTicket.eventName}"? This action
                          cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                          Keep Registration
                        </Button>
                        <Button variant="destructive" onClick={handleCancelRegistration} disabled={cancelling}>
                          {cancelling ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                              Cancelling...
                            </>
                          ) : (
                            "Cancel Registration"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* Help Card */}
              <Card className="border-2 bg-gradient-to-br from-card to-card/50">
                <CardHeader>
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div>• Save this ticket to your phone</div>
                  <div>• Arrive 30 minutes early</div>
                  <div>• Bring a valid photo ID</div>
                  <div>• Contact support if you have issues</div>

                  <Separator className="my-3" />

                  <Button variant="outline" size="sm" className="w-full border-2 bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
