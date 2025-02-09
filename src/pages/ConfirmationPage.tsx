
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink } from "lucide-react";

const ConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const createAccount = async () => {
      // Get parameters safely
      const email = searchParams.get("email");
      const password = searchParams.get("password");

      // Validate parameters
      if (!email || !password) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid confirmation link.",
        });
        navigate("/signup");
        return;
      }

      try {
        // Add rate limiting for sign-up attempts
        const signUpAttempts = sessionStorage.getItem('signUpAttempts') || '0';
        const lastAttemptTime = sessionStorage.getItem('lastAttemptTime') || '0';
        const currentTime = Date.now();
        
        if (parseInt(signUpAttempts) >= 3 && currentTime - parseInt(lastAttemptTime) < 300000) {
          throw new Error('Too many sign-up attempts. Please try again in 5 minutes.');
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/confirmation`,
            data: {
              subscription_status: 'trialing'
            }
          }
        });

        if (error) throw error;

        // Clear URL parameters after successful signup
        navigate('/confirmation', { replace: true });

        toast({
          title: "Check your email",
          description: "We've sent you a confirmation link to complete your registration.",
        });

        // Update rate limiting data
        sessionStorage.setItem('signUpAttempts', (parseInt(signUpAttempts) + 1).toString());
        sessionStorage.setItem('lastAttemptTime', currentTime.toString());

      } catch (error) {
        console.error("Error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Failed to create account. Please try again.",
        });
        navigate("/signup");
      } finally {
        setLoading(false);
      }
    };

    createAccount();
  }, [searchParams, navigate, toast]);

  const handleRedirect = () => {
    window.location.href = "https://app.cryptotrack.org";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {loading ? "Setting up your account..." : "Check your email"}
        </h2>
        <p className="text-gray-600 mb-6">
          {loading
            ? "Please wait while we finish setting up your account."
            : "We've sent you a confirmation link to complete your registration. Please check your email and click the link to activate your account."}
        </p>
        <Button
          onClick={handleRedirect}
          className="w-full"
          disabled={loading}
        >
          Go to CryptoTrack <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </Card>
    </div>
  );
};

export default ConfirmationPage;
