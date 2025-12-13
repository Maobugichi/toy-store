import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "@/routes/root";
import { HydrateFallback } from "@/ui/atoms/hydrateFallback";
import "./index.css";
import ProductDetailsPage from "./pages/productDetails";
import MainPage from "@/pages/products";
import {  QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from "@/hooks/useCart";
import SignUp from "@/pages/auth/signup";
import { AuthProvider } from "@/context/authContext";
import Login from "@/pages/auth/login";
import CheckoutPage from "./pages/checkout";
import { queryClient } from "@/lib/query-client";
import { Toaster } from "@/components/ui/sonner";
import WatchlistPage from "@/pages/wishlist/watchlist-page";
import AuthCallback from "./features/auth/context/authCallback";
import { productsQueryOptions } from "./features/products/services/fetchProduts";
import { FilterContextProvider } from "./features/products/hooks/useProductFilters";

queryClient.prefetchQuery(productsQueryOptions);

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
    loader: async () => {
      await queryClient.ensureQueryData(productsQueryOptions);
      return null;
    }
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
    element: <ProductDetailsPage />,
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
       <FilterContextProvider>
        <CartProvider>
          <Toaster richColors closeButton/> 
          <RouterProvider router={router} />
        </CartProvider>
      </FilterContextProvider>  
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
