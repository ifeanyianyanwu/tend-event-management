"use server"

import { z } from "zod"
import { eventService } from "@/services/event.service"
import { registrationService } from "@/services/registration.service"

const createEventSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  description: z.string().min(1, "Description is required"),
  longDescription: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endDate: z.string().min(1, "End date is required"),
  endTime: z.string().min(1, "End time is required"),
  location: z.string().min(1, "Location is required"),
  category: z.string().min(1, "Category is required"),
  maxAttendees: z.string().min(1, "Max attendees is required"),
  price: z.string().optional(),
  tags: z.string().optional(),
})

export async function createEvent(prevState: any, formData: FormData) {
  const validatedFields = createEventSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    longDescription: formData.get("longDescription"),
    startDate: formData.get("startDate"),
    startTime: formData.get("startTime"),
    endDate: formData.get("endDate"),
    endTime: formData.get("endTime"),
    location: formData.get("location"),
    category: formData.get("category"),
    maxAttendees: formData.get("maxAttendees"),
    price: formData.get("price"),
    tags: formData.get("tags"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const {
    name,
    description,
    longDescription,
    startDate,
    startTime,
    endDate,
    endTime,
    location,
    category,
    maxAttendees,
    price,
    tags,
  } = validatedFields.data

  // Validate dates
  const startDateTime = new Date(`${startDate}T${startTime}`)
  const endDateTime = new Date(`${endDate}T${endTime}`)

  if (startDateTime >= endDateTime) {
    return {
      errors: {
        generic: "End date and time must be after start date and time",
      },
    }
  }

  if (startDateTime <= new Date()) {
    return {
      errors: {
        generic: "Event start time must be in the future",
      },
    }
  }

  try {
    const eventData = {
      name,
      description,
      longDescription: longDescription || description,
      start_time: startDateTime.toISOString(),
      end_time: endDateTime.toISOString(),
      location,
      category,
      maxAttendees: Number.parseInt(maxAttendees),
      price: Number.parseFloat(price || "0"),
      tags: tags
        ? tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
      creator: "John Doe", // In a real app, this would come from auth
    }

    const result = await eventService.createEvent(eventData)

    if (result.success) {
      return {
        success: true,
        eventId: result.eventId,
      }
    } else {
      return {
        errors: {
          generic: result.error || "Failed to create event",
        },
      }
    }
  } catch (error) {
    return {
      errors: {
        generic: "An unexpected error occurred",
      },
    }
  }
}

export async function registerForEvent(prevState: any, formData: FormData) {
  const eventId = formData.get("eventId") as string
  const userId = "user-1" // In a real app, this would come from auth

  try {
    const result = await registrationService.registerForEvent(userId, eventId)

    if (result.success) {
      return {
        success: true,
        message: "Successfully registered for event",
      }
    } else {
      return {
        errors: {
          generic: result.error || "Failed to register for event",
        },
      }
    }
  } catch (error) {
    return {
      errors: {
        generic: "An unexpected error occurred",
      },
    }
  }
}

export async function cancelRegistration(prevState: any, formData: FormData) {
  const eventId = formData.get("eventId") as string
  const userId = "user-1" // In a real app, this would come from auth

  try {
    const result = await registrationService.cancelRegistration(userId, eventId)

    if (result.success) {
      return {
        success: true,
        message: "Successfully cancelled registration",
      }
    } else {
      return {
        errors: {
          generic: result.error || "Failed to cancel registration",
        },
      }
    }
  } catch (error) {
    return {
      errors: {
        generic: "An unexpected error occurred",
      },
    }
  }
}
