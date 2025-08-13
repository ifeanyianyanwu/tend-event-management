"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Plus,
  BarChart3,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  User,
  Sparkles,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { EventService } from "@/services/event.service"
import { RegistrationService } from "@/services/registration.service"
import { DashboardService } from "@/services/dashboard.service"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalRegistrations: 0,
    upcomingEvents: 0,
    totalRevenue: 0,
  })
  const [myEvents, setMyEvents] = useState<any[]>([])
  const [registeredEvents, setRegisteredEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [statsData, eventsData, registrationsData] = await Promise.all([
          DashboardService.getStats(),
          EventService.getMyEvents(),
          RegistrationService.getMyRegistrations(),
        ])

        setStats(statsData)
        setMyEvents(eventsData)
        setRegisteredEvents(registrationsData)
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
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

  const handleDeleteEvent = async (eventId: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await EventService.deleteEvent(eventId)
        setMyEvents(myEvents.filter((event) => event.id !== eventId))
      } catch (error) {
        console.error("Failed to delete event:", error)
      }
    }
  }

  const handleCancelRegistration = async (eventId: string) => {
    if (confirm("Are you sure you want to cancel your registration?")) {
      try {
        await RegistrationService.cancelRegistration(eventId)
        setRegisteredEvents(registeredEvents.filter((event) => event.id !== eventId))
      } catch (error) {
        console.error("Failed to cancel registration:", error)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Calendar className="h-8 w-8 text-primary" />
                <Sparkles className="h-3 w-3 text-primary absolute -top-1 -right-1" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Tend
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="outline" asChild>
                <Link href="/events">Browse Events</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                <Link href="/events/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Link>
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
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
          <p className="text-muted-foreground">Manage your events and track your activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEvents}</div>
              <p className="text-xs text-muted-foreground">Events created</p>
            </CardContent>
          </Card>

          <Card className="border-2 bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRegistrations}</div>
              <p className="text-xs text-muted-foreground">Across all events</p>
            </CardContent>
          </Card>

          <Card className="border-2 bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
              <p className="text-xs text-muted-foreground">In the next 30 days</p>
            </CardContent>
          </Card>

          <Card className="border-2 bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <BarChart3 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue}</div>
              <p className="text-xs text-muted-foreground">From paid events</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="my-events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="my-events">My Events</TabsTrigger>
            <TabsTrigger value="registered">Registered Events</TabsTrigger>
          </TabsList>

          <TabsContent value="my-events" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">My Events</h3>
              <Button
                asChild
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                <Link href="/events/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Event
                </Link>
              </Button>
            </div>

            {myEvents.length === 0 ? (
              <Card className="border-2 bg-gradient-to-br from-card to-card/50 text-center py-12">
                <CardContent>
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No events yet</h3>
                  <p className="text-muted-foreground mb-4">Create your first event to get started</p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    <Link href="/events/create">Create Event</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="border-2 bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-1">{event.name}</CardTitle>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                            <Badge variant="outline" className="border-primary/20 text-primary">
                              {event.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          <span>{formatDate(event.start_time)}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2 text-primary" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-2 text-primary" />
                          <span>
                            {event.attendees} / {event.maxAttendees} registered
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" asChild className="flex-1 border-2 bg-transparent">
                          <Link href={`/events/${event.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild className="border-2 bg-transparent">
                          <Link href={`/events/${event.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteEvent(event.id)}
                          className="border-2 bg-transparent text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="registered" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Registered Events</h3>
              <Button variant="outline" asChild>
                <Link href="/events">Browse More Events</Link>
              </Button>
            </div>

            {registeredEvents.length === 0 ? (
              <Card className="border-2 bg-gradient-to-br from-card to-card/50 text-center py-12">
                <CardContent>
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No registrations yet</h3>
                  <p className="text-muted-foreground mb-4">Discover and register for events that interest you</p>
                  <Button variant="outline" asChild>
                    <Link href="/events">Browse Events</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {registeredEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="border-2 bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-1">{event.name}</CardTitle>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                            <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Registered</Badge>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          <span>{formatDate(event.start_time)}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2 text-primary" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span>Organized by {event.creator}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" asChild className="flex-1 border-2 bg-transparent">
                          <Link href={`/events/${event.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View Event
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild className="border-2 bg-transparent">
                          <Link href={`/tickets/${event.id}`}>View Ticket</Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelRegistration(event.id)}
                          className="border-2 bg-transparent text-destructive hover:bg-destructive/10"
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
