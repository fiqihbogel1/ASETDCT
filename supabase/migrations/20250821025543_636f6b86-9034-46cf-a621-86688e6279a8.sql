-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  nama TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'karyawan')) DEFAULT 'karyawan',
  foto TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create kategori table
CREATE TABLE public.kategori (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_kategori TEXT NOT NULL UNIQUE,
  deskripsi TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create karyawan table
CREATE TABLE public.karyawan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  nama TEXT NOT NULL,
  jabatan TEXT NOT NULL,
  departemen TEXT NOT NULL,
  email TEXT NOT NULL,
  foto TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create aset table
CREATE TABLE public.aset (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kode_aset TEXT NOT NULL UNIQUE,
  nama_aset TEXT NOT NULL,
  kategori_id UUID REFERENCES public.kategori(id) ON DELETE SET NULL,
  serial_number TEXT NOT NULL UNIQUE,
  kondisi TEXT NOT NULL CHECK (kondisi IN ('Sangat Baik', 'Baik', 'Cukup', 'Rusak')) DEFAULT 'Baik',
  spesifikasi TEXT,
  foto TEXT,
  qr_code TEXT,
  status TEXT NOT NULL CHECK (status IN ('Tersedia', 'Dipinjam', 'Rusak')) DEFAULT 'Tersedia',
  lokasi TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transaksi table
CREATE TABLE public.transaksi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aset_id UUID REFERENCES public.aset(id) ON DELETE CASCADE NOT NULL,
  karyawan_id UUID REFERENCES public.karyawan(id) ON DELETE CASCADE NOT NULL,
  tanggal_pinjam TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  tanggal_kembali TIMESTAMP WITH TIME ZONE,
  tanggal_jatuh_tempo TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL CHECK (status IN ('Dipinjam', 'Dikembalikan', 'Terlambat')) DEFAULT 'Dipinjam',
  catatan TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kategori ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.karyawan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aset ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transaksi ENABLE ROW LEVEL SECURITY;

-- Create function to check user role (security definer to avoid RLS recursion)
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT role FROM public.profiles WHERE profiles.user_id = get_user_role.user_id LIMIT 1;
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for kategori
CREATE POLICY "Everyone can view categories" ON public.kategori
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage categories" ON public.kategori
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for karyawan
CREATE POLICY "Users can view their own employee data" ON public.karyawan
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own employee data" ON public.karyawan
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all employees" ON public.karyawan
  FOR SELECT USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can manage employees" ON public.karyawan
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for aset
CREATE POLICY "Everyone can view available assets" ON public.aset
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage assets" ON public.aset
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for transaksi
CREATE POLICY "Users can view their own transactions" ON public.transaksi
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.karyawan k 
      WHERE k.id = karyawan_id AND k.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all transactions" ON public.transaksi
  FOR SELECT USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can manage transactions" ON public.transaksi
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_kategori_updated_at
  BEFORE UPDATE ON public.kategori
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_karyawan_updated_at
  BEFORE UPDATE ON public.karyawan
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_aset_updated_at
  BEFORE UPDATE ON public.aset
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_transaksi_updated_at
  BEFORE UPDATE ON public.transaksi
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample categories
INSERT INTO public.kategori (nama_kategori, deskripsi) VALUES
('Laptop', 'Komputer portabel untuk kebutuhan kerja'),
('Monitor', 'Layar tampilan eksternal'),
('Printer', 'Perangkat pencetak dokumen'),
('Aksesoris', 'Perlengkapan pendukung komputer'),
('Furniture', 'Perabot kantor');

-- Insert sample assets
INSERT INTO public.aset (kode_aset, nama_aset, kategori_id, serial_number, kondisi, spesifikasi, status, lokasi) 
SELECT 
  'AST001', 
  'Laptop Dell XPS 13', 
  k.id, 
  'DL123456789', 
  'Baik', 
  'Intel i7, 16GB RAM, 512GB SSD', 
  'Tersedia', 
  'IT Department'
FROM public.kategori k WHERE k.nama_kategori = 'Laptop'
LIMIT 1;

INSERT INTO public.aset (kode_aset, nama_aset, kategori_id, serial_number, kondisi, spesifikasi, status, lokasi) 
SELECT 
  'AST002', 
  'Monitor LG 24 inch', 
  k.id, 
  'LG987654321', 
  'Sangat Baik', 
  'Full HD 1920x1080, IPS Panel', 
  'Dipinjam', 
  'Finance Department'
FROM public.kategori k WHERE k.nama_kategori = 'Monitor'
LIMIT 1;