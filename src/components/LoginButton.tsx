
import { GoogleLogin } from "@react-oauth/google";
import { handleGoogleLogin } from "../services/authService";
import { toast } from "@/components/ui/sonner";

const LoginButton = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <GoogleLogin 
        onSuccess={(credentialResponse) => {
          handleGoogleLogin(credentialResponse);
        }} 
        onError={() => {
          toast.error("Login Failed. Please try again.");
          console.log("Login Failed");
        }}
        useOneTap
        theme="outline"
        size="large"
        shape="rectangular"
        width={240}
      />
      <span className="text-sm text-gray-500">
        Sign in with your Google account
      </span>
    </div>
  );
};

export default LoginButton;
