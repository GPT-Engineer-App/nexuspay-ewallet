import React, { useState, useEffect } from 'react';
import { processPayin } from '@/lib/apiService';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PaymentComponent = () => {
  const [profiles, setProfiles] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", mobilenumber: "1234567890", address: "123 Main St" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", mobilenumber: "0987654321", address: "456 Elm St" },
  ]);
  const [selectedProfile, setSelectedProfile] = useState(null);
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

  useEffect(() => {
    if (selectedProfile) {
      setPayinData(prevData => ({
        ...prevData,
        name: selectedProfile.name,
        email: selectedProfile.email,
        mobilenumber: selectedProfile.mobilenumber,
        address: selectedProfile.address,
      }));
    }
  }, [selectedProfile]);

  const handleProfileChange = (profileId) => {
    const profile = profiles.find(p => p.id.toString() === profileId);
    setSelectedProfile(profile);
  };

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
    <Card>
      <CardHeader>
        <CardTitle>Payin</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePayin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profile">Select Profile</Label>
            <Select onValueChange={handleProfileChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a profile" />
              </SelectTrigger>
              <SelectContent>
                {profiles.map((profile) => (
                  <SelectItem key={profile.id} value={profile.id.toString()}>
                    {profile.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
          <Button type="submit" disabled={loading}>
            {loading ? 'Processing Payin...' : 'Process Payin'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentComponent;