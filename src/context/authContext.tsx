import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  name: string;
  avatar_url?: string;
}

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  cartId: number | null;
  login: (data: { user: User; cartId: number; token: string }) => void;
  logout: () => void;
  getToken: () => string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cartId, setCartId] = useState<number | null>(null);

  useEffect(() => {
    // Load saved auth data on mount
    const savedAuth = localStorage.getItem("auth");
    
    if (savedAuth) {
      try {
        const { user, cartId } = JSON.parse(savedAuth);
        setUser(user);
        setCartId(cartId);
      } catch (error) {
        console.error("Failed to parse auth data:", error);
        localStorage.removeItem("auth");
      }
    }
  }, []);

  const login = (data: { user: User; cartId: number; token: string }) => {
    setUser(data.user);
    setCartId(data.cartId);
    
    // Store user and cartId separately from token for security
    localStorage.setItem("auth", JSON.stringify({ 
      user: data.user, 
      cartId: data.cartId 
    }));
    
    // Store token separately (used by axios interceptor)
    localStorage.setItem("authToken", data.token);
  };

  const logout = () => {
    setUser(null);
    setCartId(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("authToken");
  };

  const getToken = (): string | null => {
    return localStorage.getItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, cartId, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};