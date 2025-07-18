"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search, MapPin, Clock, Users, User } from "lucide-react"

// Mock events data
const mockEvents = [
  {
    id: "1",
    name: "Tech Conference 2024",
    description: "Annual technology conference featuring industry leaders and innovative workshops",
    start_time: "2024-03-15T09:00:00Z",
    end_time: "2024-03-15T17:00:00Z",
    location: "Convention Center, Downtown",
    status: "UPCOMING",
    attendees: 150,
    maxAttendees: 200,
    creator: "TechCorp",
    category: "Technology",
    isRegistered: false,
  },
  {
    id: "2",
    name: "Digital Marketing Workshop",
    description: "Learn the latest digital marketing strategies and tools",
    start_time: "2024-03-20T14:00:00Z",
    end_time: "2024-03-20T16:00:00Z",
    location: "Online",
    status: "UPCOMING",
    attendees: 45,
    maxAttendees: 100,
    creator: "Marketing Pro",
    category: "Business",
    isRegistered: true,
  },
  {
    id: "3",
    name: "AI & Machine Learning Summit",
    description: "Explore the future of artificial intelligence and machine learning",
    start_time: "2024-03-25T10:00:00Z",
    end_time: "2024-03-25T18:00:00Z",
    location: "Tech Hub, Silicon Valley",
    status: "UPCOMING",
    attendees: 300,
    maxAttendees: 500,
    creator: "AI Institute",
    category: "Technology",
    isRegistered: false,
  },
  {
    id: "4",
    name: "Startup Networking Event",
    description: "Connect with entrepreneurs, investors, and startup enthusiasts",
    start_time: "2024-03-30T18:00:00Z",
    end_time: "2024-03-30T21:00:00Z",
    location: "Innovation Center",
    status: "UPCOMING",
    attendees: 80,
    maxAttendees: 150,
    creator: "Startup Hub",
    category: "Networking",
    isRegistered: false,
  },
  {
    id: "5",
    name: "Web Development Bootcamp",
    description: "Intensive 3-day bootcamp covering modern web development",
    start_time: "2024-04-05T09:00:00Z",
    end_time: "2024-04-07T17:00:00Z",
    location: "Code Academy",
    status: "UPCOMING",
    attendees: 25,
    maxAttendees: 30,
    creator: "Code Masters",
    category: "Education",
    isRegistered: false,
  },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [registering, setRegistering] = useState<string | null>(null)

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
        return "bg-blue-100 text-blue-800"
      case "ONGOING":
        return "bg-green-100 text-green-800"
      case "COMPLETED":
        return "bg-gray-100 text-gray-800"
      case "CANCELLED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleRegister = async (eventId: string) => {
    setRegistering(eventId)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Update the event registration status
      // In real app, this would update the state/refetch data
    } catch (error) {
      console.error("Registration failed")
    } finally {
      setRegistering(null)
    }
  }

  const filteredEvents = mockEvents.filter((event) => {
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

  const categories = ["all", ...Array.from(new Set(mockEvents.map((event) => event.category)))]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">EventHub</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild>
              <Link href="/events/create">Create Event</Link>
            </Button>
            <div className="flex items-center space-x-2">
              <User className="h-8 w-8 text-gray-600" />
              <span className="text-sm text-gray-600">John Doe</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Discover Events</h2>
          <p className="text-gray-600">Find and register for events that interest you</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search & Filter Events</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
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
                <SelectTrigger>
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
          <p className="text-gray-600">
            Showing {filteredEvents.length} of {mockEvents.length} events
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{event.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                      <Badge variant="outline">{event.category}</Badge>
                      {event.isRegistered && <Badge variant="secondary">Registered</Badge>}
                    </div>
                  </div>
                </div>
                <CardDescription className="line-clamp-2">{event.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(event.start_time)}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{event.location}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>
                      {event.attendees} / {event.maxAttendees} attendees
                    </span>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span>Organized by {event.creator}</span>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                      <Link href={`/events/${event.id}`}>View Details</Link>
                    </Button>

                    {event.isRegistered ? (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/tickets/${event.id}`}>View Ticket</Link>
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleRegister(event.id)}
                        disabled={registering === event.id || event.attendees >= event.maxAttendees}
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
          <Card className="text-center py-12">
            <CardContent>
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
              <Button asChild>
                <Link href="/events/create">Create Your Own Event</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
