// Registration service with dummy endpoints
export class RegistrationService {
  private static baseUrl = "/api/registrations"

  // Mock registrations data
  private static mockRegistrations = [
    {
      id: "reg-1",
      eventId: "2",
      userId: "user-1",
      userName: "John Doe",
      userEmail: "john@example.com",
      registrationDate: "2024-01-22T10:30:00Z",
      status: "CONFIRMED",
      ticketId: "ticket-1",
      qrCode: "QR123456789",
    },
    {
      id: "reg-2",
      eventId: "4",
      userId: "user-1",
      userName: "John Doe",
      userEmail: "john@example.com",
      registrationDate: "2024-02-05T14:15:00Z",
      status: "CONFIRMED",
      ticketId: "ticket-2",
      qrCode: "QR987654321",
    },
  ]

  static async registerForEvent(eventId: string, userData?: any) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Check if already registered
    const existingRegistration = this.mockRegistrations.find(
      (reg) => reg.eventId === eventId && reg.userId === "user-1",
    )

    if (existingRegistration) {
      return { success: false, error: "Already registered for this event" }
    }

    // Create new registration
    const newRegistration = {
      id: `reg-${Math.random().toString(36).substr(2, 9)}`,
      eventId,
      userId: "user-1", // Mock current user
      userName: userData?.name || "John Doe",
      userEmail: userData?.email || "john@example.com",
      registrationDate: new Date().toISOString(),
      status: "CONFIRMED",
      ticketId: `ticket-${Math.random().toString(36).substr(2, 9)}`,
      qrCode: `QR${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    }

    this.mockRegistrations.push(newRegistration)

    return {
      success: true,
      registration: newRegistration,
      message: "Successfully registered for event",
    }
  }

  static async cancelRegistration(eventId: string) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const registrationIndex = this.mockRegistrations.findIndex(
      (reg) => reg.eventId === eventId && reg.userId === "user-1",
    )

    if (registrationIndex === -1) {
      return { success: false, error: "Registration not found" }
    }

    // Update status instead of deleting
    this.mockRegistrations[registrationIndex].status = "CANCELLED"

    return { success: true, message: "Registration cancelled successfully" }
  }

  static async getMyRegistrations() {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Filter by current user and active registrations
    return this.mockRegistrations.filter((reg) => reg.userId === "user-1" && reg.status === "CONFIRMED")
  }

  static async getRegistrationDetails(eventId: string) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 400))

    const registration = this.mockRegistrations.find((reg) => reg.eventId === eventId && reg.userId === "user-1")

    if (!registration) {
      return { success: false, error: "Registration not found" }
    }

    return { success: true, registration }
  }

  static async updateRegistration(eventId: string, updateData: any) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    const registrationIndex = this.mockRegistrations.findIndex(
      (reg) => reg.eventId === eventId && reg.userId === "user-1",
    )

    if (registrationIndex === -1) {
      return { success: false, error: "Registration not found" }
    }

    this.mockRegistrations[registrationIndex] = {
      ...this.mockRegistrations[registrationIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    }

    return {
      success: true,
      registration: this.mockRegistrations[registrationIndex],
    }
  }

  static async getEventRegistrations(eventId: string) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 700))

    // Filter registrations for specific event
    const eventRegistrations = this.mockRegistrations.filter(
      (reg) => reg.eventId === eventId && reg.status === "CONFIRMED",
    )

    return {
      registrations: eventRegistrations,
      totalCount: eventRegistrations.length,
    }
  }

  static async checkRegistrationStatus(eventId: string) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    const registration = this.mockRegistrations.find((reg) => reg.eventId === eventId && reg.userId === "user-1")

    return {
      isRegistered: !!registration && registration.status === "CONFIRMED",
      registration: registration || null,
    }
  }

  static async bulkRegister(eventId: string, attendees: any[]) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newRegistrations = attendees.map((attendee) => ({
      id: `reg-${Math.random().toString(36).substr(2, 9)}`,
      eventId,
      userId: `user-${Math.random().toString(36).substr(2, 6)}`,
      userName: attendee.name,
      userEmail: attendee.email,
      registrationDate: new Date().toISOString(),
      status: "CONFIRMED",
      ticketId: `ticket-${Math.random().toString(36).substr(2, 9)}`,
      qrCode: `QR${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    }))

    this.mockRegistrations.push(...newRegistrations)

    return {
      success: true,
      registrations: newRegistrations,
      message: `Successfully registered ${attendees.length} attendees`,
    }
  }

  static async exportRegistrations(eventId: string) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const eventRegistrations = this.mockRegistrations.filter(
      (reg) => reg.eventId === eventId && reg.status === "CONFIRMED",
    )

    // In a real app, this would generate and return a CSV/Excel file
    const csvData = [
      "Name,Email,Registration Date,Ticket ID,QR Code",
      ...eventRegistrations.map(
        (reg) => `${reg.userName},${reg.userEmail},${reg.registrationDate},${reg.ticketId},${reg.qrCode}`,
      ),
    ].join("\n")

    return {
      success: true,
      data: csvData,
      filename: `event-${eventId}-registrations.csv`,
    }
  }
}
