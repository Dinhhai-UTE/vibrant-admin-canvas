
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BaseLayout from "@/components/layout/BaseLayout";
import { DataTable } from "@/components/DataTable/DataTable";
import { Package, Plus, Search, Box, ShoppingBag, CircleDollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ProductVariants = () => {
  // Sample data for demonstration
  const variants = [
    {
      id: 1,
      product: "iPhone 14",
      sku: "IPH14-128-BLK",
      variant: "128GB / Black",
      price: 799,
      stock: 45,
      status: "In Stock",
    },
    {
      id: 2,
      product: "iPhone 14",
      sku: "IPH14-128-WHT",
      variant: "128GB / White",
      price: 799,
      stock: 32,
      status: "In Stock",
    },
    {
      id: 3,
      product: "iPhone 14",
      sku: "IPH14-256-BLK",
      variant: "256GB / Black",
      price: 899,
      stock: 18,
      status: "In Stock",
    },
    {
      id: 4,
      product: "MacBook Pro",
      sku: "MBP-13-8-256-SPC",
      variant: "13\" / 8GB / 256GB / Space Gray",
      price: 1299,
      stock: 12,
      status: "Low Stock",
    },
    {
      id: 5,
      product: "MacBook Pro",
      sku: "MBP-13-16-512-SPC",
      variant: "13\" / 16GB / 512GB / Space Gray",
      price: 1699,
      stock: 0,
      status: "Out of Stock",
    },
    {
      id: 6,
      product: "AirPods Pro",
      sku: "APP-2-WHT",
      variant: "2nd Gen / White",
      price: 249,
      stock: 56,
      status: "In Stock",
    },
  ];

  // Define table columns
  const columns = [
    {
      header: "Product",
      accessorKey: "product",
      cell: (props: any) => <span className="font-medium">{props.getValue()}</span>,
    },
    {
      header: "SKU",
      accessorKey: "sku",
      cell: (props: any) => <span className="font-mono text-xs">{props.getValue()}</span>,
    },
    {
      header: "Variant",
      accessorKey: "variant",
    },
    {
      header: "Price",
      accessorKey: "price",
      cell: (props: any) => (
        <div className="font-medium flex items-center">
          <CircleDollarSign className="h-3 w-3 mr-1 text-muted-foreground" />
          ${props.getValue()}.00
        </div>
      ),
    },
    {
      header: "Stock",
      accessorKey: "stock",
      cell: (props: any) => (
        <span className="font-medium">{props.getValue()}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (props: any) => {
        const status = props.getValue();
        let variant: "default" | "success" | "secondary" | "destructive" | "outline" = "default";
        
        switch (status) {
          case "In Stock":
            variant = "success";
            break;
          case "Low Stock":
            variant = "secondary";
            break;
          case "Out of Stock":
            variant = "destructive";
            break;
        }
        
        return <Badge variant={variant}>{status}</Badge>;
      },
    },
    {
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
            Manage product variants, options, and stock levels
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
                  View and manage product variants, colors, sizes, and other attributes
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
            <DataTable columns={columns} data={variants} />
          </CardContent>
        </Card>
      </div>
    </BaseLayout>
  );
};

export default ProductVariants;
