"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Plus, Trash2 } from "lucide-react"

export default function SavedAddresses() {
  // Mock address data
  const [addresses, setAddresses] = useState([
    {
      id: "addr-1",
      name: "Home",
      street: "123 Main Street",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      country: "United States",
      isDefault: true,
    },
    {
      id: "addr-2",
      name: "Work",
      street: "456 Office Park",
      city: "Business City",
      state: "NY",
      zip: "67890",
      country: "United States",
      isDefault: false,
    },
  ])

  const handleRemoveAddress = (id: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id))
  }

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Saved Addresses</CardTitle>
          <CardDescription>Manage your shipping and billing addresses</CardDescription>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Address
        </Button>
      </CardHeader>

      <CardContent>
        {addresses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">You don't have any saved addresses.</p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Address
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div key={address.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <h3 className="font-medium">{address.name}</h3>
                    {address.isDefault && (
                      <span className="ml-2 text-xs bg-[#eb0205]/10 text-[#eb0205] px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleRemoveAddress(address.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state} {address.zip}
                  </p>
                  <p>{address.country}</p>
                </div>

                {!address.isDefault && (
                  <Button
                    variant="link"
                    className="mt-2 h-auto p-0 text-sm text-[#eb0205]"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    Set as default
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

