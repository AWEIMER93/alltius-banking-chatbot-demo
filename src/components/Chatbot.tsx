import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import {
  MessageSquare,
  X,
  Send,
  DollarSign,
  PieChart,
  Shield,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  type?: "text" | "security" | "options";
  options?: { label: string; value: string }[];
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockContacts = [
  { id: 1, name: "John Doe", photo: "JD" },
  { id: 2, name: "Jane Smith", photo: "JS" },
];

export const Chatbot = ({ isOpen, onClose }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [showSecurityPrompt, setShowSecurityPrompt] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial welcome message
      setMessages([
        {
          id: 1,
          text: "Hello! I'm your Alltius Bank assistant. How can I help you today?",
          sender: "bot",
          type: "options",
          options: [
            { label: "Make Transfer", value: "transfer" },
            { label: "Balance Overview", value: "balance" },
            { label: "Fraud Alerts", value: "fraud" },
          ],
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { id: Date.now(), text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      let botResponse: Message;

      if (input.toLowerCase().includes("transfer")) {
        botResponse = {
          id: Date.now(),
          text: "Who would you like to transfer money to? Here are your favorites:",
          sender: "bot",
          type: "options",
          options: mockContacts.map((contact) => ({
            label: contact.name,
            value: `transfer_to_${contact.id}`,
          })),
        };
      } else if (input.toLowerCase().includes("balance")) {
        botResponse = {
          id: Date.now(),
          text: "Your current balance overview:\n\nChecking: $3,135.15\nSavings: $12,450.89\n\nLargest transaction this month: Apple Store ($135.00)",
          sender: "bot",
        };
      } else if (input.toLowerCase().includes("fraud")) {
        botResponse = {
          id: Date.now(),
          text: "No suspicious activities detected in the last 30 days. Your last login was from New York, USA.",
          sender: "bot",
        };
      } else {
        botResponse = {
          id: Date.now(),
          text: "I'm here to help! Would you like to:",
          sender: "bot",
          type: "options",
          options: [
            { label: "Make Transfer", value: "transfer" },
            { label: "Balance Overview", value: "balance" },
            { label: "Fraud Alerts", value: "fraud" },
          ],
        };
      }

      setMessages([...newMessages, botResponse]);
    }, 1000);
  };

  const handleOptionClick = (value: string) => {
    if (value.startsWith("transfer_to_")) {
      setShowSecurityPrompt(true);
    } else {
      setInput(value);
      handleSend();
    }
  };

  const handleSecuritySubmit = () => {
    if (securityCode === "1234") {
      setShowSecurityPrompt(false);
      setSecurityCode("");
      toast({
        title: "Transfer Successful",
        description: "Your transfer has been processed.",
      });
      setMessages([
        ...messages,
        {
          id: Date.now(),
          text: "Transfer completed successfully! The new balance has been updated.",
          sender: "bot",
        },
      ]);
    } else {
      toast({
        title: "Invalid Security Code",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 z-50 animate-slide-in">
      <Card className="h-[600px] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-primary text-primary-foreground">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <h2 className="font-semibold">Alltius Assistant</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-primary-foreground/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                } rounded-lg p-3`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                {message.type === "options" && (
                  <div className="mt-3 space-y-2">
                    {message.options?.map((option) => (
                      <Button
                        key={option.value}
                        variant="secondary"
                        className="w-full justify-start"
                        onClick={() => handleOptionClick(option.value)}
                      >
                        {option.label === "Make Transfer" && (
                          <DollarSign className="h-4 w-4 mr-2" />
                        )}
                        {option.label === "Balance Overview" && (
                          <PieChart className="h-4 w-4 mr-2" />
                        )}
                        {option.label === "Fraud Alerts" && (
                          <Shield className="h-4 w-4 mr-2" />
                        )}
                        {option.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Security Code Prompt */}
        {showSecurityPrompt && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <Card className="w-72 p-4">
              <h3 className="font-semibold mb-4">Enter Security Code</h3>
              <Input
                type="password"
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value)}
                placeholder="Enter code 1234"
                className="mb-4"
              />
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setShowSecurityPrompt(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSecuritySubmit}>Submit</Button>
              </div>
            </Card>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};