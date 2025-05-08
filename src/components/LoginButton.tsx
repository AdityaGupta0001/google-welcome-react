
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { loginWithGoogle } from "../services/authService";

const LoginButton = () => {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      loginWithGoogle();
    }
  }, [buttonRef]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div id="googleButton" ref={buttonRef} className="mt-4"></div>
      <span className="text-sm text-gray-500">
        Sign in with your Google account
      </span>
    </div>
  );
};

export default LoginButton;
