import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, QrCode, Upload, Sparkles, Users, Zap } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
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
              EventHub
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="container mx-auto text-center relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              Events Made
              <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Effortless
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Create, manage, and attend events with our comprehensive platform. From QR code validation to media
              sharing, we've got everything covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-lg px-8 py-6"
              >
                <Link href="/signup">Start Creating Events</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 border-2 bg-transparent">
                <Link href="/events">Explore Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Three Powerful Platforms</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A complete ecosystem for event management, validation, and social interaction
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Web Dashboard</CardTitle>
                <CardDescription className="text-base">
                  Create and manage events, register attendees, and generate QR tickets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Event creation & management</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>Attendee registration</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <QrCode className="h-4 w-4 text-primary" />
                    <span>QR ticket generation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span>Scanner assignment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <QrCode className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle className="text-xl">Scanner App</CardTitle>
                <CardDescription className="text-base">
                  Mobile app for event staff to scan QR codes and validate attendance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <QrCode className="h-4 w-4 text-green-500" />
                    <span>QR code scanning</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-green-500" />
                    <span>Real-time validation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-green-500" />
                    <span>Attendance tracking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-green-500" />
                    <span>Offline capability</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <Upload className="h-8 w-8 text-purple-500" />
                </div>
                <CardTitle className="text-xl">Attendee App</CardTitle>
                <CardDescription className="text-base">
                  Mobile app for attendees to view events and share media
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    <span>View registered events</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Upload className="h-4 w-4 text-purple-500" />
                    <span>Upload event photos</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-purple-500" />
                    <span>Browse event gallery</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span>Social interactions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />
        <div className="container mx-auto text-center relative">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of event organizers using EventHub to create memorable experiences
          </p>
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-lg px-8 py-6"
          >
            <Link href="/signup">Create Your First Event</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Calendar className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">EventHub</span>
          </div>
          <p className="text-muted-foreground">&copy; 2024 EventHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
