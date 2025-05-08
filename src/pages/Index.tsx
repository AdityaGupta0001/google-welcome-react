
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import { getAuthState } from "../services/authService";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = getAuthState();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome</h1>
        <p className="text-gray-600 text-center mb-8">
          Sign in with Google to access your dashboard
        </p>
        
        <div className="flex justify-center">
          <LoginButton />
        </div>
        
        <div className="mt-8 text-center">
          <h2 className="text-lg font-medium mb-2">Features</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>🔒 Secure authentication with Google OAuth 2.0</li>
            <li>👤 Protected pages for authenticated users</li>
            <li>🔑 Access token management</li>
            <li>📱 Responsive design for all devices</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
