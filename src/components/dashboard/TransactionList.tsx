import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface Transaction {
  id: number;
  name: string;
  date: string;
  amount: number;
  icon: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <Card className="bg-card p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-xl bg-background hover:bg-background/80 transition-all duration-300 group hover:-translate-x-1"
          >
            <div className="flex items-center gap-3">
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
  );
};