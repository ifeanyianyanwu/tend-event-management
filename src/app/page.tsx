"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, MapPin, Clock, Star, ArrowRight, Sparkles, CheckCircle, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const featuredEvents = [
  {
    id: "1",
    name: "Tech Conference 2024",
    description: "Join industry leaders for cutting-edge technology discussions",
    date: "March 15, 2024",
    location: "Convention Center",
    attendees: 150,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    name: "Digital Marketing Summit",
    description: "Learn the latest digital marketing strategies",
    date: "March 20, 2024",
    location: "Online",
    attendees: 89,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    name: "Startup Networking",
    description: "Connect with entrepreneurs and investors",
    date: "March 25, 2024",
    location: "Innovation Hub",
    attendees: 75,
    image: "/placeholder.svg?height=200&width=300",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Event Organizer",
    content: "Tend made organizing our tech conference incredibly easy. The QR code system was flawless!",
    rating: 5,
  },
  {
    name: "Mike Chen",
    role: "Startup Founder",
    content: "Found amazing networking events through Tend. The platform is intuitive and well-designed.",
    rating: 5,
  },
  {
    name: "Emily Davis",
    role: "Marketing Manager",
    content: "The event management tools are comprehensive. Everything we needed in one place.",
    rating: 5,
  },
]

export default function HomePage() {
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
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                <span>The Future of Event Management</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              Create, Manage & Discover
              <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Amazing Events
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              The all-in-one platform for event organizers and attendees. Create memorable experiences, manage
              registrations, and connect with your community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                asChild
                className="h-14 px-8 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                <Link href="/events/create">
                  Create Your Event
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-14 px-8 text-lg border-2 bg-transparent">
                <Link href="/events">
                  Discover Events
                  <Calendar className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Tend?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create successful events and build lasting connections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl w-fit">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Easy Event Creation</CardTitle>
                <CardDescription className="text-base">
                  Create and customize your events in minutes with our intuitive interface
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl w-fit">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Smart Registration</CardTitle>
                <CardDescription className="text-base">
                  Streamlined registration process with QR code tickets and real-time updates
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl w-fit">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Discover & Connect</CardTitle>
                <CardDescription className="text-base">
                  Find events that match your interests and connect with like-minded people
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Events</h2>
            <p className="text-xl text-muted-foreground">Discover popular events happening in your area</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <Card
                key={event.id}
                className="border-2 bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-t-lg flex items-center justify-center">
                  <Calendar className="h-12 w-12 text-primary" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{event.name}</CardTitle>
                  <CardDescription className="text-base">{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      {event.attendees} attendees
                    </div>
                  </div>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    <Link href={`/events/${event.id}`}>View Event</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild className="border-2 bg-transparent">
              <Link href="/events">
                View All Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">Join thousands of satisfied event organizers and attendees</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 bg-gradient-to-br from-card to-card/50">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">"{testimonial.content}"</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Your Next Event?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join Tend today and start building memorable experiences for your community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="h-14 px-8 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                <Link href="/signup">
                  Get Started Free
                  <CheckCircle className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-14 px-8 text-lg border-2 bg-transparent">
                <Link href="/events">
                  Browse Events
                  <Calendar className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/80 backdrop-blur-sm py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="relative">
                <Calendar className="h-6 w-6 text-primary" />
                <Sparkles className="h-2 w-2 text-primary absolute -top-0.5 -right-0.5" />
              </div>
              <span className="text-lg font-bold">Tend</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link href="/about" className="hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Tend. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
