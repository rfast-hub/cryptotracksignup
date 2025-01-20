import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AuthError } from "@supabase/supabase-js";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First, create the user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        if (authError.message.includes("already registered")) {
          toast({
            variant: "destructive",
            title: "Account already exists",
            description: "Please try signing in instead, or use a different email address.",
          });
          return;
        }
        
        // Handle rate limit error
        if (authError.message.includes("rate_limit")) {
          const waitTimeMatch = authError.message.match(/after (\d+) seconds/);
          const waitTime = waitTimeMatch ? waitTimeMatch[1] : "60";
          toast({
            variant: "destructive",
            title: "Please wait",
            description: `For security purposes, please wait ${waitTime} seconds before trying again.`,
          });
          return;
        }
        
        throw authError;
      }

      if (!authData.user) {
        throw new Error("Failed to create user account");
      }

      // Get the session after signup
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        throw new Error("Failed to get session after signup");
      }

      // Now create the checkout session with the auth token
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { email },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        // Show success message about confirmation email
        toast({
          title: "Check your email",
          description: "We've sent you a confirmation email. Please verify your email before proceeding.",
        });
        // Redirect to confirmation page
        navigate("/confirmation");
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof AuthError ? error.message : "Failed to process signup. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            You'll receive a confirmation email after signing up
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Processing..." : "Sign up"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SignupPage;