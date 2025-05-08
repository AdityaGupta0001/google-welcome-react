
import { useEffect } from "react";
import { getAuthState } from "../services/authService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const { user } = getAuthState();

  useEffect(() => {
    document.title = `Dashboard | Welcome ${user?.name || "User"}`;
  }, [user]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {user?.name}!</CardTitle>
            <CardDescription>
              You've successfully logged in with Google OAuth 2.0
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <img 
                src={user?.picture} 
                alt="Profile" 
                className="w-16 h-16 rounded-full"
              />
              <div>
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Authentication Details</CardTitle>
            <CardDescription>
              Technical information about your session
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-medium">User ID:</p>
              <p className="text-xs text-gray-500 break-all">{user?.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Access Token:</p>
              <p className="text-xs text-gray-500">
                {getAuthState().accessToken ? 
                  `${getAuthState().accessToken?.substring(0, 20)}...` : 
                  "No token available"}
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Your session is securely stored and will persist until you log out.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
