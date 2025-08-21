import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Plus, Search, Filter, Eye, Edit, Trash2, QrCode } from "lucide-react";
import { useAssets } from "@/hooks/useAssets";
import { useCategories } from "@/hooks/useCategories";

export default function AssetManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  
  const { assets, loading: assetsLoading } = useAssets();
  const { categories } = useCategories();

  // Filter assets based on search and filters
  const filteredAssets = assets.filter(asset => {
    const matchesSearch = 
      asset.kode_aset.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.nama_aset.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.serial_number.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || asset.kategori_id === selectedCategory;
    const matchesStatus = selectedStatus === "all" || asset.status.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate stats
  const totalAssets = assets.length;
  const availableAssets = assets.filter(asset => asset.status === "Tersedia").length;
  const borrowedAssets = assets.filter(asset => asset.status === "Dipinjam").length;
  const damagedAssets = assets.filter(asset => asset.status === "Rusak").length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Tersedia":
        return <Badge className="bg-success text-success-foreground">Tersedia</Badge>;
      case "Dipinjam":
        return <Badge className="bg-warning text-warning-foreground">Dipinjam</Badge>;
      case "Rusak":
        return <Badge className="bg-danger text-danger-foreground">Rusak</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case "Sangat Baik":
        return <Badge className="bg-success text-success-foreground">Sangat Baik</Badge>;
      case "Baik":
        return <Badge className="bg-primary text-primary-foreground">Baik</Badge>;
      case "Cukup":
        return <Badge className="bg-warning text-warning-foreground">Cukup</Badge>;
      case "Rusak":
        return <Badge className="bg-danger text-danger-foreground">Rusak</Badge>;
      default:
        return <Badge variant="secondary">{condition}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manajemen Aset</h1>
          <p className="text-muted-foreground mt-1">
            Kelola semua aset perusahaan dengan mudah
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <Plus className="h-4 w-4 mr-2" />
          Tambah Aset
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{totalAssets}</p>
              <p className="text-sm text-muted-foreground">Total Aset</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">{availableAssets}</p>
              <p className="text-sm text-muted-foreground">Tersedia</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">{borrowedAssets}</p>
              <p className="text-sm text-muted-foreground">Dipinjam</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-danger">{damagedAssets}</p>
              <p className="text-sm text-muted-foreground">Rusak</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Cari berdasarkan kode, nama aset, atau serial number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.nama_kategori}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="tersedia">Tersedia</SelectItem>
                <SelectItem value="dipinjam">Dipinjam</SelectItem>
                <SelectItem value="rusak">Rusak</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Assets Table */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Daftar Aset</CardTitle>
        </CardHeader>
        <CardContent>
          {assetsLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode Aset</TableHead>
                  <TableHead>Nama Aset</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Serial Number</TableHead>
                  <TableHead>Kondisi</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      {searchTerm || selectedCategory !== "all" || selectedStatus !== "all" 
                        ? "Tidak ada aset yang sesuai dengan filter" 
                        : "Belum ada data aset"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAssets.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell className="font-medium">{asset.kode_aset}</TableCell>
                      <TableCell>{asset.nama_aset}</TableCell>
                      <TableCell>{asset.kategori?.nama_kategori || '-'}</TableCell>
                      <TableCell className="font-mono text-sm">{asset.serial_number}</TableCell>
                      <TableCell>{getConditionBadge(asset.kondisi)}</TableCell>
                      <TableCell>{getStatusBadge(asset.status)}</TableCell>
                      <TableCell>{asset.lokasi || '-'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <QrCode className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-danger hover:text-danger">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}