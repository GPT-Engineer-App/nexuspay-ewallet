import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const PayoutComponent = () => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [amount, setAmount] = useState('');
  const { toast } = useToast();

  // Mock data for saved bank accounts
  const savedAccounts = [
    { id: '1', name: 'Main Savings Account' },
    { id: '2', name: 'Secondary Checking Account' },
  ];

  const handleAccountChange = (value) => {
    setSelectedAccount(value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement payout logic and API call
    console.log('Payout submitted:', { selectedAccount, amount });
    toast({
      title: "Payout Initiated",
      description: `Payout of $${amount} to account ${selectedAccount} has been initiated.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Initiate Payout</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="account">Select Bank Account</Label>
            <Select onValueChange={handleAccountChange} value={selectedAccount}>
              <SelectTrigger id="account">
                <SelectValue placeholder="Select an account" />
              </SelectTrigger>
              <SelectContent>
                {savedAccounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Payout Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          <Button type="submit" className="w-full">Initiate Payout</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PayoutComponent;