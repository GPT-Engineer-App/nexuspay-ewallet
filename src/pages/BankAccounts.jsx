import BankAccountManagement from "@/components/BankAccountManagement";

const BankAccounts = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bank Accounts</h1>
      <BankAccountManagement />
    </div>
  );
};

export default BankAccounts;