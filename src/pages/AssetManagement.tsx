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

export default function AssetManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const assets = [
    {
      id: "AST001",
      name: "Laptop Dell XPS 13",
      category: "Laptop",
      serialNumber: "DL123456789",
      condition: "Baik",
      status: "Tersedia",
      location: "IT Department",
      lastUpdated: "2024-01-15"
    },
    {
      id: "AST002", 
      name: "Monitor LG 24 inch",
      category: "Monitor",
      serialNumber: "LG987654321",
      condition: "Sangat Baik",
      status: "Dipinjam",
      location: "Finance Department",
      lastUpdated: "2024-01-14"
    },
    {
      id: "AST003",
      name: "Printer Canon G2000",
      category: "Printer",
      serialNumber: "CN456789123",
      condition: "Baik",
      status: "Dipinjam",
      location: "HR Department",
      lastUpdated: "2024-01-13"
    },
    {
      id: "AST004",
      name: "Mouse Wireless Logitech",
      category: "Aksesoris",
      serialNumber: "LG111222333",
      condition: "Baik",
      status: "Tersedia",
      location: "IT Department",
      lastUpdated: "2024-01-12"
    },
    {
      id: "AST005",
      name: "Keyboard Mechanical",
      category: "Aksesoris",
      serialNumber: "KB789456123",
      condition: "Sangat Baik",
      status: "Tersedia",
      location: "IT Department",
      lastUpdated: "2024-01-11"
    }
  ];

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
              <p className="text-2xl font-bold text-foreground">1,234</p>
              <p className="text-sm text-muted-foreground">Total Aset</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">1,078</p>
              <p className="text-sm text-muted-foreground">Tersedia</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">156</p>
              <p className="text-sm text-muted-foreground">Dipinjam</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-danger">0</p>
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
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="laptop">Laptop</SelectItem>
                <SelectItem value="monitor">Monitor</SelectItem>
                <SelectItem value="printer">Printer</SelectItem>
                <SelectItem value="aksesoris">Aksesoris</SelectItem>
              </SelectContent>
            </Select>
            <Select>
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
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{asset.id}</TableCell>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell className="font-mono text-sm">{asset.serialNumber}</TableCell>
                  <TableCell>{getConditionBadge(asset.condition)}</TableCell>
                  <TableCell>{getStatusBadge(asset.status)}</TableCell>
                  <TableCell>{asset.location}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}