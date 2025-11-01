import { InventoryRecord, Material } from '../types';

export const warehouses: Record<string, string> = {
    'KHO-001': 'Kho Phụ tùng A',
    'KHO-002': 'Kho Sơn Gò',
    'KHO-003': 'Kho Vật tư chung',
    'KHO-004': 'Kho Hàng mới',
};

export const initialInventoryRecords: InventoryRecord[] = [
    { 
        id: 1,
        soChungTu: 'PKK001',
        trangThaiChungTu: 'lap-chung-tu',
        maKho: 'KHO-001', 
        tenKho: 'Kho Phụ tùng A', 
        ngayKiemKe: '2025-10-31', 
        nguoiThucHien: 'Nguyễn Văn An', 
        ngayChungTu: '2025-10-30', 
        dienGiai: 'Kiểm kê định kỳ T10/2025', 
        isLocked: false,
        slThucTeOption: 'ton-kho',
        vatTu: [
            { id: 'VT001', ten: 'Lọc dầu A', maQuocTe: 'INT-A1', dienGiaiVatTu: 'Lọc dầu cho xe Toyota Vios', dvt: 'Cái', slSoSach: 50, giaVon: 150000, slThucTe: 50, ghiChu: '' },
            { id: 'VT002', ten: 'Bugi B', maQuocTe: 'INT-B2', dienGiaiVatTu: 'Bugi cho xe Honda City', dvt: 'Cái', slSoSach: 100, giaVon: 80000, slThucTe: 98, ghiChu: 'Hỏng 2' },
            { id: 'VT003', ten: 'Dầu nhớt C', maQuocTe: 'INT-C3', dienGiaiVatTu: 'Dầu nhớt tổng hợp 5W-30', dvt: 'Lít', slSoSach: 200, giaVon: 250000, slThucTe: 200, ghiChu: '' }
        ]
    },
    { 
        id: 2, 
        soChungTu: 'PKK002',
        trangThaiChungTu: 'chuyen-so-cai',
        maKho: 'KHO-002', 
        tenKho: 'Kho Sơn Gò', 
        ngayKiemKe: '2025-10-31', 
        nguoiThucHien: 'Trần Thị Bích', 
        ngayChungTu: '2025-10-30', 
        dienGiai: 'Kiểm kê kho sơn', 
        isLocked: true,
        slThucTeOption: 'ton-kho',
        vatTu: [
            { id: 'VT004', ten: 'Sơn Trắng', maQuocTe: 'INT-D4', dienGiaiVatTu: 'Sơn trắng ngọc trai', dvt: 'Lít', slSoSach: 50, giaVon: 800000, slThucTe: 50, ghiChu: '' },
            { id: 'VT005', ten: 'Sơn Đen', maQuocTe: 'INT-E5', dienGiaiVatTu: 'Sơn đen bóng', dvt: 'Lít', slSoSach: 30, giaVon: 750000, slThucTe: 30, ghiChu: '' }
        ]
    },
    { 
        id: 3,
        soChungTu: 'PKK003',
        trangThaiChungTu: 'lap-chung-tu',
        maKho: 'KHO-003', 
        tenKho: 'Kho Vật tư chung', 
        ngayKiemKe: '2025-10-30', 
        nguoiThucHien: 'Lê Văn Cường', 
        ngayChungTu: '2025-10-30', 
        dienGiai: 'Kiểm kê đột xuất', 
        isLocked: false,
        slThucTeOption: 'de-trong',
        vatTu: [
            { id: 'VT006', ten: 'Vít 5cm', maQuocTe: 'INT-F6', dienGiaiVatTu: 'Vít bắt ốc', dvt: 'Hộp', slSoSach: 10, giaVon: 50000, slThucTe: 9, ghiChu: 'Thất lạc 1' },
        ]
    }
];

export const generateNewMaterials = (count: number): Material[] => {
    const newMaterials: Material[] = [];
    const baseId = Date.now();
    for (let i = 0; i < count; i++) {
        const randomNum = Math.floor(Math.random() * 1000);
        const slSoSach = Math.floor(Math.random() * 100) + 10;
        newMaterials.push({
            id: `VTM-${baseId + i}`,
            ten: `Vật tư mới ${randomNum}`,
            maQuocTe: `INT-NEW${randomNum}`,
            dienGiaiVatTu: `Diễn giải cho vật tư mới ${randomNum}`,
            dvt: 'Cái',
            slSoSach: slSoSach,
            giaVon: Math.floor(Math.random() * 500000) + 50000,
            slThucTe: slSoSach,
            ghiChu: ''
        });
    }
    return newMaterials;
};
