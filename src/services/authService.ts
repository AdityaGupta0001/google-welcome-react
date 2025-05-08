
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

// No need for initGoogleAuth as @react-oauth/google handles it

// Handle Google OAuth response
export const handleGoogleLogin = (credentialResponse: any): void => {
  const token = credentialResponse.credential;
  
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

// Legacy function to maintain compatibility with existing code
export const initGoogleAuth = (): void => {
  console.log("Google Identity Services SDK is now managed by @react-oauth/google");
};

// Legacy function to maintain compatibility with existing code
export const loginWithGoogle = (): void => {
  console.log("Google login is now managed by @react-oauth/google");
};
