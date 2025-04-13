
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
import { Award, Plus, Search, ExternalLink, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Brands = () => {
  // Sample data for demonstration
  const brands = [
    {
      id: 1,
      name: "Apple",
      logo: "/placeholder.svg",
      productsCount: 42,
      status: "Active",
      featured: true,
      website: "https://apple.com",
    },
    {
      id: 2,
      name: "Samsung",
      logo: "/placeholder.svg",
      productsCount: 56,
      status: "Active",
      featured: true,
      website: "https://samsung.com",
    },
    {
      id: 3,
      name: "Nike",
      logo: "/placeholder.svg",
      productsCount: 87,
      status: "Active",
      featured: true,
      website: "https://nike.com",
    },
    {
      id: 4,
      name: "Adidas",
      logo: "/placeholder.svg",
      productsCount: 65,
      status: "Active",
      featured: false,
      website: "https://adidas.com",
    },
    {
      id: 5,
      name: "Sony",
      logo: "/placeholder.svg",
      productsCount: 29,
      status: "Active",
      featured: false,
      website: "https://sony.com",
    },
    {
      id: 6,
      name: "LG",
      logo: "/placeholder.svg",
      productsCount: 18,
      status: "Inactive",
      featured: false,
      website: "https://lg.com",
    },
  ];

  // Define table columns
  const columns = [
    {
      id: "logo",
      header: "Logo",
      cell: ({ row }: any) => (
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted flex items-center justify-center">
          <img
            src={row.original.logo}
            alt={row.original.name}
            className="object-cover w-full h-full"
          />
        </div>
      ),
    },
    {
      id: "name",
      header: "Brand Name",
      accessorKey: "name",
      cell: (props: any) => <span className="font-medium">{props.getValue()}</span>,
    },
    {
      id: "productsCount",
      header: "Products",
      accessorKey: "productsCount",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-1">
          <ShoppingBag className="h-3 w-3" />
          <span>{row.original.productsCount}</span>
        </div>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (props: any) => (
        <Badge variant={props.getValue() === "Active" ? "success" : "secondary"}>
          {props.getValue()}
        </Badge>
      ),
    },
    {
      id: "featured",
      header: "Featured",
      accessorKey: "featured",
      cell: (props: any) => (
        <div className="flex justify-center">
          {props.getValue() ? (
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
              className="h-5 w-5 text-primary"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
        </div>
      ),
    },
    {
      id: "website",
      header: "Website",
      accessorKey: "website",
      cell: (props: any) => (
        <div className="flex items-center">
          <a
            href={props.getValue()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center"
          >
            <span className="truncate max-w-[120px]">{props.getValue()}</span>
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
      ),
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
          <h1 className="text-3xl font-bold tracking-tight">Brands</h1>
          <p className="text-muted-foreground">
            Manage product brands and manufacturers
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add New Brand</span>
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Brand Management
                </CardTitle>
                <CardDescription>
                  Create and manage product brands and vendors
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 relative">
                <Input
                  placeholder="Search brands..."
                  className="w-[250px]"
                />
                <Button size="icon" variant="ghost" className="absolute right-2">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={brands} />
          </CardContent>
        </Card>
      </div>
    </BaseLayout>
  );
};

export default Brands;
