"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, MapPin, Clock, Download, Share2, QrCode, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"
import { ticketService, type Ticket } from "@/services/ticket.service"

export default function TicketPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.eventId as string

  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(false)
  const [sharing, setSharing] = useState(false)

  useEffect(() => {
    const loadTicket = async () => {
      try {
        setLoading(true)
        const ticketData = await ticketService.getTicket(eventId)

        if (!ticketData) {
          setError("Ticket not found")
          return
        }

        setTicket(ticketData)
      } catch (err) {
        setError("Failed to load ticket")
        console.error("Error loading ticket:", err)
      } finally {
        setLoading(false)
      }
    }

    if (eventId) {
      loadTicket()
    }
  }, [eventId])

  const handleDownload = async () => {
    if (!ticket) return

    try {
      setDownloading(true)
      const pdfData = await ticketService.downloadTicket(ticket.id)

      // Create download link
      const link = document.createElement("a")
      link.href = pdfData
      link.download = `ticket-${ticket.id}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error("Error downloading ticket:", err)
    } finally {
      setDownloading(false)
    }
  }

  const handleShare = async () => {
    if (!ticket) return

    try {
      setSharing(true)

      if (navigator.share) {
        await navigator.share({
          title: `Ticket for ${ticket.event.name}`,
          text: `Check out my ticket for ${ticket.event.name}`,
          url: window.location.href,
        })
      } else {
        // Fallback to copying to clipboard
        await navigator.clipboard.writeText(window.location.href)
        alert("Ticket link copied to clipboard!")
      }
    } catch (err) {
      console.error("Error sharing ticket:", err)
    } finally {
      setSharing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Loading your ticket...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Alert variant="destructive" className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || "Ticket not found"}</AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "used":
        return "bg-gray-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "used":
        return <Clock className="h-4 w-4" />
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="max-w-2xl mx-auto">
          {/* Ticket Card */}
          <Card className="border-2 bg-gradient-to-br from-card to-card/50 overflow-hidden">
            {/* Event Image */}
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <Calendar className="h-16 w-16 text-primary" />
            </div>

            <CardHeader className="text-center">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className={`${getStatusColor(ticket.status)} text-white border-0`}>
                  <span className="flex items-center space-x-1">
                    {getStatusIcon(ticket.status)}
                    <span className="capitalize">{ticket.status}</span>
                  </span>
                </Badge>
                <Badge variant="outline">Ticket #{ticket.id.slice(-6)}</Badge>
              </div>

              <CardTitle className="text-2xl mb-2">{ticket.event.name}</CardTitle>
              <CardDescription className="text-base">{ticket.event.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{ticket.event.date}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{ticket.event.location}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* QR Code Section */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-white border-2 border-dashed border-primary/30 rounded-lg mb-4">
                  <QrCode className="h-16 w-16 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-2">QR Code</p>
                <p className="font-mono text-sm bg-muted px-3 py-1 rounded">{ticket.qrCode}</p>
              </div>

              <Separator />

              {/* Purchase Info */}
              <div className="text-center text-sm text-muted-foreground">
                <p>Purchased on {new Date(ticket.purchaseDate).toLocaleDateString()}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
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
                      Download PDF
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleShare}
                  disabled={sharing}
                  className="flex-1 border-2 bg-transparent"
                >
                  {sharing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
                      Sharing...
                    </>
                  ) : (
                    <>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Ticket
                    </>
                  )}
                </Button>
              </div>

              {ticket.status === "active" && (
                <Alert className="border-2 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    Your ticket is valid and ready to use. Present the QR code at the event entrance.
                  </AlertDescription>
                </Alert>
              )}

              {ticket.status === "used" && (
                <Alert className="border-2 border-gray-200 bg-gray-50 dark:bg-gray-950 dark:border-gray-800">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <AlertDescription className="text-gray-800 dark:text-gray-200">
                    This ticket has been used and is no longer valid for entry.
                  </AlertDescription>
                </Alert>
              )}

              {ticket.status === "cancelled" && (
                <Alert variant="destructive" className="border-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>This ticket has been cancelled and cannot be used for entry.</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
