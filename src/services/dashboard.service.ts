// Dashboard service with dummy endpoints
export class DashboardService {
  private static baseUrl = "/api/dashboard"

  static async getStats() {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    return {
      totalEvents: 12,
      upcomingEvents: 8,
      totalRegistrations: 245,
      totalRevenue: 12450.75,
      thisMonthEvents: 3,
      thisMonthRegistrations: 67,
      thisMonthRevenue: 2340.25,
      growthRate: {
        events: 15.2,
        registrations: 23.8,
        revenue: 18.5,
      },
    }
  }

  static async getAnalytics(timeRange: "7d" | "30d" | "90d" | "1y" = "30d") {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock analytics data based on time range
    const generateData = (days: number) => {
      const data = []
      const now = new Date()

      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now)
        date.setDate(date.getDate() - i)

        data.push({
          date: date.toISOString().split("T")[0],
          events: Math.floor(Math.random() * 5) + 1,
          registrations: Math.floor(Math.random() * 20) + 5,
          revenue: Math.floor(Math.random() * 500) + 100,
          views: Math.floor(Math.random() * 100) + 50,
        })
      }

      return data
    }

    const days = {
      "7d": 7,
      "30d": 30,
      "90d": 90,
      "1y": 365,
    }[timeRange]

    const chartData = generateData(days)

    return {
      timeRange,
      data: chartData,
      summary: {
        totalEvents: chartData.reduce((sum, day) => sum + day.events, 0),
        totalRegistrations: chartData.reduce((sum, day) => sum + day.registrations, 0),
        totalRevenue: chartData.reduce((sum, day) => sum + day.revenue, 0),
        totalViews: chartData.reduce((sum, day) => sum + day.views, 0),
      },
    }
  }

  static async getRecentActivity() {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600))

    const activities = [
      {
        id: "act-1",
        type: "registration",
        message: "New registration for Tech Conference 2024",
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
        eventId: "1",
        eventName: "Tech Conference 2024",
        userName: "Alice Johnson",
      },
      {
        id: "act-2",
        type: "event_created",
        message: "New event created: AI Workshop",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        eventId: "6",
        eventName: "AI Workshop",
        userName: "John Doe",
      },
      {
        id: "act-3",
        type: "registration",
        message: "New registration for Startup Networking Event",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
        eventId: "4",
        eventName: "Startup Networking Event",
        userName: "Bob Smith",
      },
      {
        id: "act-4",
        type: "cancellation",
        message: "Registration cancelled for Digital Marketing Workshop",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
        eventId: "2",
        eventName: "Digital Marketing Workshop",
        userName: "Carol Davis",
      },
      {
        id: "act-5",
        type: "event_updated",
        message: "Event updated: Web Development Bootcamp",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
        eventId: "5",
        eventName: "Web Development Bootcamp",
        userName: "John Doe",
      },
    ]

    return { activities }
  }

  static async getUpcomingEvents() {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const upcomingEvents = [
      {
        id: "1",
        name: "Tech Conference 2024",
        date: "2024-03-15T09:00:00Z",
        location: "Convention Center",
        registrations: 150,
        maxAttendees: 200,
        status: "UPCOMING",
      },
      {
        id: "2",
        name: "Digital Marketing Workshop",
        date: "2024-03-20T14:00:00Z",
        location: "Online",
        registrations: 45,
        maxAttendees: 100,
        status: "UPCOMING",
      },
      {
        id: "3",
        name: "AI & Machine Learning Summit",
        date: "2024-03-25T10:00:00Z",
        location: "Tech Hub",
        registrations: 300,
        maxAttendees: 500,
        status: "UPCOMING",
      },
    ]

    return { events: upcomingEvents }
  }

  static async exportData(
    type: "events" | "registrations" | "analytics",
    format: "csv" | "excel" | "pdf" = "csv",
    dateRange?: { start: string; end: string },
  ) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    let filename: string
    let data: string

    switch (type) {
      case "events":
        filename = `events-export.${format}`
        data =
          "ID,Name,Date,Location,Registrations,Status\n1,Tech Conference 2024,2024-03-15,Convention Center,150,UPCOMING"
        break
      case "registrations":
        filename = `registrations-export.${format}`
        data =
          "Event,Name,Email,Registration Date,Status\nTech Conference 2024,John Doe,john@example.com,2024-01-22,CONFIRMED"
        break
      case "analytics":
        filename = `analytics-export.${format}`
        data = "Date,Events,Registrations,Revenue\n2024-01-01,2,25,500.00"
        break
      default:
        return { success: false, error: "Invalid export type" }
    }

    return {
      success: true,
      filename,
      data,
      downloadUrl: `/api/exports/${filename}`,
      size: `${Math.floor(data.length / 1024)}KB`,
    }
  }

  static async getEventPerformance(eventId: string) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 700))

    return {
      eventId,
      metrics: {
        views: 1250,
        registrations: 150,
        conversionRate: 12.0,
        revenue: 0, // Free event
        socialShares: 45,
        emailOpens: 320,
        emailClicks: 89,
      },
      timeline: [
        { date: "2024-01-15", views: 50, registrations: 5 },
        { date: "2024-01-16", views: 75, registrations: 12 },
        { date: "2024-01-17", views: 120, registrations: 18 },
        { date: "2024-01-18", views: 95, registrations: 15 },
        { date: "2024-01-19", views: 110, registrations: 20 },
      ],
      demographics: {
        ageGroups: {
          "18-25": 25,
          "26-35": 45,
          "36-45": 20,
          "46+": 10,
        },
        locations: {
          "San Francisco": 40,
          "New York": 25,
          "Los Angeles": 15,
          Other: 20,
        },
      },
    }
  }

  static async getNotifications() {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 400))

    const notifications = [
      {
        id: "notif-1",
        type: "registration",
        title: "New Registration",
        message: "Someone just registered for Tech Conference 2024",
        timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        read: false,
        eventId: "1",
      },
      {
        id: "notif-2",
        type: "milestone",
        title: "Registration Milestone",
        message: "AI Summit reached 300 registrations!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        read: false,
        eventId: "3",
      },
      {
        id: "notif-3",
        type: "reminder",
        title: "Event Reminder",
        message: "Digital Marketing Workshop starts in 2 days",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        read: true,
        eventId: "2",
      },
    ]

    return { notifications }
  }

  static async markNotificationRead(notificationId: string) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    return { success: true, message: "Notification marked as read" }
  }

  static async getQuickStats() {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 400))

    return {
      todayRegistrations: 12,
      weeklyRevenue: 1250.75,
      activeEvents: 8,
      pendingApprovals: 3,
      unreadNotifications: 5,
    }
  }
}
