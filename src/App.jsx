import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home, Wallet, Settings, BarChart3, User, CreditCard, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/sidebar";
import Index from "./pages/Index.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import BankAccounts from "./pages/BankAccounts.jsx";
import Payin from "./pages/Payin.jsx";
import Payout from "./pages/Payout.jsx";
import PayinResponse from "./pages/PayinResponse.jsx";

const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Transactions",
    to: "/transactions",
    icon: <BarChart3 className="h-4 w-4" />,
  },
  {
    title: "Wallet",
    to: "/wallet",
    icon: <Wallet className="h-4 w-4" />,
  },
  {
    title: "User Profile",
    to: "/profile",
    icon: <User className="h-4 w-4" />,
  },
  {
    title: "Bank Accounts",
    to: "/bank-accounts",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    title: "Payin",
    to: "/payin",
    icon: <ArrowUpCircle className="h-4 w-4" />,
  },
  {
    title: "Payout",
    to: "/payout",
    icon: <ArrowDownCircle className="h-4 w-4" />,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: <Settings className="h-4 w-4" />,
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="bank-accounts" element={<BankAccounts />} />
              <Route path="payin" element={<Payin />} />
              <Route path="payout" element={<Payout />} />
              <Route path="payin-response" element={<PayinResponse />} />
              {/* Add more routes here as needed */}
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;