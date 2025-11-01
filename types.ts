export interface Material {
  id: string;
  ten: string;
  maQuocTe: string;
  dienGiaiVatTu: string;
  dvt: string;
  slSoSach: number;
  giaVon: number;
  slThucTe: number;
  ghiChu: string;
}

export interface InventoryRecord {
  id: number;
  soChungTu: string;
  trangThaiChungTu: 'lap-chung-tu' | 'chuyen-so-cai';
  maKho: string;
  tenKho: string;
  ngayKiemKe: string; // YYYY-MM-DD
  nguoiThucHien: string;
  ngayChungTu: string; // YYYY-MM-DD
  dienGiai: string;
  isLocked: boolean;
  slThucTeOption: 'de-trong' | 'ton-kho';
  vatTu: Material[];
}
