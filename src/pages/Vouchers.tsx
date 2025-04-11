
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import BaseLayout from "@/components/layout/BaseLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/DataTable/DataTable";
import { Badge } from "@/components/ui/badge";
import { Ticket, Plus, Search, PercentCircle } from "lucide-react";

const Vouchers = () => {
  // Sample data for demonstration
  const vouchers = [
    { id: 1, code: "SUMMER25", discount: "25%", type: "Percentage", status: "Active", validUntil: "2025-06-30", usageLimit: 100, usageCount: 45 },
    { id: 2, code: "WELCOME10", discount: "10%", type: "Percentage", status: "Active", validUntil: "2025-12-31", usageLimit: 1000, usageCount: 568 },
    { id: 3, code: "FREESHIP", discount: "$15", type: "Fixed Amount", status: "Active", validUntil: "2025-05-15", usageLimit: 500, usageCount: 324 },
    { id: 4, code: "FLASH50", discount: "50%", type: "Percentage", status: "Inactive", validUntil: "2025-03-01", usageLimit: 200, usageCount: 200 },
    { id: 5, code: "LOYALTY20", discount: "20%", type: "Percentage", status: "Active", validUntil: "2025-08-01", usageLimit: 900, usageCount: 312 },
  ];

  // Define table columns
  const columns = [
    {
      header: "Code",
      accessorKey: "code",
      cell: (props: any) => <span className="font-mono font-medium">{props.getValue()}</span>,
    },
    {
      header: "Discount",
      accessorKey: "discount",
      cell: (props: any) => <span className="font-medium">{props.getValue()}</span>,
    },
    {
      header: "Type",
      accessorKey: "type",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (props: any) => (
        <Badge variant={props.getValue() === "Active" ? "success" : "secondary"}>
          {props.getValue()}
        </Badge>
      ),
    },
    {
      header: "Valid Until",
      accessorKey: "validUntil",
    },
    {
      header: "Usage",
      accessorKey: "usageCount",
      cell: (props: any) => (
        <span className="font-medium">
          {props.getValue()}/{props.row.original.usageLimit}
        </span>
      ),
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
          <h1 className="text-3xl font-bold tracking-tight">Vouchers</h1>
          <p className="text-muted-foreground">
            Manage discount vouchers and promotional codes
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add New Voucher</span>
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Ticket className="h-5 w-5" />
                  Voucher Management
                </CardTitle>
                <CardDescription>
                  Create and manage discount vouchers for your store
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 relative">
                <Input
                  placeholder="Search vouchers..."
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
                <TabsTrigger value="all">All Vouchers</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
                <TabsTrigger value="expired">Expired</TabsTrigger>
              </TabsList>
            </Tabs>

            <DataTable columns={columns} data={vouchers} />
          </CardContent>
        </Card>
      </div>
    </BaseLayout>
  );
};

export default Vouchers;
