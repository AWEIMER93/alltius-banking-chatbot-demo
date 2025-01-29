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
      className="w-full justify-start gap-2 text-primary hover:bg-muted"
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Button>
  );

  const StatCard = ({
    title,
    value,
    trend,
  }: {
    title: string;
    value: number;
    trend?: string;
  }) => (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <p className="text-sm text-muted-foreground">{title}</p>
      <h3 className="text-2xl font-bold">
        ${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </h3>
      {trend && (
        <p className="text-xs text-green-500 mt-1">
          {trend}
        </p>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r p-4 flex flex-col">
        <div className="mb-8">
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
          <Card className="p-4 bg-muted">
            <h3 className="font-semibold mb-2">Have questions?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ask your financial specialist.
            </p>
            <Button
              variant="secondary"
              className="w-full"
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
        <header className="flex justify-between items-center mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search"
              className="pl-10 w-64"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              className="gap-2"
              onClick={() => navigate("/")}
            >
              <User className="h-5 w-5" />
              <span>Alex Smith</span>
            </Button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Spent this month" value={mockData.spent} />
          <StatCard title="Received this month" value={mockData.received} />
          <StatCard
            title="Investments"
            value={mockData.investments}
            trend="+$121.1 (2.1%)"
          />
          <StatCard title="Cashback" value={mockData.cashback} />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card Details */}
          <Card className="col-span-2 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Cards</h2>
              <Button variant="outline">Add new card</Button>
            </div>

            <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-8">
                <img
                  src="https://gust-production.s3.amazonaws.com/uploads/startup/logo_image/1476546/Alltius-email2.png"
                  alt="Alltius Bank Logo"
                  className="h-8 invert"
                />
                <CreditCard className="h-8 w-8" />
              </div>
              <p className="text-lg mb-4">**** **** **** 4300</p>
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
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground">Available balance</p>
                <p className="text-2xl font-bold">${mockData.cardBalance}</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Income</p>
                  <p className="font-semibold">${mockData.income}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Outcome</p>
                  <p className="font-semibold">${mockData.outcome}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Transactions */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {mockData.transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
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
          <Card className="col-span-2 p-6">
            <h2 className="text-xl font-semibold mb-6">Spending Overview</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockData.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#4A90E2"
                    fill="#4A90E2"
                    fillOpacity={0.2}
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