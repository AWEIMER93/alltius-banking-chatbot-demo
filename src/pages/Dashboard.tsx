import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  DollarSign,
  Bell,
  Search,
  User,
  Home,
  BarChart3,
  MessageSquare,
  Heart,
  ArrowRightLeft,
  LogOut,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Chatbot } from "@/components/Chatbot";
import { StatCard } from "@/components/dashboard/StatCard";
import { TransactionList } from "@/components/dashboard/TransactionList";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockData = {
  cardNumber: "4568 8456 9874 2468",
  cardHolder: "Alex Smith",
  expDate: "05/25",
  balance: 6480,
  transactions: [
    { id: 1, name: "Dribbble Pro", date: "Apr 18, 2024", amount: 60.00, icon: "dribbble" },
    { id: 2, name: "Apple Pro", date: "Apr 18, 2024", amount: 26.00, icon: "apple" },
    { id: 3, name: "Pizza Hub", date: "Apr 18, 2024", amount: 36.00, icon: "pizza" },
  ],
  spendingData: [
    { date: "Mon", amount: 120 },
    { date: "Tue", amount: 200 },
    { date: "Wed", amount: 150 },
    { date: "Thu", amount: 300 },
    { date: "Fri", amount: 250 },
    { date: "Sat", amount: 180 },
    { date: "Sun", amount: 220 },
  ],
};

const Dashboard = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  const MenuItem = ({ icon: Icon, label, active = false }: { icon: any; label: string; active?: boolean }) => (
    <Button
      variant="ghost"
      className={`w-full justify-start gap-3 text-muted-foreground hover:bg-primary/10 group transition-all duration-300 ${
        active ? "text-primary bg-primary/5" : ""
      }`}
    >
      <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
      <span className="opacity-90 group-hover:opacity-100">{label}</span>
    </Button>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card p-6 flex flex-col gap-8 animate-fade-in">
        <div className="flex items-center gap-2 mb-8">
          <img
            src="https://gust-production.s3.amazonaws.com/uploads/startup/logo_image/1476546/Alltius-email2.png"
            alt="Alltius Bank Logo"
            className="h-8 invert"
          />
          <span className="text-xl font-bold">Alltius</span>
        </div>

        <nav className="space-y-2">
          <MenuItem icon={Home} label="Dashboard" active />
          <MenuItem icon={BarChart3} label="Statistics" />
          <MenuItem icon={CreditCard} label="Wallet" />
          <MenuItem icon={MessageSquare} label="Messages" />
          <MenuItem icon={User} label="Profile" />
          <MenuItem icon={Heart} label="Favorites" />
          <MenuItem icon={ArrowRightLeft} label="Transfers" />
        </nav>

        <Button
          variant="ghost"
          className="mt-auto text-red-400 hover:text-red-300 hover:bg-red-400/10 gap-3"
          onClick={() => navigate("/")}
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </Button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 animate-fade-in">
          <div className="flex gap-4 items-center">
            <h1 className="text-2xl font-bold">Welcome back, Alex</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search"
                className="pl-10 w-64 bg-card border-none focus:ring-primary/20"
              />
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-primary/10"
              onClick={() => setIsChatOpen(true)}
            >
              <MessageSquare className="h-5 w-5 transition-transform hover:scale-110" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
              <Bell className="h-5 w-5 transition-transform hover:rotate-12" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
            </Button>
            
            <Avatar className="h-10 w-10 border-2 border-primary/20 hover:border-primary transition-colors">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=AS`}
                alt="Alex Smith"
              />
            </Avatar>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* Stats */}
          <div className="col-span-12 grid grid-cols-3 gap-6">
            <StatCard
              title="Total Balance"
              value={`$${mockData.balance.toLocaleString()}`}
              icon={Wallet}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Monthly Spending"
              value="$2,460"
              icon={DollarSign}
              trend={{ value: 8, isPositive: false }}
            />
            <StatCard
              title="Active Cards"
              value="3"
              icon={CreditCard}
            />
          </div>

          {/* Spending Chart */}
          <Card className="col-span-8 bg-card p-6">
            <h2 className="text-lg font-semibold mb-6">Spending Overview</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockData.spendingData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7F3DFF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#7F3DFF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#212736",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#7F3DFF"
                    fillOpacity={1}
                    fill="url(#colorAmount)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Transactions */}
          <div className="col-span-4">
            <TransactionList transactions={mockData.transactions} />
          </div>
        </div>
      </main>

      {/* Chatbot */}
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Dashboard;