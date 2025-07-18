"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowLeft, MapPin, Clock, QrCode, Download, Share2, CheckCircle, Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock ticket data
const mockTicket = {
  id: "TKT-001-2024",
  eventId: "1",
  eventName: "Tech Conference 2024",
  eventDescription: "Annual technology conference featuring industry leaders",
  start_time: "2024-03-15T09:00:00Z",
  end_time: "2024-03-15T17:00:00Z",
  location: "Convention Center, Downtown",
  attendeeName: "John Doe",
  attendeeEmail: "john@example.com",
  registrationDate: "2024-02-15T10:30:00Z",
  status: "CONFIRMED",
  qrCode: "QR123456789",
}

export default function TicketPage({ params }: { params: { eventId: string } }) {
  const [downloading, setDownloading] = useState(false)

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

  const handleDownload = async () => {
    setDownloading(true)
    try {
      // Simulate download
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // In real app, this would trigger a PDF download
    } catch (error) {
      console.error("Download failed")
    } finally {
      setDownloading(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: mockTicket.eventName,
          text: `Check out my ticket for ${mockTicket.eventName}!`,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Share failed")
      }
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
                <QrCode className="h-6 w-6 text-primary" />
                <Sparkles className="h-2 w-2 text-primary absolute -top-0.5 -right-0.5" />
              </div>
              <h1 className="text-xl font-bold">Event Ticket</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              size="sm"
              onClick={handleDownload}
              disabled={downloading}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              {downloading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Ticket Card */}
          <Card className="border-2 bg-gradient-to-br from-card to-card/50 overflow-hidden">
            {/* Ticket Header */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{mockTicket.eventName}</h1>
                    <p className="text-muted-foreground">{mockTicket.eventDescription}</p>
                  </div>
                </div>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {mockTicket.status}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Event Date</div>
                    <div className="text-sm text-muted-foreground">{formatDate(mockTicket.start_time)}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-sm text-muted-foreground">{mockTicket.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Body */}
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Attendee Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Attendee Information</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-muted-foreground">Name</div>
                      <div className="font-medium">{mockTicket.attendeeName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Email</div>
                      <div className="font-medium">{mockTicket.attendeeEmail}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Ticket ID</div>
                      <div className="font-mono text-sm bg-muted/20 px-2 py-1 rounded">{mockTicket.id}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Registration Date</div>
                      <div className="text-sm">
                        {new Date(mockTicket.registrationDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center justify-center space-y-4">
                  <h3 className="text-lg font-semibold">Entry QR Code</h3>
                  <div className="p-6 bg-white rounded-lg border-2 border-dashed border-primary/20">
                    <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-primary" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center max-w-xs">
                    Present this QR code at the event entrance for quick check-in
                  </p>
                </div>
              </div>
            </CardContent>

            {/* Ticket Footer */}
            <div className="border-t bg-muted/20 p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1 border-2 bg-transparent" asChild>
                  <Link href={`/events/${params.eventId}`}>View Event Details</Link>
                </Button>
                <Button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  {downloading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download Ticket
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* Important Information */}
          <Card className="mt-6 border-2 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="text-lg">Important Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Please arrive 15 minutes before the event start time</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Bring a valid ID that matches the name on this ticket</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>This ticket is non-transferable and non-refundable</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Keep this ticket safe - screenshots are not accepted</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
