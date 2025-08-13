"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search, MapPin, Clock, Users, User, Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { EventService } from "@/services/event.service"
import { RegistrationService } from "@/services/registration.service"

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [registering, setRegistering] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsData = await EventService.getAllEvents()
        setEvents(eventsData)
      } catch (error) {
        console.error("Failed to load events:", error)
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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

  const handleRegister = async (eventId: string) => {
    setRegistering(eventId)
    try {
      const result = await RegistrationService.registerForEvent(eventId)
      if (result.success) {
        // Update the event in the list
        setEvents(
          events.map((event) =>
            event.id === eventId ? { ...event, isRegistered: true, attendees: event.attendees + 1 } : event,
          ),
        )
      }
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setRegistering(null)
    }
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter
    const matchesLocation =
      locationFilter === "all" ||
      (locationFilter === "online" && event.location.toLowerCase().includes("online")) ||
      (locationFilter === "in-person" && !event.location.toLowerCase().includes("online"))

    return matchesSearch && matchesCategory && matchesLocation
  })

  const categories = ["all", ...Array.from(new Set(events.map((event) => event.category)))]

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
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
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
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              <Link href="/events/create">Create Event</Link>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium">John Doe</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Discover Events</h2>
          <p className="text-muted-foreground">Find and register for events that interest you</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-2 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-primary" />
              <span>Search & Filter Events</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-base border-2 focus:border-primary"
                  />
                </div>
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-12 text-base border-2 focus:border-primary">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="h-12 text-base border-2 focus:border-primary">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="in-person">In-Person</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredEvents.length} of {events.length} events
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="border-2 bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{event.name}</CardTitle>
                    <div className="flex items-center space-x-2 flex-wrap gap-1">
                      <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                      <Badge variant="outline" className="border-primary/20 text-primary">
                        {event.category}
                      </Badge>
                      {event.isRegistered && (
                        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Registered</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <CardDescription className="line-clamp-2 text-base">{event.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{formatDate(event.start_time)}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="truncate">{event.location}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 text-primary" />
                    <span>
                      {event.attendees} / {event.maxAttendees} attendees
                    </span>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <span>Organized by {event.creator}</span>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button variant="outline" size="sm" asChild className="flex-1 border-2 bg-transparent">
                      <Link href={`/events/${event.id}`}>View Details</Link>
                    </Button>

                    {event.isRegistered ? (
                      <Button variant="outline" size="sm" asChild className="border-2 bg-transparent">
                        <Link href={`/tickets/${event.id}`}>View Ticket</Link>
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleRegister(event.id)}
                        disabled={registering === event.id || event.attendees >= event.maxAttendees}
                        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                      >
                        {registering === event.id
                          ? "Registering..."
                          : event.attendees >= event.maxAttendees
                            ? "Full"
                            : "Register"}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <Card className="text-center py-12 border-2 bg-gradient-to-br from-card to-card/50">
            <CardContent>
              <div className="p-4 bg-gradient-to-br from-muted/10 to-muted/5 rounded-full w-fit mx-auto mb-4">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
              <Button
                asChild
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                <Link href="/events/create">Create Your Own Event</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
