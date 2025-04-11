
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DataTable, Column } from "@/components/DataTable/DataTable";
import { Product, productService } from "@/services/productService";
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
  CardDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConfirmDialog from "@/components/ConfirmDialog";
import BaseLayout from "@/components/layout/BaseLayout";

type ProductFormValues = Omit<Product, 'id' | 'images'> & { 
  image?: string;
};

const Products: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [dialogMode, setDialogMode] = useState<"add" | "edit" | "view">("add");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<ProductFormValues>({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      brand: "",
      category: "",
      thumbnail: "",
    },
  });
  
  const { data, isLoading } = useQuery({
    queryKey: ["products", { page, pageSize, search }],
    queryFn: () => 
      productService.getProducts({
        skip: (page - 1) * pageSize,
        limit: pageSize,
        search: search || undefined,
      }),
  });
  
  const createMutation = useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsDialogOpen(false);
      toast({
        title: "Product created",
        description: "The product has been added successfully",
      });
      form.reset();
    },
  });
  
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Product> }) =>
      productService.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsDialogOpen(false);
      toast({
        title: "Product updated",
        description: "The product has been updated successfully",
      });
    },
  });
  
  const deleteMutation = useMutation({
    mutationFn: (id: number) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsDeleteDialogOpen(false);
      toast({
        title: "Product deleted",
        description: "The product has been deleted successfully",
      });
    },
  });
  
  const handleAdd = () => {
    form.reset({
      title: "",
      description: "",
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      brand: "",
      category: "",
      thumbnail: "",
    });
    setDialogMode("add");
    setIsDialogOpen(true);
  };
  
  const handleEdit = (product: Product) => {
    form.reset({
      title: product.title,
      description: product.description,
      price: product.price,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      stock: product.stock,
      brand: product.brand,
      category: product.category,
      thumbnail: product.thumbnail,
    });
    setCurrentProduct(product);
    setDialogMode("edit");
    setIsDialogOpen(true);
  };
  
  const handleView = (product: Product) => {
    form.reset({
      title: product.title,
      description: product.description,
      price: product.price,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      stock: product.stock,
      brand: product.brand,
      category: product.category,
      thumbnail: product.thumbnail,
    });
    setCurrentProduct(product);
    setDialogMode("view");
    setIsDialogOpen(true);
  };
  
  const handleDelete = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };
  
  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1);
  };
  
  const handleSubmit = (values: ProductFormValues) => {
    if (dialogMode === "add") {
      createMutation.mutate(values as any);
    } else if (dialogMode === "edit" && currentProduct) {
      updateMutation.mutate({
        id: currentProduct.id,
        data: values,
      });
    }
  };
  
  const handleConfirmDelete = () => {
    if (currentProduct) {
      deleteMutation.mutate(currentProduct.id);
    }
  };
  
  const columns: Column<Product>[] = [
    {
      id: "product",
      header: "Product",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.thumbnail}
            alt={row.title}
            className="h-10 w-10 rounded-md object-cover"
          />
          <div>
            <div className="font-medium">{row.title}</div>
            <div className="text-sm text-muted-foreground">{row.brand}</div>
          </div>
        </div>
      ),
    },
    {
      id: "category",
      header: "Category",
      cell: (row) => (
        <Badge variant="outline">{row.category}</Badge>
      ),
    },
    {
      id: "price",
      header: "Price",
      cell: (row) => (
        <div className="font-medium">${row.price.toFixed(2)}</div>
      ),
    },
    {
      id: "stock",
      header: "Stock",
      cell: (row) => (
        <div className="font-medium">{row.stock}</div>
      ),
    },
    {
      id: "rating",
      header: "Rating",
      cell: (row) => (
        <div className="flex items-center">
          <div className="mr-1">{row.rating}</div>
          <div className="text-yellow-400">★</div>
        </div>
      ),
    },
  ];
  
  return (
    <BaseLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="instock">In Stock</TabsTrigger>
            <TabsTrigger value="outofstock">Out of Stock</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <DataTable
                  columns={columns}
                  data={data?.products || []}
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
          </TabsContent>

          <TabsContent value="instock" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <DataTable
                  columns={columns}
                  data={(data?.products || []).filter(p => p.stock > 0)}
                  totalItems={(data?.products || []).filter(p => p.stock > 0).length}
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
          </TabsContent>

          <TabsContent value="outofstock" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <DataTable
                  columns={columns}
                  data={(data?.products || []).filter(p => p.stock === 0)}
                  totalItems={(data?.products || []).filter(p => p.stock === 0).length}
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
          </TabsContent>
        </Tabs>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {dialogMode === "add"
                  ? "Add Product"
                  : dialogMode === "edit"
                  ? "Edit Product"
                  : "Product Details"}
              </DialogTitle>
              <DialogDescription>
                {dialogMode === "add"
                  ? "Add a new product to your inventory."
                  : dialogMode === "edit"
                  ? "Make changes to the product."
                  : "View product details."}
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={dialogMode === "view"} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand</FormLabel>
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} disabled={dialogMode === "view"} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={dialogMode === "view"} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thumbnail URL</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={dialogMode === "view"} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            disabled={dialogMode === "view"}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            disabled={dialogMode === "view"}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="discountPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount %</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            disabled={dialogMode === "view"}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            disabled={dialogMode === "view"}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {dialogMode !== "view" && (
                  <DialogFooter>
                    <Button type="submit">
                      {dialogMode === "add" ? "Add Product" : "Save Changes"}
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
          title="Delete Product"
          description={`Are you sure you want to delete "${currentProduct?.title}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          variant="destructive"
        />
      </div>
    </BaseLayout>
  );
};

export default Products;
