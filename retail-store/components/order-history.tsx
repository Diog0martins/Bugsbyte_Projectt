import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function OrderHistory() {
  // Mock order data
  const orders = [
    {
      id: "ORD-1234",
      date: "March 15, 2025",
      total: 129.99,
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD-5678",
      date: "February 28, 2025",
      total: 79.5,
      status: "Shipped",
      items: 2,
    },
    {
      id: "ORD-9012",
      date: "January 10, 2025",
      total: 45.75,
      status: "Delivered",
      items: 1,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>View your past orders and their status</CardDescription>
      </CardHeader>

      <CardContent>
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
            <Button asChild>
              <Link href="/">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{order.id}</h3>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <Badge variant={order.status === "Delivered" ? "outline" : "default"}>{order.status}</Badge>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{order.items} items</p>
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

