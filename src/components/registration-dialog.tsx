"use client"

import type React from "react"

import { useActionState, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertTriangle } from "lucide-react"
import { registerForEvent, cancelRegistration } from "@/actions/events"

interface RegistrationDialogProps {
  eventId: string
  eventName: string
  isRegistered: boolean
  onSuccess: () => void
  children: React.ReactNode
}

export function RegistrationDialog({ eventId, eventName, isRegistered, onSuccess, children }: RegistrationDialogProps) {
  const [open, setOpen] = useState(false)
  const [registerState, registerAction, registerPending] = useActionState(registerForEvent, undefined)
  const [cancelState, cancelAction, cancelPending] = useActionState(cancelRegistration, undefined)

  const currentState = isRegistered ? cancelState : registerState
  const currentAction = isRegistered ? cancelAction : registerAction
  const currentPending = isRegistered ? cancelPending : registerPending

  if (currentState?.success) {
    onSuccess()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {isRegistered ? (
              <>
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span>Cancel Registration</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Register for Event</span>
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {isRegistered
              ? `Are you sure you want to cancel your registration for "${eventName}"?`
              : `Would you like to register for "${eventName}"?`}
          </DialogDescription>
        </DialogHeader>

        {currentState?.errors?.generic && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{currentState.errors.generic}</AlertDescription>
          </Alert>
        )}

        {!isRegistered && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              You'll receive a confirmation email with your ticket and QR code after registration.
            </AlertDescription>
          </Alert>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <form action={currentAction}>
            <input type="hidden" name="eventId" value={eventId} />
            <Button type="submit" variant={isRegistered ? "destructive" : "default"} disabled={currentPending}>
              {currentPending
                ? isRegistered
                  ? "Cancelling..."
                  : "Registering..."
                : isRegistered
                  ? "Cancel Registration"
                  : "Register Now"}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
