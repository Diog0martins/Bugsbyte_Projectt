import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AccountDetails from "@/components/account-details"
import OrderHistory from "@/components/order-history"
import SavedAddresses from "@/components/saved-addresses"

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="details">Account Details</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="addresses">Saved Addresses</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <AccountDetails />
        </TabsContent>

        <TabsContent value="orders">
          <OrderHistory />
        </TabsContent>

        <TabsContent value="addresses">
          <SavedAddresses />
        </TabsContent>
      </Tabs>
    </div>
  )
}

