import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your App</h1>
        <p className="text-xl text-gray-600 mb-8">Start your journey with us!</p>
        <Link to="/signup">
          <Button>Sign Up Now</Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;