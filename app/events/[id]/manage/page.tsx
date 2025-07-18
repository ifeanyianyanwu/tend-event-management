"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, ArrowLeft, Users, Settings, Trash2, AlertTriangle, Edit, QrCode, Mail, UserPlus } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock event data
const mockEvent = {
  id: "1",
  name: "Tech Conference 2024",
  description: "Annual technology conference",
  start_time: "2024-03-15T09:00:00Z",
  end_time: "2024-03-15T17:00:00Z",
  location: "Convention Center",
  status: "UPCOMING",
  attendees: 150,
  maxAttendees: 200,
}

const mockAttendees = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    status: "REGISTERED",
    registeredAt: "2024-02-10T10:00:00Z",
  },
  { id: "2", name: "Bob Smith", email: "bob@example.com", status: "REGISTERED", registeredAt: "2024-02-11T14:30:00Z" },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol@example.com",
    status: "REGISTERED",
    registeredAt: "2024-02-12T09:15:00Z",
  },
]

const mockScanners = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Creator" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Scanner" },
]

export default function ManageEventPage({ params }: { params: { id: string } }) {
  const [cancelling, setCancelling] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [showAddScannerDialog, setShowAddScannerDialog] = useState(false)
  const [scannerEmail, setScannerEmail] = useState("")
  const [addingScanner, setAddingScanner] = useState(false)
  const router = useRouter()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleCancelEvent = async () => {
    setCancelling(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      router.push("/dashboard?tab=my-events")
    } catch (error) {
      console.error("Failed to cancel event")
    } finally {
      setCancelling(false)
      setShowCancelDialog(false)
    }
  }

  const handleAddScanner = async () => {
    setAddingScanner(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setScannerEmail("")
      setShowAddScannerDialog(false)
    } catch (error) {
      console.error("Failed to add scanner")
    } finally {
      setAddingScanner(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/events/${params.id}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Event
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Settings className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Manage Event</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="outline" asChild>
              <Link href={`/events/${params.id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Event
              </Link>
            </Button>
            <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Cancel Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <span>Cancel Event</span>
                  </DialogTitle>
                  <DialogDescription>
                    Are you sure you want to cancel "{mockEvent.name}"? This action cannot be undone and all registered
                    attendees will be notified.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                    Keep Event
                  </Button>
                  <Button variant="destructive" onClick={handleCancelEvent} disabled={cancelling}>
                    {cancelling ? "Cancelling..." : "Cancel Event"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Event Overview */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{mockEvent.name}</h2>
          <p className="text-muted-foreground">{mockEvent.description}</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendees">Attendees</TabsTrigger>
            <TabsTrigger value="scanners">Scanners</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <Card className="border-2 bg-gradient-to-br from-card to-card/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
                  <Users className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockEvent.attendees}</div>
                  <p className="text-xs text-muted-foreground">
                    {((mockEvent.attendees / mockEvent.maxAttendees) * 100).toFixed(1)}% capacity
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 bg-gradient-to-br from-card to-card/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Available Spots</CardTitle>
                  <Users className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockEvent.maxAttendees - mockEvent.attendees}</div>
                  <p className="text-xs text-muted-foreground">of {mockEvent.maxAttendees} total capacity</p>
                </CardContent>
              </Card>

              <Card className="border-2 bg-gradient-to-br from-card to-card/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Event Status</CardTitle>
                  <Calendar className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockEvent.status}</div>
                  <p className="text-xs text-muted-foreground">{formatDate(mockEvent.start_time)}</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Registrations */}
            <Card className="mt-6 border-2 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle>Recent Registrations</CardTitle>
                <CardDescription>Latest attendees who registered for your event</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAttendees.slice(0, 5).map((attendee) => (
                    <div
                      key={attendee.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-muted/20"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{attendee.name}</div>
                          <div className="text-sm text-muted-foreground">{attendee.email}</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{formatDate(attendee.registeredAt)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendees">
            <Card className="border-2 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle>Event Attendees</CardTitle>
                <CardDescription>View all registered attendees (read-only)</CardDescription>
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
                          <div className="text-xs text-muted-foreground">
                            Registered: {formatDate(attendee.registeredAt)}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">{attendee.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scanners">
            <Card className="border-2 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>QR Code Scanners</CardTitle>
                  <CardDescription>Manage who can scan tickets at your event</CardDescription>
                </div>
                <Dialog open={showAddScannerDialog} onOpenChange={setShowAddScannerDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Scanner
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add QR Code Scanner</DialogTitle>
                      <DialogDescription>
                        Enter the email address of the person you want to assign as a scanner for this event.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="scannerEmail">Scanner Email Address</Label>
                        <Input
                          id="scannerEmail"
                          type="email"
                          placeholder="Enter email address"
                          value={scannerEmail}
                          onChange={(e) => setScannerEmail(e.target.value)}
                          className="border-2 focus:border-primary"
                        />
                        <p className="text-sm text-muted-foreground">
                          If this person doesn't have an account, they'll be invited to create one.
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowAddScannerDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddScanner} disabled={addingScanner || !scannerEmail}>
                        {addingScanner ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Adding...
                          </>
                        ) : (
                          <>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Invitation
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockScanners.map((scanner) => (
                    <div
                      key={scanner.id}
                      className="flex items-center justify-between p-4 border rounded-lg bg-muted/20"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <QrCode className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{scanner.name}</div>
                          <div className="text-sm text-muted-foreground">{scanner.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={scanner.role === "Creator" ? "default" : "secondary"}>{scanner.role}</Badge>
                        {scanner.role !== "Creator" && (
                          <Button variant="outline" size="sm">
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card className="border-2 bg-gradient-to-br from-card to-card/50">
                <CardHeader>
                  <CardTitle>Event Actions</CardTitle>
                  <CardDescription>Manage your event settings and actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
                    <div>
                      <h3 className="font-medium">Edit Event Details</h3>
                      <p className="text-sm text-muted-foreground">
                        Update event information, date, time, and location
                      </p>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href={`/events/${params.id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
                    <div>
                      <h3 className="font-medium">Export Attendee List</h3>
                      <p className="text-sm text-muted-foreground">Download a CSV file with all attendee information</p>
                    </div>
                    <Button variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
                    <div>
                      <h3 className="font-medium">Send Announcement</h3>
                      <p className="text-sm text-muted-foreground">Send an email update to all registered attendees</p>
                    </div>
                    <Button variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200 bg-gradient-to-br from-card to-card/50">
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  <CardDescription>Irreversible actions for your event</CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert className="mb-4 border-red-200">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Cancelling your event will notify all attendees and cannot be undone.
                    </AlertDescription>
                  </Alert>

                  <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                    <DialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Cancel Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                          <span>Cancel Event</span>
                        </DialogTitle>
                        <DialogDescription>
                          Are you sure you want to cancel "{mockEvent.name}"? This action cannot be undone and all
                          registered attendees will be notified.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                          Keep Event
                        </Button>
                        <Button variant="destructive" onClick={handleCancelEvent} disabled={cancelling}>
                          {cancelling ? "Cancelling..." : "Cancel Event"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
