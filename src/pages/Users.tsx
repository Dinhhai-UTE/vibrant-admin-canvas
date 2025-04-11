
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DataTable, Column } from "@/components/DataTable/DataTable";
import { User, userService } from "@/services/userService";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ConfirmDialog from "@/components/ConfirmDialog";
import BaseLayout from "@/components/layout/BaseLayout";
import { Badge } from "@/components/ui/badge";

type UserFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
  password?: string;
};

const Users: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [dialogMode, setDialogMode] = useState<"add" | "edit" | "view">("add");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<UserFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      phone: "",
      password: "",
    },
  });
  
  const { data, isLoading } = useQuery({
    queryKey: ["users", { page, pageSize, search }],
    queryFn: () => 
      userService.getUsers({
        skip: (page - 1) * pageSize,
        limit: pageSize,
        search: search || undefined,
      }),
  });
  
  const createMutation = useMutation({
    mutationFn: (userData: any) => userService.createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsDialogOpen(false);
      toast({
        title: "User created",
        description: "The user has been added successfully",
      });
      form.reset();
    },
  });
  
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<User> }) =>
      userService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsDialogOpen(false);
      toast({
        title: "User updated",
        description: "The user has been updated successfully",
      });
    },
  });
  
  const deleteMutation = useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsDeleteDialogOpen(false);
      toast({
        title: "User deleted",
        description: "The user has been deleted successfully",
      });
    },
  });
  
  const handleAdd = () => {
    form.reset({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      phone: "",
      password: "",
    });
    setDialogMode("add");
    setIsDialogOpen(true);
  };
  
  const handleEdit = (user: User) => {
    form.reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      phone: user.phone,
      password: "",
    });
    setCurrentUser(user);
    setDialogMode("edit");
    setIsDialogOpen(true);
  };
  
  const handleView = (user: User) => {
    form.reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      phone: user.phone,
    });
    setCurrentUser(user);
    setDialogMode("view");
    setIsDialogOpen(true);
  };
  
  const handleDelete = (user: User) => {
    setCurrentUser(user);
    setIsDeleteDialogOpen(true);
  };
  
  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1);
  };
  
  const handleSubmit = (values: UserFormValues) => {
    if (dialogMode === "add") {
      createMutation.mutate({
        ...values,
        birthDate: new Date().toISOString(),
        age: 30,
        gender: "male",
        image: "https://robohash.org/user1",
      });
    } else if (dialogMode === "edit" && currentUser) {
      updateMutation.mutate({
        id: currentUser.id,
        data: values,
      });
    }
  };
  
  const handleConfirmDelete = () => {
    if (currentUser) {
      deleteMutation.mutate(currentUser.id);
    }
  };
  
  const columns: Column<User>[] = [
    {
      id: "user",
      header: "User",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={row.image} alt={`${row.firstName} ${row.lastName}`} />
            <AvatarFallback>{row.firstName[0]}{row.lastName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{`${row.firstName} ${row.lastName}`}</div>
            <div className="text-sm text-muted-foreground">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      id: "username",
      header: "Username",
      cell: (row) => <div>{row.username}</div>,
    },
    {
      id: "gender",
      header: "Gender",
      cell: (row) => <Badge variant="outline">{row.gender}</Badge>,
    },
    {
      id: "phone",
      header: "Phone",
      cell: (row) => <div>{row.phone}</div>,
    },
    {
      id: "age",
      header: "Age",
      cell: (row) => <div>{row.age}</div>,
    },
  ];
  
  return (
    <BaseLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage your system users</p>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <DataTable
              columns={columns}
              data={data?.users || []}
              totalItems={data?.total || 0}
              currentPage={page}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
              onSearch={handleSearch}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {dialogMode === "add"
                  ? "Add User"
                  : dialogMode === "edit"
                  ? "Edit User"
                  : "User Details"}
              </DialogTitle>
              <DialogDescription>
                {dialogMode === "add"
                  ? "Add a new user to the system."
                  : dialogMode === "edit"
                  ? "Make changes to the user profile."
                  : "View user details."}
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={dialogMode === "view"} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={dialogMode === "view"} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" disabled={dialogMode === "view"} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={dialogMode === "view"} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={dialogMode === "view"} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {(dialogMode === "add" || dialogMode === "edit") && (
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{dialogMode === "edit" ? "Change Password (leave blank to keep current)" : "Password"}</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                {dialogMode !== "view" && (
                  <DialogFooter>
                    <Button type="submit">
                      {dialogMode === "add" ? "Add User" : "Save Changes"}
                    </Button>
                  </DialogFooter>
                )}
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        
        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete User"
          description={`Are you sure you want to delete ${currentUser?.firstName} ${currentUser?.lastName}? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          variant="destructive"
        />
      </div>
    </BaseLayout>
  );
};

export default Users;
