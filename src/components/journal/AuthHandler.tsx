import { useState, useEffect } from "react";
import axios from "axios";

interface AuthHandlerProps {
  children: React.ReactNode;
}

const AuthHandler = ({ children }: AuthHandlerProps) => {
  const [isAuthResolved, setIsAuthResolved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performHandshake = async () => {
      // Check for existing session
      const existingUserId = sessionStorage.getItem("user_id");
      if (existingUserId) {
        setIsAuthResolved(true);
        return;
      }

      // Phase 7: Step 1 — Extract Token
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        // Phase 7: Step 4 — Failure Handling
        window.location.href = "/identity_journal/token";
        return;
      }

      try {
        // Phase 7: Step 2 — Validate Token
        const response = await axios.post("/api/validate-token", { token });
        
        // Phase 7: Step 3 — Handle Success
        if (response.data.user_id) {
          sessionStorage.setItem("user_id", response.data.user_id);
          
          // Remove token from URL
          const url = new URL(window.location.href);
          url.searchParams.delete("token");
          window.history.replaceState({}, "", url.pathname);
          
          setIsAuthResolved(true);
        } else {
          throw new Error("Invalid response");
        }
      } catch (err) {
        console.error("Authentication failed:", err);
        // Phase 7: Step 4 — Failure Handling
        window.location.href = "/identity_journal/token";
      }
    };

    performHandshake();
  }, []);

  // Phase 8: UI Blocking During Handshake
  if (!isAuthResolved) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium">Authenticating...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthHandler;
