
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const ConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clear sensitive data from URL after reading
    const email = searchParams.get("email");
    const password = searchParams.get("password");
    
    // Remove sensitive parameters from URL
    if (email || password) {
      const cleanParams = new URLSearchParams();
      searchParams.forEach((value, key) => {
        if (key !== 'email' && key !== 'password') {
          cleanParams.append(key, value);
        }
      });
      window.history.replaceState({}, '', 
        `${window.location.pathname}${cleanParams.toString() ? '?' + cleanParams.toString() : ''}`
      );
    }

    const createAccount = async () => {
      if (!email || !password) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Missing required information.",
        });
        navigate("/signup");
        return;
      }

      try {
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

        toast({
          title: "Check your email",
          description: "We've sent you a confirmation link to complete your registration.",
        });
      } catch (error) {
        console.error("Error creating account:", error);  // Keep error details for debugging
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Failed to create account. Please try again.", // Show specific error message
        });
        navigate("/signup");
      } finally {
        setLoading(false);
      }
    };

    createAccount();
  }, [searchParams, navigate, toast]);

  const handleContinue = () => {
    // Sanitize the URL before redirecting
    const targetUrl = new URL("https://app.cryptotrack.org");
    window.location.href = targetUrl.toString();
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
        {!loading && (
          <Button 
            onClick={handleContinue}
            className="w-full"
          >
            Continue to Login
          </Button>
        )}
      </Card>
    </div>
  );
};

export default ConfirmationPage;
