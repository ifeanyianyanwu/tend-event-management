"use client"

import type React from "react"

import { useState } from "react"
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

interface RegistrationDialogProps {
  eventName: string
  isRegistered: boolean
  onRegister: () => Promise<void>
  onCancel: () => Promise<void>
  children: React.ReactNode
}

export function RegistrationDialog({
  eventName,
  isRegistered,
  onRegister,
  onCancel,
  children,
}: RegistrationDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleAction = async () => {
    setLoading(true)
    try {
      if (isRegistered) {
        await onCancel()
      } else {
        await onRegister()
      }
      setOpen(false)
    } catch (error) {
      console.error("Action failed:", error)
    } finally {
      setLoading(false)
    }
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
          <Button variant={isRegistered ? "destructive" : "default"} onClick={handleAction} disabled={loading}>
            {loading
              ? isRegistered
                ? "Cancelling..."
                : "Registering..."
              : isRegistered
                ? "Cancel Registration"
                : "Register Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
