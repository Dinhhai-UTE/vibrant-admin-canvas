
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DataTable, Column } from "@/components/DataTable/DataTable";
import { Order, orderService } from "@/services/orderService";
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
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import ConfirmDialog from "@/components/ConfirmDialog";
import BaseLayout from "@/components/layout/BaseLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Orders: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data, isLoading } = useQuery({
    queryKey: ["orders", { page, pageSize }],
    queryFn: () => orderService.getOrders({
      skip: (page - 1) * pageSize,
      limit: pageSize,
    }),
  });
  
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Order> }) =>
      orderService.updateOrder(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      setIsDialogOpen(false);
      toast({
        title: "Order updated",
        description: "The order status has been updated successfully",
      });
    },
  });
  
  const deleteMutation = useMutation({
    mutationFn: (id: number) => orderService.deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      setIsDeleteDialogOpen(false);
      toast({
        title: "Order deleted",
        description: "The order has been deleted successfully",
      });
    },
  });
  
  const getStatusBadge = (status?: 'pending' | 'completed' | 'cancelled') => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      case 'pending':
      default:
        return <Badge variant="outline" className="text-orange-500 border-orange-500">Pending</Badge>;
    }
  };
  
  const handleViewOrder = (order: Order) => {
    setCurrentOrder(order);
    setIsDialogOpen(true);
  };
  
  const handleDeleteOrder = (order: Order) => {
    setCurrentOrder(order);
    setIsDeleteDialogOpen(true);
  };
  
  const handleConfirmDelete = () => {
    if (currentOrder) {
      deleteMutation.mutate(currentOrder.id);
    }
  };
  
  const handleStatusChange = (status: 'pending' | 'completed' | 'cancelled') => {
    if (currentOrder) {
      updateMutation.mutate({
        id: currentOrder.id,
        data: { status },
      });
    }
  };
  
  const columns: Column<Order>[] = [
    {
      id: "id",
      header: "Order ID",
      cell: (row) => <div className="font-medium">#{row.id}</div>,
    },
    {
      id: "date",
      header: "Date",
      cell: (row) => (
        <div>{row.date ? format(new Date(row.date), 'MMM dd, yyyy') : 'N/A'}</div>
      ),
    },
    {
      id: "customer",
      header: "Customer",
      cell: (row) => <div>User #{row.userId}</div>,
    },
    {
      id: "total",
      header: "Total",
      cell: (row) => <div className="font-medium">${row.total.toFixed(2)}</div>,
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => getStatusBadge(row.status),
    },
    {
      id: "items",
      header: "Items",
      cell: (row) => <div>{row.totalProducts}</div>,
    },
  ];
  
  return (
    <BaseLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage customer orders and track status</p>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <DataTable
              columns={columns}
              data={data?.carts || []}
              totalItems={data?.total || 0}
              currentPage={page}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
              onView={handleViewOrder}
              onDelete={handleDeleteOrder}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>
                Order #{currentOrder?.id} Details
              </DialogTitle>
              <DialogDescription>
                View and manage order information
              </DialogDescription>
            </DialogHeader>
            
            {currentOrder && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order Date</p>
                    <p className="font-medium">
                      {currentOrder.date ? format(new Date(currentOrder.date), 'MMM dd, yyyy') : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Customer ID</p>
                    <p className="font-medium">#{currentOrder.userId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="font-medium">${currentOrder.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <div className="flex items-center gap-2">
                      <Select
                        defaultValue={currentOrder.status || "pending"}
                        onValueChange={(value) => handleStatusChange(value as any)}
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Order Items</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentOrder.products.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.title}
                          </TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell className="text-right">
                            ${item.total.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Items</p>
                    <p className="font-medium">{currentOrder.totalProducts}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Subtotal</p>
                    <p className="font-medium">${currentOrder.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Discount</p>
                    <p className="font-medium">${(currentOrder.total - currentOrder.discountedTotal).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="font-medium text-xl">${currentOrder.discountedTotal.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Order"
          description={`Are you sure you want to delete Order #${currentOrder?.id}? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          variant="destructive"
        />
      </div>
    </BaseLayout>
  );
};

export default Orders;
