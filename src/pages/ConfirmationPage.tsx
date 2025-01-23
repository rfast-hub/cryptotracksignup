import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";

const ConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const createAccount = async () => {
      const email = searchParams.get('email');
      const password = searchParams.get('password');

      if (email && password) {
        try {
          const { error } = await supabase.functions.invoke('create-account', {
            body: { email, password }
          });

          if (error) throw error;
        } catch (err: any) {
          console.error('Error creating account:', err);
          setError(err.message);
        }
      }
      setLoading(false);
    };

    createAccount();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md space-y-8 p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Setting up your account...
            </h2>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md space-y-8 p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Error
            </h2>
            <Alert className="mt-4">
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Check your email
          </h2>
          <Alert className="mt-4">
            <AlertDescription>
              We've sent a confirmation email to your address. Please check your inbox and follow the instructions to confirm your email before proceeding to login.
            </AlertDescription>
          </Alert>
        </div>
        <div className="mt-6">
          <Button
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