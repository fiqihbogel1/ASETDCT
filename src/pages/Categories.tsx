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
import { Plus, Search, Edit, Trash2, FolderOpen } from "lucide-react";

export default function Categories() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const categories = [
    {
      id: 1,
      name: "Laptop",
      description: "Komputer portable untuk kebutuhan kerja mobile",
      totalAssets: 45,
      available: 38,
      borrowed: 7,
      createdAt: "2024-01-01"
    },
    {
      id: 2,
      name: "Monitor",
      description: "Layar eksternal untuk komputer dan laptop", 
      totalAssets: 32,
      available: 28,
      borrowed: 4,
      createdAt: "2024-01-01"
    },
    {
      id: 3,
      name: "Printer",
      description: "Perangkat cetak untuk dokumen kantor",
      totalAssets: 15,
      available: 12,
      borrowed: 3,
      createdAt: "2024-01-01"
    },
    {
      id: 4,
      name: "Aksesoris",
      description: "Mouse, keyboard, dan aksesoris komputer lainnya",
      totalAssets: 89,
      available: 75,
      borrowed: 14,
      createdAt: "2024-01-01"
    },
    {
      id: 5,
      name: "Perangkat Jaringan",
      description: "Router, switch, dan perangkat jaringan",
      totalAssets: 12,
      available: 10,
      borrowed: 2,
      createdAt: "2024-01-01"
    }
  ];

  const getCategoryStats = (category: any) => {
    const usagePercentage = (category.borrowed / category.totalAssets) * 100;
    return usagePercentage;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kategori Aset</h1>
          <p className="text-muted-foreground mt-1">
            Kelola kategori aset untuk mengorganisir inventaris
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <Plus className="h-4 w-4 mr-2" />
          Tambah Kategori
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">{categories.length}</p>
                <p className="text-sm text-muted-foreground">Total Kategori</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <FolderOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-success">
                  {categories.reduce((acc, cat) => acc + cat.totalAssets, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Aset</p>
              </div>
              <div className="p-3 rounded-lg bg-success/10">
                <FolderOpen className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-warning">
                  {categories.reduce((acc, cat) => acc + cat.borrowed, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Sedang Dipinjam</p>
              </div>
              <div className="p-3 rounded-lg bg-warning/10">
                <FolderOpen className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Cari kategori..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FolderOpen className="h-5 w-5 text-primary" />
                  </div>
                  <span>{category.name}</span>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-danger hover:text-danger">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{category.description}</p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-foreground">{category.totalAssets}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-success">{category.available}</p>
                    <p className="text-xs text-muted-foreground">Tersedia</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-warning">{category.borrowed}</p>
                    <p className="text-xs text-muted-foreground">Dipinjam</p>
                  </div>
                </div>

                {/* Usage Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Tingkat Penggunaan</span>
                    <span>{getCategoryStats(category).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{ width: `${getCategoryStats(category)}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Dibuat: {new Date(category.createdAt).toLocaleDateString('id-ID')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Categories Table View */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Daftar Lengkap Kategori</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Kategori</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead className="text-center">Total Aset</TableHead>
                <TableHead className="text-center">Tersedia</TableHead>
                <TableHead className="text-center">Dipinjam</TableHead>
                <TableHead className="text-center">Penggunaan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FolderOpen className="h-4 w-4 text-primary" />
                      </div>
                      {category.name}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{category.totalAssets}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className="bg-success text-success-foreground">{category.available}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className="bg-warning text-warning-foreground">{category.borrowed}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {getCategoryStats(category).toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
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