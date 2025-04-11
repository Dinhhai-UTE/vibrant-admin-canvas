
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Vouchers from "./pages/Vouchers";
import AddressBook from "./pages/AddressBook";
import Banners from "./pages/Banners";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import ProductVariants from "./pages/ProductVariants";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product-variants" element={<ProductVariants />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/vouchers" element={<Vouchers />} />
            <Route path="/users" element={<Users />} />
            <Route path="/address-book" element={<AddressBook />} />
            <Route path="/banners" element={<Banners />} />
            <Route path="/analytics" element={<NotFound />} />
            <Route path="/settings" element={<NotFound />} />
            <Route path="/help" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
