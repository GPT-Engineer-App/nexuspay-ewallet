import React, { useState } from 'react';
import { processPayin, processPayout } from '@/lib/apiService';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

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

  const [payoutData, setPayoutData] = useState({
    name: "",
    email: "",
    amount: "",
    mobilenumber: "",
    address: "",
    bank_account: "",
    pay_method: "allbank_payout_g_exchange",
    remarks: "cash out live test"
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePayinChange = (e) => {
    setPayinData({ ...payinData, [e.target.name]: e.target.value });
  };

  const handlePayoutChange = (e) => {
    setPayoutData({ ...payoutData, [e.target.name]: e.target.value });
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

  const handlePayout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await processPayout(payoutData);
      toast({
        title: "Payout Successful",
        description: JSON.stringify(result, null, 2),
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payin</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePayin} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="payin-name">Name</Label>
                <Input id="payin-name" name="name" value={payinData.name} onChange={handlePayinChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payin-email">Email</Label>
                <Input id="payin-email" name="email" type="email" value={payinData.email} onChange={handlePayinChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payin-amount">Amount</Label>
                <Input id="payin-amount" name="amount" type="number" value={payinData.amount} onChange={handlePayinChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payin-mobilenumber">Mobile Number</Label>
                <Input id="payin-mobilenumber" name="mobilenumber" value={payinData.mobilenumber} onChange={handlePayinChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payin-address">Address</Label>
                <Input id="payin-address" name="address" value={payinData.address} onChange={handlePayinChange} required />
              </div>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Processing Payin...' : 'Process Payin'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payout</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePayout} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="payout-name">Name</Label>
                <Input id="payout-name" name="name" value={payoutData.name} onChange={handlePayoutChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payout-email">Email</Label>
                <Input id="payout-email" name="email" type="email" value={payoutData.email} onChange={handlePayoutChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payout-amount">Amount</Label>
                <Input id="payout-amount" name="amount" type="number" value={payoutData.amount} onChange={handlePayoutChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payout-mobilenumber">Mobile Number</Label>
                <Input id="payout-mobilenumber" name="mobilenumber" value={payoutData.mobilenumber} onChange={handlePayoutChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payout-address">Address</Label>
                <Input id="payout-address" name="address" value={payoutData.address} onChange={handlePayoutChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payout-bank-account">Bank Account</Label>
                <Input id="payout-bank-account" name="bank_account" value={payoutData.bank_account} onChange={handlePayoutChange} required />
              </div>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Processing Payout...' : 'Process Payout'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentComponent;