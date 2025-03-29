"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AccountDetails() {
  const [user, setUser] = useState({
    account_no: "839942280275",
    family_members: "4",
    age_group: "55-65 anos",
    district: "viana do castelo", 
    segment_cd_lifestyle: "4",
    segment_cd_lifestage: "4",
    name: "João Dom",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(user)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUser(formData)
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Details</CardTitle>
        <CardDescription>View and update your personal information</CardDescription>
      </CardHeader>

      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
              <p>{user.name}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
              <p>{user.email}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
              <p>{user.phone}</p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        {isEditing ? (
          <div className="flex space-x-2">
            <Button type="submit" onClick={handleSubmit}>
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false)
                setFormData(user)
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit Details</Button>
        )}
      </CardFooter>
    </Card>
  )
}

