import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ConfirmationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { price_id: 'price_1QTsN0E4gc3VY6FiyEmpK5eh' }
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to start checkout process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Complete Your Registration
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a confirmation email to your address. Please check your inbox and follow the instructions to confirm your account.
          </p>
        </div>
        <div className="mt-6 space-y-4">
          <Button
            className="w-full"
            onClick={handleSubscribe}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Subscribe Now"}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.location.href = 'https://app.cryptotrack.org'}
          >
            Continue to Login
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ConfirmationPage;