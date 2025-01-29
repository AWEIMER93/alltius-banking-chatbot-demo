import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  DollarSign,
  Bell,
  Search,
  User,
  Home,
  Wallet,
  Shield,
  Package,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Chatbot } from "@/components/Chatbot";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

const mockData = {
  spent: 982.5,
  received: 890.2,
  investments: 24461.5,
  cashback: 1897.3,
  cardBalance: 3135.15,
  income: 536.2,
  outcome: 217.3,
  transactions: [
    {
      id: 1,
      merchant: "Apple Store",
      amount: 135.0,
      type: "Credit card",
      cardLast4: "4300",
      date: "Sat, Sep 4",
      logo: "VISA",
    },
    {
      id: 2,
      merchant: "King Soopers",
      amount: 16.5,
      type: "Credit card",
      cardLast4: "4289",
      date: "Fri, Sep 3",
      logo: "VISA",
    },
    {
      id: 3,
      merchant: "Safeway",
      amount: 58.0,
      type: "Debit card",
      cardLast4: "9054",
      date: "Fri, Sep 3",
      logo: "MASTERCARD",
    },
    // Add more transactions as needed
  ],
  chartData: [
    { name: "Jan", amount: 4000 },
    { name: "Feb", amount: 3000 },
    { name: "Mar", amount: 2000 },
    { name: "Apr", amount: 2780 },
    { name: "May", amount: 1890 },
    { name: "Jun", amount: 2390 },
  ],
};

const Dashboard = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  const MenuItem = ({ icon: Icon, label }: { icon: any; label: string }) => (
    <Button
      variant="ghost"
      className="w-full justify-start gap-2 text-primary hover:bg-muted group transition-all duration-300"
    >
      <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
      <span className="opacity-90 group-hover:opacity-100">{label}</span>
    </Button>
  );

  const StatCard = ({
    title,
    value,
    trend,
    icon: Icon,
    trendUp = true,
  }: {
    title: string;
    value: number;
    trend?: string;
    icon: any;
    trendUp?: boolean;
  }) => (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-muted/50">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-primary/5">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        {trendUp ? (
          <ArrowUpRight className="h-5 w-5 text-green-500" />
        ) : (
          <ArrowDownRight className="h-5 w-5 text-red-500" />
        )}
      </div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <h3 className="text-2xl font-bold mt-1 mb-2">
        ${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </h3>
      {trend && (
        <p className={cn("text-xs", trendUp ? "text-green-500" : "text-red-500")}>
          {trend}
        </p>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r p-4 flex flex-col animate-fade-in">
        <div className="mb-8 transition-transform hover:scale-105">
          <img
            src="https://gust-production.s3.amazonaws.com/uploads/startup/logo_image/1476546/Alltius-email2.png"
            alt="Alltius Bank Logo"
            className="h-8"
          />
        </div>

        <nav className="space-y-2">
          <MenuItem icon={Home} label="Overview" />
          <MenuItem icon={Wallet} label="Wallet" />
          <MenuItem icon={DollarSign} label="Payments" />
          <MenuItem icon={Package} label="Products" />
          <MenuItem icon={Shield} label="Security" />
        </nav>

        <div className="mt-auto">
          <Card className="p-4 bg-muted hover:bg-muted/80 transition-colors duration-300">
            <h3 className="font-semibold mb-2">Have questions?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ask your financial specialist.
            </p>
            <Button
              variant="secondary"
              className="w-full hover:scale-105 transition-transform duration-300"
              onClick={() => setIsChatOpen(true)}
            >
              Chat now
            </Button>
          </Card>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 animate-fade-in">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 transition-colors group-hover:text-primary" />
            <Input
              placeholder="Search"
              className="pl-10 w-64 transition-all duration-300 focus:w-80"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 transition-transform hover:rotate-12" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full animate-pulse"></span>
            </Button>
            <Button
              variant="ghost"
              className="gap-2 group"
              onClick={() => navigate("/")}
            >
              <User className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span className="group-hover:text-primary transition-colors">Alex Smith</span>
            </Button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Spent this month"
            value={mockData.spent}
            icon={DollarSign}
            trend="+2.4% vs last month"
            trendUp={false}
          />
          <StatCard
            title="Received this month"
            value={mockData.received}
            icon={Wallet}
            trend="+4.3% vs last month"
          />
          <StatCard
            title="Investments"
            value={mockData.investments}
            icon={TrendingUp}
            trend="+$121.1 (2.1%)"
          />
          <StatCard
            title="Cashback"
            value={mockData.cashback}
            icon={CreditCard}
            trend="+$24.3 this month"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card Details */}
          <Card className="col-span-2 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Cards</h2>
              <Button variant="outline" className="hover:scale-105 transition-transform">
                Add new card
              </Button>
            </div>

            <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-6 mb-6 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <img
                  src="https://gust-production.s3.amazonaws.com/uploads/startup/logo_image/1476546/Alltius-email2.png"
                  alt="Alltius Bank Logo"
                  className="h-8 invert"
                />
                <CreditCard className="h-8 w-8" />
              </div>
              <p className="text-lg mb-4 font-mono">**** **** **** 4300</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-80">Card Holder</p>
                  <p>Alex Smith</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Expires</p>
                  <p>09/25</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <p className="text-muted-foreground">Available balance</p>
                <p className="text-2xl font-bold">${mockData.cardBalance}</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <p className="text-sm text-muted-foreground">Income</p>
                  <p className="font-semibold">${mockData.income}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <p className="text-sm text-muted-foreground">Outcome</p>
                  <p className="font-semibold">${mockData.outcome}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Transactions */}
          <Card className="p-6 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {mockData.transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-all duration-300 hover:-translate-x-1"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="border-2 border-transparent hover:border-primary transition-colors">
                      <img
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${transaction.merchant}`}
                        alt={transaction.merchant}
                      />
                    </Avatar>
                    <div>
                      <p className="font-medium">{transaction.merchant}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.type} *{transaction.cardLast4}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Chart */}
          <Card className="col-span-2 p-6 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-6">Spending Overview</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockData.chartData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4A90E2" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#4A90E2"
                    fill="url(#colorAmount)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </main>

      {/* Chatbot */}
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Dashboard;
