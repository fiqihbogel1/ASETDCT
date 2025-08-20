import { useState } from "react";
import { 
  LayoutDashboard, 
  Package, 
  FolderOpen, 
  Users, 
  ArrowLeftRight, 
  History, 
  BarChart3,
  Settings,
  Building2
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Manajemen Aset",
    url: "/aset",
    icon: Package,
  },
  {
    title: "Kategori Aset",
    url: "/kategori",
    icon: FolderOpen,
  },
  {
    title: "Data Karyawan",
    url: "/karyawan",
    icon: Users,
  },
  {
    title: "Transaksi Pinjam",
    url: "/transaksi",
    icon: ArrowLeftRight,
  },
  {
    title: "Riwayat Peminjaman",
    url: "/riwayat",
    icon: History,
  },
  {
    title: "Laporan",
    url: "/laporan",
    icon: BarChart3,
  },
];

const adminOnlyItems = [
  {
    title: "Pengaturan",
    url: "/pengaturan",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar">
        {/* Logo */}
        <div className={`flex items-center ${collapsed ? 'justify-center px-2' : 'px-6'} py-4 border-b border-sidebar-border`}>
          {collapsed ? (
            <Building2 className="h-8 w-8 text-sidebar-primary" />
          ) : (
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-sidebar-primary" />
              <div>
                <h1 className="text-lg font-bold text-sidebar-foreground">AssetFlow</h1>
                <p className="text-xs text-sidebar-foreground/70">Sistem Manajemen Aset</p>
              </div>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            {!collapsed && "Menu Utama"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        isActive(item.url)
                          ? "bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-primary/20"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                      }`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Only Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            {!collapsed && "Administrator"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminOnlyItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        isActive(item.url)
                          ? "bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-primary/20"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                      }`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}