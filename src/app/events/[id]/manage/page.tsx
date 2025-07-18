"use client"

import type React from "react"

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
import {
  Calendar,
  ArrowLeft,
  Users,
  Trash2,
  AlertTriangle,
  Edit,
  Mail,
  UserPlus,
  Sparkles,
  CheckCircle,
} from "lucide-react"
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
  { id: "1", email: "scanner1@example.com", name: "John Scanner", status: "ACTIVE" },
  { id: "2", email: "scanner2@example.com", name: "Jane Scanner", status: "PENDING" },
]

export default function ManageEventPage({ params }: { params: { id: string } }) {
  const [cancelling, setCancelling] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [showAddScannerDialog, setShowAddScannerDialog] = useState(false)
  const [scannerEmail, setScannerEmail] = useState("")
  const [addingScanner, setAddingScanner] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
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

  const handleAddScanner = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddingScanner(true)
    setError("")
    setSuccess("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess(`Scanner invitation sent to ${scannerEmail}`)
      setScannerEmail("")
    } catch (err) {
      setError("Failed to add scanner. Please try again.")
    } finally {
      setAddingScanner(false)
    }
  }

  const handleRemoveScanner = async (scannerId: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      setSuccess("Scanner removed successfully")
    } catch (err) {
      setError("Failed to remove scanner")
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
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Calendar className="h-6 w-6 text-primary" />
                <Sparkles className="h-2 w-2 text-primary absolute -top-0.5 -right-0.5" />
              </div>
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
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{mockEvent.name}</h1>
              <p className="text-muted-foreground">Manage your event settings and scanners</p>
            </div>
            <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">{mockEvent.status}</Badge>
          </div>
        </div>

        <Tabs defaultValue="scanners" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="scanners">Scanner Management</TabsTrigger>
            <TabsTrigger value="settings">Event Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="scanners">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Add Scanner Form */}
              <div className="lg:col-span-1">
                <Card className="border-2 bg-gradient-to-br from-card to-card/50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <UserPlus className="h-5 w-5 text-primary" />
                      <span>Add Scanner</span>
                    </CardTitle>
                    <CardDescription>Invite someone to scan tickets for your event</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddScanner} className="space-y-4">
                      {success && (
                        <Alert className="border-2 bg-gradient-to-br from-green-500/5 to-green-500/10">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <AlertDescription className="text-green-700 dark:text-green-400">{success}</AlertDescription>
                        </Alert>
                      )}

                      {error && (
                        <Alert variant="destructive" className="border-2">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="scannerEmail" className="text-base font-medium">
                          Scanner Email
                        </Label>
                        <Input
                          id="scannerEmail"
                          type="email"
                          placeholder="scanner@example.com"
                          value={scannerEmail}
                          onChange={(e) => setScannerEmail(e.target.value)}
                          required
                          className="h-12 text-base border-2 focus:border-primary"
                        />
                        <p className="text-sm text-muted-foreground">
                          They'll receive an email invitation to scan tickets
                        </p>
                      </div>

                      <Button
                        type="submit"
                        disabled={addingScanner}
                        className="w-full h-12 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                      >
                        {addingScanner ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Sending Invitation...
                          </>
                        ) : (
                          <>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Invitation
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Current Scanners */}
              <div className="lg:col-span-2">
                <Card className="border-2 bg-gradient-to-br from-card to-card/50">
                  <CardHeader>
                    <CardTitle>Current Scanners</CardTitle>
                    <CardDescription>People who can scan tickets for this event</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockScanners.map((scanner) => (
                        <div
                          key={scanner.id}
                          className="flex items-center justify-between p-4 border rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{scanner.name}</div>
                              <div className="text-sm text-muted-foreground">{scanner.email}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={
                                scanner.status === "ACTIVE"
                                  ? "bg-green-500/10 text-green-500 border-green-500/20"
                                  : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                              }
                            >
                              {scanner.status}
                            </Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRemoveScanner(scanner.id)}
                              className="border-2 hover:border-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}

                      {mockScanners.length === 0 && (
                        <div className="text-center py-8">
                          <div className="p-4 bg-gradient-to-br from-muted/10 to-muted/5 rounded-full w-fit mx-auto mb-4">
                            <UserPlus className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <h3 className="text-lg font-semibold mb-2">No scanners added yet</h3>
                          <p className="text-muted-foreground">Add scanners to help manage check-ins at your event</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Event Stats */}
              <Card className="border-2 bg-gradient-to-br from-card to-card/50">
                <CardHeader>
                  <CardTitle>Event Statistics</CardTitle>
                  <CardDescription>Current event metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <span className="text-sm font-medium">Total Registrations</span>
                    <span className="text-lg font-bold text-primary">{mockEvent.attendees}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <span className="text-sm font-medium">Available Spots</span>
                    <span className="text-lg font-bold text-primary">
                      {mockEvent.maxAttendees - mockEvent.attendees}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <span className="text-sm font-medium">Capacity Utilization</span>
                    <span className="text-lg font-bold text-primary">
                      {Math.round((mockEvent.attendees / mockEvent.maxAttendees) * 100)}%
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-2 bg-gradient-to-br from-card to-card/50">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Manage your event</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start border-2 bg-transparent" asChild>
                    <Link href={`/events/${params.id}/edit`}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Edit Event Details
                    </Link>
                  </Button>

                  <Button variant="outline" className="w-full justify-start border-2 bg-transparent" asChild>
                    <Link href={`/events/${params.id}`}>
                      <Users className="h-4 w-4 mr-2" />
                      View Event Page
                    </Link>
                  </Button>

                  <Button
                    variant="destructive"
                    className="w-full justify-start"
                    onClick={() => setShowCancelDialog(true)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Cancel Event
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
