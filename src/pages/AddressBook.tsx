
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BaseLayout from "@/components/layout/BaseLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/DataTable/DataTable";
import { Badge } from "@/components/ui/badge";
import { Contact, Plus, Search, Users, Mail, Phone, MapPin } from "lucide-react";

const AddressBook = () => {
  // Sample data for demonstration
  const addresses = [
    { 
      id: 1, 
      name: "John Doe", 
      email: "john.doe@example.com", 
      phone: "+1 (555) 123-4567", 
      city: "New York", 
      district: "Manhattan",
      ward: "Midtown",
      address: "123 Broadway St, Apt 45",
      isDefault: true,
      type: "Home"
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "jane.smith@example.com", 
      phone: "+1 (555) 987-6543", 
      city: "Los Angeles", 
      district: "Hollywood",
      ward: "West Hollywood",
      address: "456 Sunset Blvd, Unit 7",
      isDefault: false,
      type: "Work"
    },
    { 
      id: 3, 
      name: "Robert Johnson", 
      email: "robert.j@example.com", 
      phone: "+1 (555) 456-7890", 
      city: "Chicago", 
      district: "Loop",
      ward: "Downtown",
      address: "789 Michigan Ave, Suite 12",
      isDefault: false,
      type: "Home"
    },
    { 
      id: 4, 
      name: "Sarah Williams", 
      email: "sarah.w@example.com", 
      phone: "+1 (555) 789-0123", 
      city: "San Francisco", 
      district: "Mission",
      ward: "Mission District",
      address: "101 Valencia St, Apt 3B",
      isDefault: false,
      type: "Shipping"
    },
    { 
      id: 5, 
      name: "Michael Brown", 
      email: "michael.b@example.com", 
      phone: "+1 (555) 321-6547", 
      city: "Boston", 
      district: "Back Bay",
      ward: "Copley Square",
      address: "222 Newbury St, Floor 3",
      isDefault: false,
      type: "Billing"
    },
  ];

  // Define table columns
  const columns = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      cell: (props: any) => <span className="font-medium">{props.getValue()}</span>,
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "email",
      cell: (props: any) => (
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span>{props.getValue()}</span>
        </div>
      ),
    },
    {
      id: "phone",
      header: "Phone",
      accessorKey: "phone",
      cell: (props: any) => (
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span>{props.getValue()}</span>
        </div>
      ),
    },
    {
      id: "location",
      header: "Location",
      accessorKey: "city",
      cell: (props: any) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>
            {props.getValue()}, {props.row.original.district}
          </span>
        </div>
      ),
    },
    {
      id: "type",
      header: "Type",
      accessorKey: "type",
      cell: (props: any) => <span>{props.getValue()}</span>,
    },
    {
      id: "isDefault",
      header: "Status",
      accessorKey: "isDefault",
      cell: ({ row }: any) => (
        <Badge variant={row.original.isDefault ? "success" : "secondary"}>
          {row.original.isDefault ? "Default" : "Regular"}
        </Badge>
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
          <h1 className="text-3xl font-bold tracking-tight">Address Book</h1>
          <p className="text-muted-foreground">
            Manage customer and business contact information
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add New Address</span>
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Contact className="h-5 w-5" />
                  Contact Management
                </CardTitle>
                <CardDescription>
                  View and manage your saved addresses and contact information
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 relative">
                <Input
                  placeholder="Search addresses..."
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
                <TabsTrigger value="all">All Addresses</TabsTrigger>
                <TabsTrigger value="home">Home</TabsTrigger>
                <TabsTrigger value="work">Work</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>
            </Tabs>

            <DataTable columns={columns} data={addresses} />
          </CardContent>
        </Card>
      </div>
    </BaseLayout>
  );
};

export default AddressBook;
