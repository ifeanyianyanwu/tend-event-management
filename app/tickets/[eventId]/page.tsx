"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin, Clock, Download, Share2 } from "lucide-react"

// Mock ticket data
const mockTicket = {
  id: "ticket-123",
  eventId: "1",
  eventName: "Tech Conference 2024",
  eventDescription: "Annual technology conference",
  startTime: "2024-03-15T09:00:00Z",
  endTime: "2024-03-15T17:00:00Z",
  location: "Convention Center, Downtown",
  attendeeName: "John Doe",
  attendeeEmail: "john@example.com",
  registeredAt: "2024-02-15T10:30:00Z",
  qrCode: "QR123456789",
  status: "REGISTERED",
}

export default function TicketPage({ params }: { params: { eventId: string } }) {
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

  const generateQRCode = (text: string) => {
    // In a real app, you'd use a QR code library
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`
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
              <h1 className="text-xl font-bold text-gray-900">Event Ticket</h1>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Ticket Card */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{mockTicket.eventName}</CardTitle>
                  <CardDescription className="text-blue-100">{mockTicket.eventDescription}</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {mockTicket.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Event Time</div>
                      <div className="text-sm text-gray-600">
                        <div>Start: {formatDate(mockTicket.startTime)}</div>
                        <div>End: {formatDate(mockTicket.endTime)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Location</div>
                      <div className="text-sm text-gray-600">{mockTicket.location}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="font-medium text-gray-900">Attendee</div>
                    <div className="text-sm text-gray-600">{mockTicket.attendeeName}</div>
                    <div className="text-sm text-gray-600">{mockTicket.attendeeEmail}</div>
                  </div>

                  <div>
                    <div className="font-medium text-gray-900">Ticket ID</div>
                    <div className="text-sm text-gray-600 font-mono">{mockTicket.id}</div>
                  </div>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="border-t pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Present this QR code at the event entrance
                  </h3>

                  <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
                    <img
                      src={generateQRCode(mockTicket.qrCode) || "/placeholder.svg"}
                      alt="Event QR Code"
                      className="w-48 h-48 mx-auto"
                    />
                  </div>

                  <div className="mt-4 text-sm text-gray-600">
                    QR Code: <span className="font-mono">{mockTicket.qrCode}</span>
                  </div>
                </div>
              </div>

              {/* Important Information */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Important Information</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Please arrive 15 minutes before the event starts</li>
                  <li>• Bring a valid ID for verification</li>
                  <li>• This ticket is non-transferable</li>
                  <li>• Screenshots of this QR code are acceptable</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Additional Actions */}
          <div className="mt-6 flex justify-center space-x-4">
            <Button asChild>
              <Link href={`/events/${params.eventId}`}>View Event Details</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
