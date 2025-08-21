import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Asset {
  id: string;
  kode_aset: string;
  nama_aset: string;
  kategori_id: string;
  serial_number: string;
  kondisi: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Rusak';
  spesifikasi?: string;
  foto?: string;
  qr_code?: string;
  status: 'Tersedia' | 'Dipinjam' | 'Rusak';
  lokasi?: string;
  kategori?: {
    nama_kategori: string;
  };
  created_at: string;
  updated_at: string;
}

export function useAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('aset')
        .select(`
          *,
          kategori (
            nama_kategori
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setAssets(data as Asset[] || []);
    } catch (error) {
      console.error('Error fetching assets:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data aset",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const refetch = () => {
    fetchAssets();
  };

  return {
    assets,
    loading,
    refetch,
  };
}