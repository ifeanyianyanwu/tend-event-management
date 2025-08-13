export class EventService {
  private static mockEvents = [
    {
      id: "1",
      name: "Tech Conference 2024",
      description:
        "Join us for the biggest tech conference of the year featuring industry leaders, innovative workshops, and networking opportunities.",
      start_time: "2024-03-15T09:00:00Z",
      end_time: "2024-03-15T17:00:00Z",
      location: "Convention Center, Downtown",
      category: "Technology",
      creator: "TechCorp Events",
      price: 0,
      capacity: 500,
      registered: 234,
      image: "/placeholder.jpg",
      tags: ["technology", "networking", "innovation"],
      status: "published",
      created_at: "2024-01-15T10:00:00Z",
    },
    {
      id: "2",
      name: "Digital Marketing Workshop",
      description:
        "Learn the latest digital marketing strategies and tools from industry experts. Perfect for beginners and professionals alike.",
      start_time: "2024-03-20T14:00:00Z",
      end_time: "2024-03-20T18:00:00Z",
      location: "Business Center, Suite 200",
      category: "Marketing",
      creator: "Marketing Pro Academy",
      price: 49,
      capacity: 50,
      registered: 32,
      image: "/placeholder.jpg",
      tags: ["marketing", "digital", "workshop"],
      status: "published",
      created_at: "2024-01-20T14:30:00Z",
    },
    {
      id: "3",
      name: "Startup Pitch Night",
      description:
        "Watch innovative startups pitch their ideas to investors and industry experts. Network with entrepreneurs and investors.",
      start_time: "2024-04-05T19:00:00Z",
      end_time: "2024-04-05T22:00:00Z",
      location: "Innovation Hub, Main Hall",
      category: "Business",
      creator: "Startup Community",
      price: 25,
      capacity: 200,
      registered: 156,
      image: "/placeholder.jpg",
      tags: ["startup", "pitch", "networking", "investment"],
      status: "published",
      created_at: "2024-02-01T09:15:00Z",
    },
    {
      id: "4",
      name: "Web Development Bootcamp",
      description:
        "Intensive 3-day bootcamp covering modern web development technologies including React, Node.js, and database design.",
      start_time: "2024-04-10T09:00:00Z",
      end_time: "2024-04-12T17:00:00Z",
      location: "Tech Academy, Room 101",
      category: "Education",
      creator: "Code Masters",
      price: 299,
      capacity: 30,
      registered: 28,
      image: "/placeholder.jpg",
      tags: ["web development", "react", "nodejs", "bootcamp"],
      status: "published",
      created_at: "2024-02-10T11:00:00Z",
    },
    {
      id: "5",
      name: "AI & Machine Learning Summit",
      description:
        "Explore the future of AI and machine learning with leading researchers and practitioners. Hands-on workshops included.",
      start_time: "2024-05-15T08:30:00Z",
      end_time: "2024-05-16T18:00:00Z",
      location: "University Conference Center",
      category: "Technology",
      creator: "AI Research Institute",
      price: 199,
      capacity: 300,
      registered: 267,
      image: "/placeholder.jpg",
      tags: ["ai", "machine learning", "research", "summit"],
      status: "published",
      created_at: "2024-02-15T16:45:00Z",
    },
  ]

  constructor() {}

  getEvents(): any[] {
    return EventService.mockEvents
  }

  getEventById(id: string): any {
    return EventService.mockEvents.find((event) => event.id === id)
  }
}
