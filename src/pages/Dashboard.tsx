import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  Users, 
  ArrowLeftRight, 
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Clock
} from "lucide-react";

export default function Dashboard() {
  // Mock data
  const stats = [
    {
      title: "Total Aset",
      value: "1,234",
      icon: Package,
      change: "+5.4%",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Aset Dipinjam",
      value: "156",
      icon: ArrowLeftRight,
      change: "+12.1%",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      title: "Aset Tersedia",
      value: "1,078",
      icon: CheckCircle,
      change: "-2.3%",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Total Karyawan",
      value: "89",
      icon: Users,
      change: "+1.2%",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
  ];

  const recentTransactions = [
    { id: 1, asset: "Laptop Dell XPS 13", employee: "Ahmad Rizki", type: "pinjam", date: "2024-01-15", status: "aktif" },
    { id: 2, asset: "Monitor LG 24 inch", employee: "Sari Indah", type: "kembali", date: "2024-01-14", status: "selesai" },
    { id: 3, asset: "Printer Canon", employee: "Budi Santoso", type: "pinjam", date: "2024-01-14", status: "aktif" },
    { id: 4, asset: "Mouse Wireless", employee: "Dewi Lestari", type: "kembali", date: "2024-01-13", status: "selesai" },
    { id: 5, asset: "Keyboard Mechanical", employee: "Eko Prasetyo", type: "pinjam", date: "2024-01-12", status: "aktif" },
  ];

  const popularAssets = [
    { name: "Laptop Dell XPS", borrowed: 15, total: 25 },
    { name: "Monitor LG 24\"", borrowed: 8, total: 20 },
    { name: "Printer Canon", borrowed: 5, total: 8 },
    { name: "Mouse Wireless", borrowed: 12, total: 30 },
    { name: "Webcam Logitech", borrowed: 3, total: 10 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Selamat datang di Sistem Manajemen Aset AssetFlow
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <ArrowLeftRight className="h-4 w-4 mr-2" />
            Transaksi Baru
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-3 w-3 text-success mr-1" />
                    <span className="text-xs text-success font-medium">
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <Card className="lg:col-span-2 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Transaksi Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{transaction.asset}</p>
                    <p className="text-sm text-muted-foreground">{transaction.employee}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={transaction.type === "pinjam" ? "default" : "secondary"}>
                      {transaction.type === "pinjam" ? "Pinjam" : "Kembali"}
                    </Badge>
                    <Badge variant={transaction.status === "aktif" ? "destructive" : "default"}>
                      {transaction.status === "aktif" ? "Aktif" : "Selesai"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{transaction.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Assets */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Aset Populer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularAssets.map((asset, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-foreground">{asset.name}</p>
                    <span className="text-xs text-muted-foreground">
                      {asset.borrowed}/{asset.total}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{ width: `${(asset.borrowed / asset.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Package className="h-6 w-6" />
              Tambah Aset
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="h-6 w-6" />
              Tambah Karyawan
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <ArrowLeftRight className="h-6 w-6" />
              Proses Peminjaman
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <CheckCircle className="h-6 w-6" />
              Proses Pengembalian
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}