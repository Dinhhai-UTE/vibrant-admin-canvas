
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
import { Image, Plus, Search, ExternalLink, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Banners = () => {
  // Sample data for demonstration
  const banners = [
    {
      id: 1,
      title: "Summer Sale",
      image: "/placeholder.svg",
      location: "Homepage Hero",
      status: "Active",
      startDate: "2025-04-01",
      endDate: "2025-05-31",
      url: "/summer-sale",
    },
    {
      id: 2,
      title: "New Collection",
      image: "/placeholder.svg",
      location: "Category Page",
      status: "Active",
      startDate: "2025-04-10",
      endDate: "2025-06-10",
      url: "/new-arrivals",
    },
    {
      id: 3,
      title: "Flash Deals",
      image: "/placeholder.svg",
      location: "Homepage Slider",
      status: "Scheduled",
      startDate: "2025-05-15",
      endDate: "2025-05-18",
      url: "/flash-deals",
    },
    {
      id: 4,
      title: "Holiday Special",
      image: "/placeholder.svg",
      location: "Product Page",
      status: "Draft",
      startDate: "2025-11-25",
      endDate: "2025-12-31",
      url: "/holiday-special",
    },
    {
      id: 5,
      title: "Brand Spotlight",
      image: "/placeholder.svg",
      location: "Category Page",
      status: "Inactive",
      startDate: "2025-03-01",
      endDate: "2025-03-31",
      url: "/brand-spotlight",
    },
  ];

  // Define table columns
  const columns = [
    {
      id: "image",
      header: "Image",
      cell: ({ row }: any) => (
        <div className="relative w-16 h-10 rounded overflow-hidden">
          <img
            src={row.original.image}
            alt={row.original.title}
            className="object-cover w-full h-full"
          />
        </div>
      ),
    },
    {
      id: "title",
      header: "Title",
      accessorKey: "title",
      cell: (props: any) => <span className="font-medium">{props.getValue()}</span>,
    },
    {
      id: "location",
      header: "Location",
      accessorKey: "location",
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (props: any) => {
        const status = props.getValue();
        let variant: "default" | "success" | "secondary" | "destructive" | "outline" = "default";
        
        switch (status) {
          case "Active":
            variant = "success";
            break;
          case "Scheduled":
            variant = "secondary";
            break;
          case "Draft":
            variant = "outline";
            break;
          case "Inactive":
            variant = "destructive";
            break;
        }
        
        return <Badge variant={variant}>{status}</Badge>;
      },
    },
    {
      id: "duration",
      header: "Duration",
      cell: ({ row }: any) => (
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {row.original.startDate}
          </span>
          <span className="text-xs text-muted-foreground flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {row.original.endDate}
          </span>
        </div>
      ),
    },
    {
      id: "url",
      header: "URL",
      accessorKey: "url",
      cell: (props: any) => (
        <div className="flex items-center">
          <span className="truncate max-w-[100px]">{props.getValue()}</span>
          <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
            <ExternalLink className="h-3 w-3" />
          </Button>
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
          <h1 className="text-3xl font-bold tracking-tight">Banners</h1>
          <p className="text-muted-foreground">
            Manage promotional banners and marketing imagery
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add New Banner</span>
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Banner Management
                </CardTitle>
                <CardDescription>
                  Create and manage promotional banners for your website
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 relative">
                <Input
                  placeholder="Search banners..."
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
                <TabsTrigger value="all">All Banners</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
            </Tabs>

            <DataTable columns={columns} data={banners} />
          </CardContent>
        </Card>
      </div>
    </BaseLayout>
  );
};

export default Banners;
