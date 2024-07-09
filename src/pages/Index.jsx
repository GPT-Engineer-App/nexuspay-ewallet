import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Send } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PaymentComponent from "@/components/PaymentComponent";
import PayoutComponent from "@/components/PayoutComponent";

const Index = () => {
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [isSendMoneyOpen, setIsSendMoneyOpen] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Nexuspay</h1>
      <p className="text-muted-foreground">
        Manage your finances with ease using our secure and user-friendly ewallet.
      </p>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$1,234.56</div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-4">
        <Dialog open={isAddMoneyOpen} onOpenChange={setIsAddMoneyOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Money
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Money</DialogTitle>
            </DialogHeader>
            <PaymentComponent />
          </DialogContent>
        </Dialog>

        <Dialog open={isSendMoneyOpen} onOpenChange={setIsSendMoneyOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Send className="mr-2 h-4 w-4" /> Send Money
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Send Money</DialogTitle>
            </DialogHeader>
            <PayoutComponent />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;