import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, Plus, Send } from "lucide-react";
import PaymentComponent from "@/components/PaymentComponent";
import UserProfileComponent from "@/components/UserProfileComponent";

const Index = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Nexuspay</h1>
      <p className="text-muted-foreground">
        Manage your finances with ease using our secure and user-friendly ewallet.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,234.56</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Income</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$500.00</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Expenses</CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$320.00</div>
            <p className="text-xs text-muted-foreground">-5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Money
        </Button>
        <Button variant="outline">
          <Send className="mr-2 h-4 w-4" /> Send Money
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Your recent transactions will appear here. Start using your wallet to see the activity.
          </p>
        </CardContent>
      </Card>

      <PaymentComponent />

      <UserProfileComponent />
    </div>
  );
};

export default Index;