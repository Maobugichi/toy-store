import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Root, { HydrateFallback } from "@/routes/root";
import "./index.css";
import ProductDetails from "./components/details/details-page";
import MainPage from "./components/filterpage/main-page";
import {  QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from "./hooks/useCart";
import SignUp from "./auth/signup";
import { AuthProvider } from "./context/authContext";
import Login from "./auth/login";
import CheckoutPage from "./components/checkout/checkout";
import { queryClient } from "./lib/query-client";
import { Toaster } from "@/components/ui/sonner";
import WatchlistPage from "./components/watchlist/watchlist-page";
import AuthCallback from "./routes/authroute";





const router = createHashRouter([
  {
    path: "/signup",
    element: <SignUp />,
  },
   {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Root />,
    HydrateFallback: HydrateFallback,
  },
  {
    path: "filter",
    element: <MainPage />,
    
  },
  {
    path: "watchlist",
    element: <WatchlistPage />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path:"/auth/callback",
    element:<AuthCallback />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Toaster richColors closeButton/> 
          <RouterProvider router={router} />
         
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
