
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  Bar, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { productService } from "@/services/productService";
import { orderService } from "@/services/orderService";
import { userService } from "@/services/userService";
import BaseLayout from "@/components/layout/BaseLayout";
import { 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Dashboard: React.FC = () => {
  const { data: productsData } = useQuery({
    queryKey: ["products-dashboard"],
    queryFn: () => productService.getProducts({ limit: 100 }),
  });
  
  const { data: ordersData } = useQuery({
    queryKey: ["orders-dashboard"],
    queryFn: () => orderService.getOrders({ limit: 100 }),
  });
  
  const { data: usersData } = useQuery({
    queryKey: ["users-dashboard"],
    queryFn: () => userService.getUsers({ limit: 100 }),
  });
  
  // Process data for category distribution chart
  const categoryData = React.useMemo(() => {
    if (!productsData?.products) return [];
    
    const categories: { [key: string]: number } = {};
    
    productsData.products.forEach((product) => {
      if (categories[product.category]) {
        categories[product.category]++;
      } else {
        categories[product.category] = 1;
      }
    });
    
    return Object.entries(categories).map(([name, value]) => ({
      name,
      value,
    }));
  }, [productsData]);
  
  // Process data for monthly sales chart
  const salesData = React.useMemo(() => {
    if (!ordersData?.carts) return [];
    
    const months: { [key: string]: number } = {
      Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
      Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0
    };
    
    ordersData.carts.forEach((order) => {
      if (order.date) {
        const date = new Date(order.date);
        const month = date.toLocaleString('default', { month: 'short' });
        months[month] += order.discountedTotal;
      }
    });
    
    return Object.entries(months).map(([month, sales]) => ({
      month,
      sales: sales || 0,
    }));
  }, [ordersData]);
  
  // Calculate summary stats
  const totalRevenue = React.useMemo(() => {
    if (!ordersData?.carts) return 0;
    return ordersData.carts.reduce((sum, order) => sum + order.discountedTotal, 0);
  }, [ordersData]);
  
  const totalProducts = React.useMemo(() => {
    return productsData?.total || 0;
  }, [productsData]);
  
  const totalOrders = React.useMemo(() => {
    return ordersData?.total || 0;
  }, [ordersData]);
  
  const totalUsers = React.useMemo(() => {
    return usersData?.total || 0;
  }, [usersData]);
  
  return (
    <BaseLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your dashboard</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <div className={cn(
                  "flex items-center mr-2",
                  "text-green-500"
                )}>
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>12.5%</span>
                </div>
                <div className="text-muted-foreground">vs last month</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{totalOrders}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <div className={cn(
                  "flex items-center mr-2",
                  "text-green-500"
                )}>
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>8.2%</span>
                </div>
                <div className="text-muted-foreground">vs last month</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold">{totalProducts}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Package className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <div className={cn(
                  "flex items-center mr-2",
                  "text-red-500"
                )}>
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  <span>3.1%</span>
                </div>
                <div className="text-muted-foreground">vs last month</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{totalUsers}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <div className={cn(
                  "flex items-center mr-2",
                  "text-green-500"
                )}>
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>5.7%</span>
                </div>
                <div className="text-muted-foreground">vs last month</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="md:col-span-1 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Monthly Sales</CardTitle>
              <CardDescription>Revenue generated each month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Revenue']}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Bar 
                    dataKey="sales" 
                    name="Revenue" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-1 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Product Categories</CardTitle>
              <CardDescription>Distribution by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [value, 'Products']}
                    labelFormatter={(index) => categoryData[index]?.name || ''}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Dashboard;
