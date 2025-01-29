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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Chatbot } from "@/components/Chatbot";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

const mockData = {
  cardNumber: "4568 8456 9874 2468",
  cardHolder: "Alex Smith",
  expDate: "05/25",
  balance: 6480,
  sendMoneyContacts: [
    { id: 1, name: "Helena Foster", amount: 460.00, avatar: "HF" },
    { id: 2, name: "James Rahman", amount: 160.00, avatar: "JR" },
    { id: 3, name: "Jennifer Lauren", amount: 290.00, avatar: "JL" },
  ],
  transactions: [
    { id: 1, name: "Dribbble Pro", date: "Apr 18, 2024", amount: 60.00, icon: "dribbble" },
    { id: 2, name: "Apple Pro", date: "Apr 18, 2024", amount: 26.00, icon: "apple" },
    { id: 3, name: "Pizza Hub", date: "Apr 18, 2024", amount: 36.00, icon: "pizza" },
    { id: 4, name: "Netflix", date: "Apr 18, 2024", amount: 29.00, icon: "netflix" },
    { id: 5, name: "Udemy Course", date: "Apr 18, 2024", amount: 59.00, icon: "udemy" },
  ],
  incomeData: [
    { month: "Apr", amount: 3200 },
    { month: "May", amount: 4100 },
    { month: "Jun", amount: 3800 },
    { month: "Aug", amount: 4800 },
    { month: "Sep", amount: 3900 },
  ],
  expenseTypes: [
    { name: "Shopping", value: 66, color: "#FF5C8E" },
    { name: "Transport", value: 26, color: "#7F3DFF" },
    { name: "Others", value: 8, color: "#4A90E2" },
  ],
};

const Dashboard = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  const MenuItem = ({ icon: Icon, label, active = false }: { icon: any; label: string; active?: boolean }) => (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 text-muted-foreground hover:bg-primary/10 group transition-all duration-300",
        active && "text-primary bg-primary/5"
      )}
    >
      <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
      <span className="opacity-90 group-hover:opacity-100">{label}</span>
    </Button>
  );

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#212736] p-6 flex flex-col gap-8 animate-fade-in">
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
            <h1 className="text-2xl font-bold">Hi Alex,</h1>
            <span className="text-muted-foreground">Welcome back</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search"
                className="pl-10 w-64 bg-[#212736] border-none focus:ring-primary/20"
              />
            </div>
            
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
          {/* Credit Card */}
          <Card className="col-span-5 bg-gradient-to-br from-[#FF5C8E] to-[#7F3DFF] p-6 rounded-3xl border-none hover:shadow-xl transition-all duration-500 group hover:-translate-y-1">
            <div className="flex justify-between items-center mb-8">
              <img
                src="https://gust-production.s3.amazonaws.com/uploads/startup/logo_image/1476546/Alltius-email2.png"
                alt="Alltius Bank Logo"
                className="h-8 invert"
              />
              <CreditCard className="h-8 w-8" />
            </div>
            <p className="text-2xl font-mono mb-6 tracking-wider">{mockData.cardNumber}</p>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-80">Card Holder</p>
                <p className="font-medium">{mockData.cardHolder}</p>
              </div>
              <div>
                <p className="text-sm opacity-80">Expires</p>
                <p className="font-medium">{mockData.expDate}</p>
              </div>
            </div>
          </Card>

          {/* Send Money */}
          <Card className="col-span-7 bg-[#212736] p-6 rounded-3xl border-none">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Send money</h2>
              <Button variant="ghost" className="text-sm text-muted-foreground">
                Monthly
              </Button>
            </div>
            <div className="space-y-4">
              {mockData.sendMoneyContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#1A1F2C] hover:bg-[#1A1F2C]/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="border-2 border-primary/20">
                      <div className="font-medium">{contact.avatar}</div>
                    </Avatar>
                    <span className="font-medium">{contact.name}</span>
                  </div>
                  <span className="font-mono">${contact.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Income Chart */}
          <Card className="col-span-6 bg-[#212736] p-6 rounded-3xl border-none">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Income</h2>
              <Button variant="ghost" className="text-sm text-muted-foreground">
                Recent
              </Button>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.incomeData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#212736",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="amount" fill="#7F3DFF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Expenses Chart */}
          <Card className="col-span-6 bg-[#212736] p-6 rounded-3xl border-none">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Type of expenses</h2>
              <Button variant="ghost" className="text-sm text-muted-foreground">
                Recent
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-[200px] w-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockData.expenseTypes}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {mockData.expenseTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {mockData.expenseTypes.map((type) => (
                  <div key={type.name} className="flex items-center gap-3">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: type.color }}
                    />
                    <span className="text-sm">
                      {type.name} ({type.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Transactions */}
          <Card className="col-span-12 bg-[#212736] p-6 rounded-3xl border-none">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Transaction History</h2>
              <Button variant="ghost" className="text-sm text-muted-foreground">
                Monthly
              </Button>
            </div>
            <div className="space-y-4">
              {mockData.transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#1A1F2C] hover:bg-[#1A1F2C]/80 transition-all duration-300 group hover:-translate-x-1"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="bg-primary/10">
                      <img
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${transaction.icon}`}
                        alt={transaction.name}
                      />
                    </Avatar>
                    <div>
                      <p className="font-medium group-hover:text-primary transition-colors">
                        {transaction.name}
                      </p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <span className="font-mono font-medium">
                    ${transaction.amount.toFixed(2)}
                  </span>
                </div>
              ))}
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