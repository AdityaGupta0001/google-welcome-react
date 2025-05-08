
// Google OAuth configuration
const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // Replace with your actual Google Client ID
const REDIRECT_URI = window.location.origin;

// Auth state
interface AuthState {
  isAuthenticated: boolean;
  user: any;
  accessToken: string | null;
}

// Initial auth state
const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
};

// Load auth state from localStorage
const loadAuthState = (): AuthState => {
  const savedAuth = localStorage.getItem("auth");
  if (savedAuth) {
    try {
      const parsedAuth = JSON.parse(savedAuth);
      // Check if token is expired (simplified)
      return parsedAuth;
    } catch (e) {
      // Invalid saved state
      localStorage.removeItem("auth");
    }
  }
  return initialAuthState;
};

// Save auth state to localStorage
const saveAuthState = (authState: AuthState): void => {
  localStorage.setItem("auth", JSON.stringify(authState));
};

// Get current auth state
export const getAuthState = (): AuthState => {
  return loadAuthState();
};

// Initialize Google OAuth
export const initGoogleAuth = (): void => {
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
  
  window.addEventListener("load", () => {
    if (window.google?.accounts) {
      console.log("Google Identity Services SDK loaded");
    }
  });
};

// Handle Google OAuth login
export const loginWithGoogle = (): void => {
  if (!window.google) {
    console.error("Google Identity Services SDK not loaded");
    return;
  }
  
  window.google.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback: handleCredentialResponse,
    auto_select: false,
    cancel_on_tap_outside: true,
  });
  
  window.google.accounts.id.renderButton(
    document.getElementById("googleButton")!,
    { theme: "outline", size: "large", width: 240 }
  );
  
  window.google.accounts.id.prompt();
};

// Handle Google OAuth response
const handleCredentialResponse = (response: any): void => {
  const token = response.credential;
  
  // Decode the JWT to get user info
  const payload = decodeJwtPayload(token);
  
  const authState: AuthState = {
    isAuthenticated: true,
    user: {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    },
    accessToken: token,
  };
  
  saveAuthState(authState);
  window.location.href = "/dashboard";
};

// Decode JWT payload
const decodeJwtPayload = (token: string): any => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error decoding token", e);
    return {};
  }
};

// Logout user
export const logout = (): void => {
  localStorage.removeItem("auth");
  window.location.href = "/";
};

// Type declaration for Google Identity Services
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, options: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}
