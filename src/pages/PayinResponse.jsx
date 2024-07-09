import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const PayinResponse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const response = location.state?.response;

  if (!response) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>No payin response data available.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate('/payin')}>Return to Payin</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const { trans_id, external_id, operation_id, redirect_url } = response;

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Payin Response</CardTitle>
          <CardDescription>Review your transaction details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Transaction ID</p>
            <p className="text-lg font-semibold">{trans_id}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">External ID</p>
            <p className="text-lg font-semibold">{external_id}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Operation ID</p>
            <p className="text-lg font-semibold">{operation_id}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate('/payin')}>Back</Button>
          <Button onClick={() => window.location.href = redirect_url}>Pay Now</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PayinResponse;