import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SignupForm } from "@/components/auth/SignupForm";
import { getAuthErrorMessage } from "@/utils/auth-error";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (email: string, password: string) => {
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        toast({
          variant: "destructive",
          title: "Error",
          description: getAuthErrorMessage(authError),
        });
        return;
      }

      if (!authData.user) {
        throw new Error("Failed to create user account");
      }

      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        throw new Error("Failed to get session after signup");
      }

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
        toast({
          title: "Check your email",
          description: "We've sent you a confirmation email. Please verify your email before proceeding.",
        });
        navigate("/confirmation");
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: getAuthErrorMessage(error),
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
        <SignupForm onSubmit={handleSignup} isLoading={loading} />
      </Card>
    </div>
  );
};

export default SignupPage;