import { EventService } from "./event.service"

export interface Ticket {
  id: string
  eventId: string
  userId: string
  qrCode: string
  status: "active" | "used" | "cancelled"
  purchaseDate: string
  event: {
    id: string
    name: string
    date: string
    location: string
    description: string
    image: string
  }
}

export class TicketService {
  private static tickets: Ticket[] = [
    {
      id: "ticket-1",
      eventId: "1",
      userId: "user-1",
      qrCode: "QR123456789",
      status: "active",
      purchaseDate: "2024-03-01T10:00:00Z",
      event: {
        id: "1",
        name: "Tech Conference 2024",
        date: "March 15, 2024",
        location: "Convention Center",
        description: "Join industry leaders for cutting-edge technology discussions",
        image: "/placeholder.svg?height=200&width=300",
      },
    },
    {
      id: "ticket-2",
      eventId: "2",
      userId: "user-1",
      qrCode: "QR987654321",
      status: "active",
      purchaseDate: "2024-03-02T14:30:00Z",
      event: {
        id: "2",
        name: "Digital Marketing Summit",
        date: "March 20, 2024",
        location: "Online",
        description: "Learn the latest digital marketing strategies",
        image: "/placeholder.svg?height=200&width=300",
      },
    },
  ]

  static async getTicket(eventId: string): Promise<Ticket | null> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const ticket = this.tickets.find((t) => t.eventId === eventId)
    if (!ticket) {
      return null
    }

    // Get complete event data from EventService
    const event = await EventService.getEvent(eventId)
    if (!event) {
      return null
    }

    return {
      ...ticket,
      event: {
        id: event.id,
        name: event.name,
        date: event.date,
        location: event.location,
        description: event.description,
        image: event.image,
      },
    }
  }

  static async getUserTickets(userId: string): Promise<Ticket[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const userTickets = this.tickets.filter((t) => t.userId === userId)

    // Populate event data for each ticket
    const ticketsWithEvents = await Promise.all(
      userTickets.map(async (ticket) => {
        const event = await EventService.getEvent(ticket.eventId)
        return {
          ...ticket,
          event: event
            ? {
                id: event.id,
                name: event.name,
                date: event.date,
                location: event.location,
                description: event.description,
                image: event.image,
              }
            : ticket.event,
        }
      }),
    )

    return ticketsWithEvents
  }

  static async validateTicket(qrCode: string): Promise<{ valid: boolean; ticket?: Ticket; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const ticket = this.tickets.find((t) => t.qrCode === qrCode)

    if (!ticket) {
      return { valid: false, message: "Ticket not found" }
    }

    if (ticket.status === "used") {
      return { valid: false, ticket, message: "Ticket already used" }
    }

    if (ticket.status === "cancelled") {
      return { valid: false, ticket, message: "Ticket cancelled" }
    }

    // Mark ticket as used
    ticket.status = "used"

    return { valid: true, ticket, message: "Ticket validated successfully" }
  }

  static async downloadTicket(ticketId: string): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock PDF generation - in real app, this would generate actual PDF
    return `data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKFRpY2tldCAtICR7dGlja2V0SWR9KQovQ3JlYXRvciAoVGVuZCBFdmVudCBNYW5hZ2VtZW50KQovUHJvZHVjZXIgKFRlbmQpCi9DcmVhdGlvbkRhdGUgKEQ6MjAyNDAzMTUxMjAwMDBaKQo+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMyAwIFIKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFs0IDAgUl0KL0NvdW50IDEKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAzIDAgUgovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA5IDAgUgo+Pgo+PgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjUgMCBvYmoKPDwKL0xlbmd0aCA0NAo+PgpzdHJlYW0KQlQKL0YxIDEyIFRmCjcyIDcyMCBUZAooVGlja2V0IElEOiAke3RpY2tldElkfSkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iago2IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9TdWJ0eXBlIC9UeXBlMQovTmFtZSAvRjEKL0Jhc2VGb250IC9IZWx2ZXRpY2EKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKPj4KZW5kb2JqCnhyZWYKMCA3CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMTc0IDAwMDAwIG4gCjAwMDAwMDAyMDEgMDAwMDAgbiAKMDAwMDAwMDI2OSAwMDAwMCBuIAowMDAwMDAwNDI4IDAwMDAwIG4gCjAwMDAwMDA1MjMgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA3Ci9Sb290IDIgMCBSCi9JbmZvIDEgMCBSCj4+CnN0YXJ0eHJlZgo2MjUKJSVFT0Y=`
  }

  static async shareTicket(ticketId: string, email: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log(`Sharing ticket ${ticketId} to ${email}`)
    return true
  }
}
