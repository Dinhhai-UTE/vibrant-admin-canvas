
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BaseLayout from "@/components/layout/BaseLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/DataTable/DataTable";
import { Badge } from "@/components/ui/badge";
import { Box, Plus, Search, Tag, ShoppingBag, DollarSign, BarChart } from "lucide-react";

const ProductVariants = () => {
  // Sample data for demonstration
  const variants = [
    { 
      id: 1, 
      product: "Classic T-Shirt", 
      sku: "TST-BLK-M", 
      variant: "Black / Medium",
      price: 24.99,
      stock: 45,
      status: "In Stock"
    },
    { 
      id: 2, 
      product: "Classic T-Shirt", 
      sku: "TST-BLK-L", 
      variant: "Black / Large",
      price: 24.99,
      stock: 32,
      status: "In Stock"
    },
    { 
      id: 3, 
      product: "Classic T-Shirt", 
      sku: "TST-WHT-M", 
      variant: "White / Medium",
      price: 24.99,
      stock: 0,
      status: "Out of Stock"
    },
    { 
      id: 4, 
      product: "Denim Jeans", 
      sku: "DNM-BLU-30", 
      variant: "Blue / 30",
      price: 59.99,
      stock: 12,
      status: "Low Stock"
    },
    { 
      id: 5, 
      product: "Denim Jeans", 
      sku: "DNM-BLK-32", 
      variant: "Black / 32",
      price: 59.99,
      stock: 28,
      status: "In Stock"
    },
  ];

  // Define table columns
  const columns = [
    {
      id: "product",
      header: "Product",
      accessorKey: "product",
      cell: (props: any) => (
        <div className="flex flex-col">
          <span className="font-medium">{props.getValue()}</span>
          <span className="text-xs text-muted-foreground">{props.row.original.variant}</span>
        </div>
      ),
    },
    {
      id: "sku",
      header: "SKU",
      accessorKey: "sku",
      cell: (props: any) => (
        <span className="font-mono text-sm">{props.getValue()}</span>
      ),
    },
    {
      id: "price",
      header: "Price",
      accessorKey: "price",
      cell: (props: any) => (
        <div className="flex items-center gap-1">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{props.getValue().toFixed(2)}</span>
        </div>
      ),
    },
    {
      id: "stock",
      header: "Stock",
      accessorKey: "stock",
      cell: (props: any) => (
        <div className="flex items-center gap-1">
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          <span>{props.getValue()}</span>
        </div>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (props: any) => {
        const status = props.getValue();
        let variant: "success" | "destructive" | "secondary" | "default" = "default";
        
        if (status === "In Stock") variant = "success";
        else if (status === "Out of Stock") variant = "destructive";
        else if (status === "Low Stock") variant = "secondary";
        
        return (
          <Badge variant={variant}>
            {status}
          </Badge>
        );
      }
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <span className="sr-only">Edit</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
              <path d="m15 5 4 4"></path>
            </svg>
          </Button>
          <Button variant="ghost" size="icon">
            <span className="sr-only">Delete</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <BaseLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Variants</h1>
          <p className="text-muted-foreground">
            Manage product variations, SKUs, and inventory
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add New Variant</span>
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Box className="h-5 w-5" />
                  Variant Management
                </CardTitle>
                <CardDescription>
                  Create and manage product variations, SKUs, and inventory
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 relative">
                <Input
                  placeholder="Search variants..."
                  className="w-[250px]"
                />
                <Button size="icon" variant="ghost" className="absolute right-2">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="mb-6">
              <TabsList>
                <TabsTrigger value="all">All Variants</TabsTrigger>
                <TabsTrigger value="in-stock">In Stock</TabsTrigger>
                <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
                <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
              </TabsList>
            </Tabs>

            <DataTable columns={columns} data={variants} />
          </CardContent>
        </Card>
      </div>
    </BaseLayout>
  );
};

export default ProductVariants;
