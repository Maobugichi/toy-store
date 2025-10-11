
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  name: string;
  avatar_url?: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  cartId: number | null;
  login: (data: { user: any; token: string; cartId: number }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cartId, setCartId] = useState<number | null>(null);

   useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved) {
      const { user, cartId } = JSON.parse(saved);
      setUser(user);
      setCartId(cartId);
    }
  }, []);
  
  const login = (data: { user: any; cartId: number }) => {
    setUser(data.user);
    setCartId(data.cartId);
    localStorage.setItem("auth", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    setCartId(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, cartId , login , logout }}>
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
