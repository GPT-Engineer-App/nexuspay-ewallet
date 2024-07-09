import React, { useState } from 'react';
import { processPayin } from '@/lib/apiService';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PaymentComponent = () => {
  const [payinData, setPayinData] = useState({
    name: "",
    email: "",
    amount: "",
    pay_method: "sp-qrph",
    mobilenumber: "",
    address: "",
    webhook: "https://hook.eu2.make.com/ern4krdqcl8gzbm2a106yrnt8gltko9q",
    remarks: "live test payin"
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayinData({ ...payinData, [name]: value });
  };

  const handlePayin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await processPayin(payinData);
      toast({
        title: "Payin Successful",
        description: JSON.stringify(result, null, 2),
      });
    } catch (error) {
      toast({
        title: "Payin Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          value={payinData.amount}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="pay_method">Payment Method</Label>
        <Select name="pay_method" onValueChange={(value) => setPayinData({ ...payinData, pay_method: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sp-qrph">QR PH</SelectItem>
            <SelectItem value="sp-gcash">GCash</SelectItem>
            <SelectItem value="sp-maya">Maya</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Processing...' : 'Add Money'}
      </Button>
    </form>
  );
};

export default PaymentComponent;