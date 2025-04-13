
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BaseLayout from "@/components/layout/BaseLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/DataTable/DataTable";
import { Badge } from "@/components/ui/badge";
import { Image, Plus, Search, Monitor, Link, Calendar } from "lucide-react";

const Banners = () => {
  // Sample data for demonstration
  const banners = [
    { 
      id: 1, 
      title: "Summer Sale", 
      image: "/placeholder.svg", 
      url: "/summer-sale",
      position: "Homepage Hero",
      startDate: "2025-06-01",
      endDate: "2025-06-30",
      status: "Active",
      clicks: 1245
    },
    { 
      id: 2, 
      title: "Back to School", 
      image: "/placeholder.svg", 
      url: "/back-to-school",
      position: "Category Page",
      startDate: "2025-08-15",
      endDate: "2025-09-15",
      status: "Scheduled",
      clicks: 0
    },
    { 
      id: 3, 
      title: "Holiday Special", 
      image: "/placeholder.svg", 
      url: "/holiday-special",
      position: "Homepage Slider",
      startDate: "2025-12-01",
      endDate: "2025-12-31",
      status: "Scheduled",
      clicks: 0
    },
    { 
      id: 4, 
      title: "New Arrivals", 
      image: "/placeholder.svg", 
      url: "/new-arrivals",
      position: "Homepage Banner",
      startDate: "2025-05-01",
      endDate: "2025-05-30",
      status: "Active",
      clicks: 876
    },
    { 
      id: 5, 
      title: "Spring Collection", 
      image: "/placeholder.svg", 
      url: "/spring-collection",
      position: "Product Page",
      startDate: "2025-03-01",
      endDate: "2025-03-31",
      status: "Ended",
      clicks: 2453
    },
  ];

  // Define table columns
  const columns = [
    {
      id: "image",
      header: "Banner",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-md">
            <img 
              src={row.original.image} 
              alt={row.original.title} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{row.original.title}</p>
            <p className="text-xs text-muted-foreground">{row.original.position}</p>
          </div>
        </div>
      ),
    },
    {
      id: "link",
      header: "Link",
      accessorKey: "url",
      cell: (props: any) => (
        <div className="flex items-center gap-2">
          <Link className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-mono">{props.getValue()}</span>
        </div>
      ),
    },
    {
      id: "dateRange",
      header: "Date Range",
      accessorKey: "startDate",
      cell: (props: any) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            {props.getValue()} to {props.row.original.endDate}
          </span>
        </div>
      ),
    },
    {
      id: "clicks",
      header: "Clicks",
      accessorKey: "clicks",
      cell: (props: any) => <span className="font-medium">{props.getValue().toLocaleString()}</span>,
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (props: any) => {
        const status = props.getValue();
        let variant: "success" | "secondary" | "default" = "default";
        
        if (status === "Active") variant = "success";
        else if (status === "Scheduled") variant = "secondary";
        
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
          <h1 className="text-3xl font-bold tracking-tight">Banners</h1>
          <p className="text-muted-foreground">
            Manage promotional banners and advertisements
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
                  Create and manage promotional banners for your store
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
                <TabsTrigger value="ended">Ended</TabsTrigger>
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
