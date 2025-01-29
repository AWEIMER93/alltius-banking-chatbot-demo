import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "alex@smith.com" && password === "password") {
      toast({
        title: "Login successful",
        description: "Welcome back, Alex Smith!",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side with image and tagline */}
      <div className="w-full md:w-1/2 bg-muted p-8 flex flex-col justify-center items-center">
        <img
          src="/lovable-uploads/7cdd202b-c2ff-4b38-971e-b4d7c6fb5100.png"
          alt="Banking illustration"
          className="max-w-md w-full animate-fade-in"
        />
        <div className="mt-8 text-center">
          <h1 className="text-4xl font-bold text-primary">
            Banking, <span className="text-accent">as easy</span> as ABC.
          </h1>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <img
              src="https://gust-production.s3.amazonaws.com/uploads/startup/logo_image/1476546/Alltius-email2.png"
              alt="Alltius Bank Logo"
              className="h-12 mx-auto mb-8"
            />
            <h2 className="text-2xl font-semibold text-primary">Welcome back</h2>
            <p className="text-muted-foreground mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@smith.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>
              <a
                href="#"
                className="text-sm text-secondary hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  toast({
                    title: "Password Reset",
                    description: "Check your email for reset instructions.",
                  });
                }}
              >
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full">
              Sign in
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="#" className="text-secondary hover:underline">
                Join free today
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;