import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash } from "lucide-react";

const BankAccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [currentAccount, setCurrentAccount] = useState({
    id: null,
    accountName: '',
    accountNumber: '',
    bankName: '',
    branchCode: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAccount({ ...currentAccount, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing account
      const updatedAccounts = accounts.map(account =>
        account.id === currentAccount.id ? currentAccount : account
      );
      setAccounts(updatedAccounts);
      setIsEditing(false);
    } else {
      // Add new account
      const newAccount = { ...currentAccount, id: Date.now() };
      setAccounts([...accounts, newAccount]);
    }

    // Send data to webhook
    try {
      const response = await fetch('https://hooks.zapier.com/hooks/catch/15068756/23w0tw3/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentAccount),
      });

      if (response.ok) {
        toast({
          title: isEditing ? "Account Updated" : "Account Added",
          description: "Your bank account details have been saved successfully.",
        });
      } else {
        throw new Error('Failed to save bank account details');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save bank account details. Please try again.",
        variant: "destructive",
      });
    }

    // Reset form
    setCurrentAccount({ id: null, accountName: '', accountNumber: '', bankName: '', branchCode: '' });
  };

  const handleEdit = (account) => {
    setCurrentAccount(account);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setAccounts(accounts.filter(account => account.id !== id));
    toast({
      title: "Account Deleted",
      description: "The bank account has been removed.",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Bank Account Management</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accountName">Account Name</Label>
            <Input
              id="accountName"
              name="accountName"
              value={currentAccount.accountName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              name="accountNumber"
              value={currentAccount.accountNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              name="bankName"
              value={currentAccount.bankName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="branchCode">Branch Code</Label>
            <Input
              id="branchCode"
              name="branchCode"
              value={currentAccount.branchCode}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {isEditing ? 'Update Account' : 'Add Account'}
          </Button>
        </form>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Your Bank Accounts</h3>
          {accounts.length === 0 ? (
            <p className="text-muted-foreground">No bank accounts added yet.</p>
          ) : (
            <div className="space-y-4">
              {accounts.map((account) => (
                <Card key={account.id}>
                  <CardContent className="flex justify-between items-center p-4">
                    <div>
                      <p className="font-semibold">{account.accountName}</p>
                      <p className="text-sm text-muted-foreground">{account.bankName} - {account.accountNumber}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="icon" variant="outline" onClick={() => handleEdit(account)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline" onClick={() => handleDelete(account.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BankAccountManagement;