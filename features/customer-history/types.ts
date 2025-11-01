export interface RepairHistory {
  ma_ro: string;
  ngay_vao: Date;
  trang_thai: { text: string; class: string; };
  tong_tien_bao_gia: number;
  tong_chi_tieu: number;
  cong_no: number;
  co_van: string;
  yeu_cau: string;
  so_km: number;
}

export interface Vehicle {
  bien_so: string;
  hieu_xe: string;
  loai_xe: string;
  tong_chi_tieu: number;
  tong_ro: number;
  tong_ro_hoan_thanh: number;
  lan_cuoi_ghe: Date;
  cong_no: number;
  hang_muc_cho: string;
  repair_history: RepairHistory[];
}

export interface Customer {
  ma: string;
  ten: string;
  sdt: string;
  email: string;
  cccd: string;
  diachi: string;
  phanloai: string;
  nhom: string;
  vehicles: Vehicle[];
}
