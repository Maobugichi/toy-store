import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "@/routes/root";
import "./index.css";
import ProductDetails from "./components/details/details-page";
import { filterLoader } from "./components/filterpage/filter-loader";
import MainPage from "./components/filterpage/main-page";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from "./hooks/useCart";
import SignUp from "./auth/signup";
import { AuthProvider } from "./context/authContext";
import Login from "./auth/login";
import { rootLoader } from "./routes/utils";
import CheckoutPage from "./components/checkout/checkout";

const queryClient = new QueryClient();

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
    loader:rootLoader
  },
  {
    path: "filter",
    element: <MainPage />,
    loader:filterLoader
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
