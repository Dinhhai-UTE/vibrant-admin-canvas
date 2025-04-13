
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
import { FolderTree, Plus, Search, Tag, FolderOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Categories = () => {
  // Sample data for demonstration
  const categories = [
    {
      id: 1,
      name: "Electronics",
      slug: "electronics",
      parent: null,
      productsCount: 124,
      status: "Active",
      featured: true,
    },
    {
      id: 2,
      name: "Smartphones",
      slug: "smartphones",
      parent: "Electronics",
      productsCount: 45,
      status: "Active",
      featured: true,
    },
    {
      id: 3,
      name: "Laptops",
      slug: "laptops",
      parent: "Electronics",
      productsCount: 38,
      status: "Active",
      featured: false,
    },
    {
      id: 4,
      name: "Clothing",
      slug: "clothing",
      parent: null,
      productsCount: 215,
      status: "Active",
      featured: true,
    },
    {
      id: 5,
      name: "Men's Apparel",
      slug: "mens-apparel",
      parent: "Clothing",
      productsCount: 87,
      status: "Active",
      featured: true,
    },
    {
      id: 6,
      name: "Women's Apparel",
      slug: "womens-apparel",
      parent: "Clothing",
      productsCount: 128,
      status: "Active",
      featured: true,
    },
    {
      id: 7,
      name: "Home & Kitchen",
      slug: "home-kitchen",
      parent: null,
      productsCount: 156,
      status: "Active",
      featured: false,
    },
    {
      id: 8,
      name: "Seasonal",
      slug: "seasonal",
      parent: null,
      productsCount: 42,
      status: "Inactive",
      featured: false,
    },
  ];

  // Define table columns
  const columns = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          {row.original.parent ? (
            <div className="ml-4 flex items-center">
              <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="font-medium">{row.original.name}</span>
            </div>
          ) : (
            <div className="flex items-center">
              <FolderOpen className="h-4 w-4 mr-2 text-primary" />
              <span className="font-bold">{row.original.name}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "slug",
      header: "Slug",
      accessorKey: "slug",
      cell: (props: any) => <span className="font-mono text-xs">{props.getValue()}</span>,
    },
    {
      id: "parent",
      header: "Parent",
      accessorKey: "parent",
      cell: (props: any) => (
        <span className="text-muted-foreground">
          {props.getValue() || "—"}
        </span>
      ),
    },
    {
      id: "productsCount",
      header: "Products",
      accessorKey: "productsCount",
      cell: (props: any) => <Badge variant="outline">{props.getValue()}</Badge>,
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
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Manage product categories and collections
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add New Category</span>
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FolderTree className="h-5 w-5" />
                  Category Management
                </CardTitle>
                <CardDescription>
                  Create and organize product categories and collections
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 relative">
                <Input
                  placeholder="Search categories..."
                  className="w-[250px]"
                />
                <Button size="icon" variant="ghost" className="absolute right-2">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={categories} />
          </CardContent>
        </Card>
      </div>
    </BaseLayout>
  );
};

export default Categories;
