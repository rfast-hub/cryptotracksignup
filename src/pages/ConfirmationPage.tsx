import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ConfirmationPage = () => {
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