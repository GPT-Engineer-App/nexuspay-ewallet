import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { processPayout } from '@/lib/apiService';

const PayoutComponent = () => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payoutData = {
        accountId: selectedAccount,
        amount: parseFloat(amount),
        // Add other necessary fields for payout
      };
      const result = await processPayout(payoutData);
      toast({
        title: "Payout Initiated",
        description: `Payout of $${amount} to account ${selectedAccount} has been initiated.`,
      });
    } catch (error) {
      toast({
        title: "Payout Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
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
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Processing...' : 'Send Money'}
      </Button>
    </form>
  );
};

export default PayoutComponent;