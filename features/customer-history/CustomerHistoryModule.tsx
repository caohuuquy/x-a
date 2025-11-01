
import React, { useState, useEffect, useMemo } from 'react';
import { Customer, Vehicle } from './types';
import { PlusIcon, UploadIcon, MenuIcon, TrashIcon, SearchIcon, ChevronDownIcon, BellIcon, CopyIcon, PencilIcon, CloseIcon, RotateLeftIcon } from '../../components/icons';

// Fix: Moved data generation logic from the bottom of the file to the top to avoid 'used before defined' errors.
// These are now local to this module.
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateRepairHistory = (lastVisitDate: Date) => {
    const statuses = [
        { text: 'Nháp', class: 'bg-gray-100 text-gray-800' },
        { text: 'Tiếp nhận', class: 'bg-purple-100 text-purple-800' },
        { text: 'Báo giá', class: 'bg-orange-100 text-orange-800' },
        { text: 'Đang sửa chữa', class: 'bg-blue-100 text-blue-800' },
        { text: 'Đã sửa xong', class: 'bg-cyan-100 text-cyan-800' },
        { text: 'Hoàn thành', class: 'bg-green-100 text-green-800' }
    ];
    const advisors = ['Nguyễn Văn An', 'Trần Thị Bình', 'Lê Minh Cường', 'Phạm Thị Dung'];
    const requests = ['Bảo dưỡng định kỳ cấp 80.000km', 'Kiểm tra hệ thống phanh, thay má phanh sau', 'Thay dầu máy, lọc dầu', 'Sửa chữa điều hòa không mát', 'Kiểm tra lốp xe, cân bằng động', 'Làm lại máy', 'Sơn lại toàn bộ xe'];
    
    const historyCount = 10;
    let currentKm = randomInt(50000, 150000);
    let currentDate = new Date(lastVisitDate);

    const history = [];
    for (let i = 0; i < historyCount; i++) {
        const status = statuses[randomInt(0, statuses.length - 1)];
        const chiTieu = randomInt(500, 15000) * 1000;
        const baoGia = chiTieu + randomInt(0, 500) * 1000;
        let congNo = 0;
        if ((status.text === 'Hoàn thành' || status.text === 'Đã sửa xong') && randomInt(0, 5) === 0) {
            congNo = randomInt(100, 1000) * 1000;
        }

        history.push({
            ma_ro: `RO-${randomInt(10000, 99999)}`,
            ngay_vao: new Date(currentDate),
            trang_thai: status,
            tong_tien_bao_gia: baoGia,
            tong_chi_tieu: chiTieu,
            cong_no: congNo,
            co_van: advisors[randomInt(0, advisors.length - 1)],
            yeu_cau: requests[randomInt(0, requests.length - 1)],
            so_km: currentKm
        });
        currentKm -= randomInt(5000, 15000);
        currentDate.setMonth(currentDate.getMonth() - randomInt(2, 6));
    }
    return history;
};

const generateVehicleData = (): Vehicle[] => {
    const carBrands = ['Toyota', 'Honda', 'Ford', 'Hyundai', 'Kia', 'Mazda', 'Mitsubishi', 'Vinfast', 'Mercedes'];
    const carModels = {
        Toyota: ['Vios', 'Corolla Altis', 'Camry', 'Innova', 'Fortuner'],
        Honda: ['City', 'Civic', 'CR-V', 'HR-V', 'Accord'],
        Ford: ['Ranger', 'Everest', 'Transit', 'EcoSport'],
        Hyundai: ['Grand i10', 'Accent', 'Elantra', 'Tucson', 'Santa Fe'],
        Kia: ['Morning', 'Soluto', 'K3', 'Seltos', 'Sonet'],
        Mazda: ['Mazda2', 'Mazda3', 'CX-5', 'BT-50'],
        Mitsubishi: ['Attrage', 'Xpander', 'Outlander', 'Triton'],
        Vinfast: ['Fadil', 'Lux A2.0', 'Lux SA2.0', 'VF e34', 'VF8'],
        Mercedes: ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE']
    };
    const randomDate = (start: Date, end: Date) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

    return Array.from({ length: 10 }, () => {
        const brand = carBrands[randomInt(0, carBrands.length - 1)];
        const model = carModels[brand as keyof typeof carModels][randomInt(0, carModels[brand as keyof typeof carModels].length - 1)];
        const totalRO = randomInt(5, 50);
        const completedRO = randomInt(Math.floor(totalRO * 0.8), totalRO);
        const lastVisit = randomDate(new Date(2023, 0, 1), new Date());

        const vehicle: Omit<Vehicle, 'repair_history'> = {
            bien_so: `${randomInt(29, 99)}${String.fromCharCode(65 + randomInt(0,25))}-${randomInt(100,999)}.${randomInt(10,99)}`,
            hieu_xe: brand,
            loai_xe: model,
            tong_chi_tieu: randomInt(10, 200) * 1000000,
            tong_ro: totalRO,
            tong_ro_hoan_thanh: completedRO,
            lan_cuoi_ghe: lastVisit,
            cong_no: randomInt(0, 8) === 0 ? randomInt(1, 20) * 100000 : 0,
            hang_muc_cho: ''
        };
        return {
            ...vehicle,
            repair_history: generateRepairHistory(lastVisit)
        };
    });
}


const initialCustomers: Omit<Customer, 'vehicles'>[] = [
    { ma: 'KH_VKKI1', ten: 'Ngân Hàng TNHH MTV S...', sdt: '', email: '', cccd: '', diachi: '130 Phan Đăng Lưu, Phường...', phanloai: 'Cá nhân', nhom: '' },
    { ma: 'KH_TGIH', ten: 'CÔNG TY TNHH THẾ GIỚI H...', sdt: '', email: '', cccd: '', diachi: '61/6 Nguyễn Tư Giản, Phườn...', phanloai: 'Cá nhân', nhom: '' },
    { ma: 'KH_TEIN', ten: 'Anh Cường - Công ty Tein', sdt: '0911 181 119', email: '', cccd: '', diachi: 'Quận 12, TP.HCM', phanloai: 'Cá nhân', nhom: '' },
    { ma: 'KH_PHELIEU', ten: 'Thu Phế Liệu', sdt: '', email: '', cccd: '', diachi: '', phanloai: 'Cá nhân', nhom: '' },
    { ma: 'KH_KBS', ten: 'KHÔNG BIẾN SỐ - A Hoàng...', sdt: '0345 711 551', email: '', cccd: '', diachi: 'Bình Chánh, TP.HCM', phanloai: 'Cá nhân', nhom: '' },
    { ma: 'KH_HOPLONG', ten: 'CÔNG TY CỔ PHẦN CÔNG...', sdt: '0938 967 033', email: 'hoplong@gmail.com', cccd: '', diachi: 'Số 6, ngõ 293, đường Tân M...', phanloai: 'Cá nhân', nhom: 'Đối tác' },
    { ma: 'KH_CTYTRUN...', ten: 'CÔNG TY TNHH THƯƠNG...', sdt: '', email: '', cccd: '', diachi: '107/38B Cách Mạng Tháng ...', phanloai: 'Cá nhân', nhom: '' },
    { ma: 'KH_CTYLCA', ten: 'CÔNG TY TNHH THƯƠNG...', sdt: '', email: '', cccd: '', diachi: '126 Nguyễn Hữu Dật, Phườn...', phanloai: 'Cá nhân', nhom: '' },
    { ma: 'KH_CTYHUUP...', ten: 'CÔNG TY TNHH CƠ ĐIỆN H...', sdt: '0982 205 464', email: 'huuphat@outlook.com', cccd: '079201012345', diachi: '63 Nguyễn Hữu Tiến, Phườn...', phanloai: 'Doanh nghiệp', nhom: 'Đối tác' },
    { ma: 'KH_CTYGREEN...', ten: 'CÔNG TY CỔ PHẦN ĐIỆN T...', sdt: '0937 560 115', email: 'greenlife@gmail.com', cccd: '', diachi: 'Lô Q, Đường số 6B-7A, KCN ...', phanloai: 'Doanh nghiệp', nhom: '' },
    { ma: 'KH_CTYGREEN...', ten: 'CÔNG TY TNHH SẢN XUẤT ...', sdt: '', email: '', cccd: '', diachi: '42/10 Nguyễn Hữu Tiến, Phư...', phanloai: 'Cá nhân', nhom: '' },
    { ma: 'KH_ANBINH', ten: 'Công Ty TNHH An Bình', sdt: '0283 888 9999', email: 'contact@anbinh.vn', cccd: '', diachi: '123 Võ Văn Tần, P.6, Q.3, TPHCM', phanloai: 'Doanh nghiệp', nhom: 'Nhà cung cấp' },
    { ma: 'KH_BAOAN', ten: 'Chị Bảo An', sdt: '0909 123 456', email: 'baoan.ng@gmail.com', cccd: '079200001122', diachi: '45 Nguyễn Trãi, P. Bến Thành, Q.1, TPHCM', phanloai: 'Cá nhân', nhom: '' },
    { ma: 'KH_MINHTRI', ten: 'Anh Minh Trí', sdt: '0987 654 321', email: 'minhtri.le@yahoo.com', cccd: '083201002233', diachi: '789 Lê Lợi, P. Bến Nghé, Q.1, TPHCM', phanloai: 'Cá nhân', nhom: 'Khách VIP' },
    { ma: 'KH_PHUCTHINH', ten: 'Công Ty Phúc Thịnh', sdt: '0243 999 8888', email: 'info@phucthinh.com.vn', cccd: '', diachi: 'Tầng 10, Tòa nhà Ladeco, 266 Đội Cấn, Ba Đình, Hà Nội', phanloai: 'Doanh nghiệp', nhom: 'Đối tác' },
    { ma: 'KH_THANHDAT', ten: 'Công ty TNHH Thành Đạt', sdt: '0918 273 645', email: 'thanhdat@gmail.com', cccd: '', diachi: 'Khu công nghiệp Sóng Thần, Dĩ An, Bình Dương', phanloai: 'Doanh nghiệp', nhom: '' },
    { ma: 'KH_HONGHA', ten: 'Chị Hồng Hà', sdt: '0333 444 555', email: 'hongha.tran@gmail.com', cccd: '001302003344', diachi: 'Số 10, ngõ 50, Đặng Thai Mai, Tây Hồ, Hà Nội', phanloai: 'Cá nhân', nhom: '' },
    { ma: 'KH_VIETTHANG', ten: 'Công ty Việt Thắng', sdt: '0225 333 2222', email: 'sales@vietthang.vn', cccd: '', diachi: 'Lô 4, KCN Nomura, An Dương, Hải Phòng', phanloai: 'Doanh nghiệp', nhom: 'Nhà cung cấp' },
    { ma: 'KH_LANANH', ten: 'Cô Lan Anh', sdt: '0945 111 222', email: '', cccd: '049301004455', diachi: '15 Lê Duẩn, Hải Châu, Đà Nẵng', phanloai: 'Cá nhân', nhom: 'Khách cũ' },
    { ma: 'KH_TIENPHONG', ten: 'Ngân Hàng Tiên Phong', sdt: '1900 585 885', email: 'info@tpb.com.vn', cccd: '', diachi: '57 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội', phanloai: 'Doanh nghiệp', nhom: '' },
    { ma: 'KH_HOANGNAM', ten: 'Công Ty TNHH Hoàng Nam', sdt: '0905 111 222', email: 'contact@hoangnam.vn', cccd: '', diachi: '34 Pasteur, Hải Châu, Đà Nẵng', phanloai: 'Doanh nghiệp', nhom: 'Khách hàng tiềm năng' },
    { ma: 'KH_THUYLINH', ten: 'Chị Thùy Linh', sdt: '0988 777 888', email: 'thuylinh.pham@gmail.com', cccd: '052300001122', diachi: '112 Cầu Giấy, P. Quan Hoa, Cầu Giấy, Hà Nội', phanloai: 'Cá nhân', nhom: '' },
    { ma: 'KH_DAIAN', ten: 'Công ty Cổ phần Đại An', sdt: '0236 333 4444', email: 'info@daiancorp.com', cccd: '', diachi: 'KCN Hòa Khánh, Liên Chiểu, Đà Nẵng', phanloai: 'Doanh nghiệp', nhom: '' },
    { ma: 'KH_TUANANH', ten: 'Anh Tuấn Anh', sdt: '0913 555 666', email: '', cccd: '012345678910', diachi: 'Vinhomes Central Park, Bình Thạnh, TP.HCM', phanloai: 'Cá nhân', nhom: 'Khách VIP' },
    { ma: 'KH_SAOMAI', ten: 'Công Ty TNHH Sao Mai', sdt: '0292 333 5555', email: 'saomai@gmail.com', cccd: '', diachi: '1 Lý Tự Trọng, Ninh Kiều, Cần Thơ', phanloai: 'Doanh nghiệp', nhom: 'Đối tác' },
    { ma: 'KH_MYLE', ten: 'Chị Mỹ Lệ', sdt: '0977 111 333', email: 'myle.tran@yahoo.com', cccd: '', diachi: '25 Yersin, P.10, Đà Lạt, Lâm Đồng', phanloai: 'Cá nhân', nhom: '' },
    { ma: 'KH_LONGTHANH', ten: 'Tập đoàn Long Thành', sdt: '0251 888 9999', email: 'hr@longthanh.com', cccd: '', diachi: 'KCN Long Thành, Đồng Nai', phanloai: 'Doanh nghiệp', nhom: 'Nhà cung cấp' },
    { ma: 'KH_KHANHVY', ten: 'Bạn Khánh Vy', sdt: '0399 123 789', email: 'khanhvy@gmail.com', cccd: '098765432101', diachi: 'Thủ Dầu Một, Bình Dương', phanloai: 'Cá nhân', nhom: 'Khách vãng lai' },
    { ma: 'KH_CATUONG', ten: 'Công ty BĐS Cát Tường', sdt: '0908 999 000', email: 'cattuong@gmail.com', cccd: '', diachi: 'Đường 3/2, P.11, Q.10, TP.HCM', phanloai: 'Doanh nghiệp', nhom: '' },
    { ma: 'KH_QUOCBAO', ten: 'Anh Quốc Bảo', sdt: '0933 456 789', email: '', cccd: '067201005566', diachi: 'Thành phố mới, Bình Dương', phanloai: 'Cá nhân', nhom: '' }
];

const CustomerHistoryModule: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
    const [customerForHistory, setCustomerForHistory] = useState<Customer | null>(null);

    const [isPlateHistoryModalOpen, setPlateHistoryModalOpen] = useState(false);
    const [vehicleForPlateHistory, setVehicleForPlateHistory] = useState<Vehicle | null>(null);
    const [filterCompletedRo, setFilterCompletedRo] = useState(false);

    useEffect(() => {
        // Generate full customer data on initial component mount
        const customersWithVehicles = initialCustomers.map(customer => ({
            ...customer,
            vehicles: generateVehicleData(),
        }));
        setCustomers(customersWithVehicles);
    }, []);

    const handleSelectCustomer = (customer: Customer) => {
        setSelectedCustomer(customer);
    };

    const handleCloseDetailView = () => {
        setSelectedCustomer(null);
    };

    const handleShowHistoryModal = (customer: Customer) => {
        setCustomerForHistory(customer);
        setHistoryModalOpen(true);
    };

    const handleCloseHistoryModal = () => {
        setHistoryModalOpen(false);
        setCustomerForHistory(null);
    };

    const handleShowPlateHistoryModal = (vehicle: Vehicle) => {
        setVehicleForPlateHistory(vehicle);
        setHistoryModalOpen(false);
        setPlateHistoryModalOpen(true);
        setFilterCompletedRo(false);
    };
    
    const handleClosePlateHistoryModal = () => {
        setPlateHistoryModalOpen(false);
        setVehicleForPlateHistory(null);
        // Re-open the previous modal if a customer context exists
        if (customerForHistory) {
            setHistoryModalOpen(true);
        }
    };
    
    const customerInfo = useMemo(() => {
        if (!customerForHistory) return { customerName: '', companyName: '---', totalVehicles: 0 };

        let customerName = customerForHistory.ten;
        let companyName = '---';
        const upperCaseTen = customerForHistory.ten.toUpperCase();

        if (upperCaseTen.includes('CÔNG TY') || upperCaseTen.includes('NGÂN HÀNG') || upperCaseTen.includes('TNHH')) {
            companyName = customerForHistory.ten;
            customerName = 'Đại diện';
        } else if (customerForHistory.ten.includes(' - ')) {
            const parts = customerForHistory.ten.split(' - ');
            customerName = parts[0];
            companyName = parts[1];
        }

        return {
            customerName,
            companyName,
            totalVehicles: customerForHistory.vehicles?.length ?? 0,
        };
    }, [customerForHistory]);
    
    const vehicleHistoryTotals = useMemo(() => {
        if (!customerForHistory?.vehicles) return { totalChiTieu: 0, totalRO: 0, totalROHoanThanh: 0, totalCongNo: 0 };
        return customerForHistory.vehicles.reduce((acc, v) => ({
            totalChiTieu: acc.totalChiTieu + v.tong_chi_tieu,
            totalRO: acc.totalRO + v.tong_ro,
            totalROHoanThanh: acc.totalROHoanThanh + v.tong_ro_hoan_thanh,
            totalCongNo: acc.totalCongNo + v.cong_no,
        }), { totalChiTieu: 0, totalRO: 0, totalROHoanThanh: 0, totalCongNo: 0 });
    }, [customerForHistory]);

    const plateHistoryInfo = useMemo(() => {
        if (!vehicleForPlateHistory || !customerForHistory) return null;
        const filteredHistory = filterCompletedRo 
            ? vehicleForPlateHistory.repair_history.filter(r => r.trang_thai.text === 'Hoàn thành') 
            : vehicleForPlateHistory.repair_history;
        
        const totals = filteredHistory.reduce((acc, r) => ({
            baoGia: acc.baoGia + r.tong_tien_bao_gia,
            chiTieu: acc.chiTieu + r.tong_chi_tieu,
            congNo: acc.congNo + r.cong_no,
        }), { baoGia: 0, chiTieu: 0, congNo: 0 });

        return {
            filteredHistory,
            totals,
            completedRoCount: vehicleForPlateHistory.repair_history.filter(r => r.trang_thai.text === 'Hoàn thành').length,
        };

    }, [vehicleForPlateHistory, customerForHistory, filterCompletedRo]);


    const formatCurrency = (value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    const formatDate = (date: Date) => new Intl.DateTimeFormat('vi-VN').format(date);
    const formatNumber = (value: number) => new Intl.NumberFormat('vi-VN').format(value);


    return (
        <div className="p-6 space-y-4 h-full flex flex-col">
            {/* Header */}
            <header className="flex justify-between items-center shrink-0">
                <h1 className="text-2xl font-bold">Khách hàng</h1>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input type="text" placeholder="Tìm bên sở hữu" className="w-64 pl-4 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                            <BellIcon className="h-5 w-5"/>
                        </button>
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                            <div>
                                <p className="font-semibold text-sm">Chủ xưởng</p>
                                <p className="text-xs text-gray-500">Chủ xưởng small</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Action Bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center shrink-0">
                <div className="flex items-center space-x-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2">
                        <PlusIcon className="h-5 w-5"/>
                        <span>Thêm</span>
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md border hover:bg-gray-200 flex items-center space-x-2">
                        <UploadIcon/>
                        <span>Nhập excel</span>
                    </button>
                    <div className="flex items-center border rounded-md">
                        <button className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-md"><MenuIcon className="h-5 w-5"/></button>
                        <button className="px-3 py-2 text-gray-600 hover:bg-gray-100 border-l"><TrashIcon className="h-5 w-5"/></button>
                    </div>
                </div>
                <div className="relative">
                    <input type="text" placeholder="Tìm mã, tên, điện thoại, email" className="w-72 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5"/>
                </div>
            </div>

            {/* Customer Table */}
            <div className="bg-white rounded-lg shadow-sm flex-1 overflow-hidden">
                <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase font-semibold border-b sticky top-0 bg-white z-10">
                            <tr>
                                <th scope="col" className="px-3 py-3 w-12"></th>
                                <th scope="col" className="p-4 w-4">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
                                </th>
                                <th scope="col" className="px-3 py-3">Mã</th>
                                <th scope="col" className="px-3 py-3">Tên</th>
                                <th scope="col" className="px-3 py-3">SĐT</th>
                                <th scope="col" className="px-3 py-3">Email</th>
                                <th scope="col" className="px-3 py-3">CCCD</th>
                                <th scope="col" className="px-3 py-3">Địa chỉ</th>
                                <th scope="col" className="px-3 py-3">Phân loại</th>
                                <th scope="col" className="px-3 py-3">Nhóm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map(customer => (
                                <tr key={customer.ma}
                                    onClick={() => handleSelectCustomer(customer)}
                                    className={`border-b hover:bg-gray-50 cursor-pointer ${selectedCustomer?.ma === customer.ma ? 'bg-blue-50' : 'bg-white'}`}>
                                    <td className="px-3 py-4 text-center">
                                        <button onClick={(e) => { e.stopPropagation(); handleShowHistoryModal(customer); }} className="text-gray-400 hover:text-blue-600" title="Xem lịch sử Khách hàng">
                                            <RotateLeftIcon />
                                        </button>
                                    </td>
                                    <td className="p-4 w-4">
                                        <input type="checkbox" onClick={e => e.stopPropagation()} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"/>
                                    </td>
                                    <td className="px-3 py-4 font-medium text-blue-600 whitespace-nowrap">{customer.ma}</td>
                                    <td className="px-3 py-4 text-gray-900">{customer.ten}</td>
                                    <td className="px-3 py-4">{customer.sdt}</td>
                                    <td className="px-3 py-4">{customer.email}</td>
                                    <td className="px-3 py-4">{customer.cccd}</td>
                                    <td className="px-3 py-4">{customer.diachi}</td>
                                    <td className="px-3 py-4">{customer.phanloai}</td>
                                    <td className="px-3 py-4">{customer.nhom}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Customer Details */}
            {selectedCustomer && (
                <div className="bg-white rounded-lg shadow-sm fixed bottom-0 left-0 right-0 border-t-4 border-blue-500 z-20">
                    <div className="p-4 flex justify-between items-center border-b">
                        <h2 className="font-bold text-lg">Chi tiết khách hàng</h2>
                        <div className="flex items-center space-x-4">
                            <button className="text-blue-600 font-semibold flex items-center space-x-1"><CopyIcon/><span>Sao chép</span></button>
                            <button className="text-blue-600 font-semibold flex items-center space-x-1"><PencilIcon/><span>Sửa</span></button>
                            <button className="text-red-500 font-semibold flex items-center space-x-1"><TrashIcon/><span>Xóa</span></button>
                            <button onClick={handleCloseDetailView} className="text-gray-500 hover:text-gray-800"><CloseIcon className="h-5 w-5"/></button>
                        </div>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 text-sm">
                        <div>
                            <p className="text-gray-500">Mã khách hàng</p>
                            <p className="font-semibold">{selectedCustomer.ma}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Tên khách hàng</p>
                            <p className="font-semibold">{selectedCustomer.ten}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Nhóm</p>
                            <p className="font-semibold">{selectedCustomer.nhom || '---'}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Số điện thoại</p>
                            <p className="font-semibold">{selectedCustomer.sdt || '---'}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Email</p>
                            <p className="font-semibold">{selectedCustomer.email || '---'}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">CCCD</p>
                            <p className="font-semibold">{selectedCustomer.cccd || '---'}</p>
                        </div>
                        <div className="col-span-full">
                            <p className="text-gray-500 mb-2">Địa chỉ</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-gray-400 text-xs">Tỉnh thành</p>
                                    <p className="font-semibold">{(selectedCustomer.diachi || ' , , ').split(', ')[2] || '---'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">Xã / phường</p>
                                    <p className="font-semibold">{(selectedCustomer.diachi || ' , , ').split(', ')[1] || '---'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">Số nhà, tên đường</p>
                                    <p className="font-semibold">{(selectedCustomer.diachi || ' , , ').split(', ')[0] || '---'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
             {/* History Modals */}
             {isHistoryModalOpen && (
                 <>
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleCloseHistoryModal}></div>
                <div className="fixed inset-0 bg-gray-50 z-50">
                    <div className="p-5 border-b flex justify-between items-center bg-white">
                        <div>
                            <h2 className="font-bold text-xl text-gray-800">Danh sách xe</h2>
                            <div className="flex items-center space-x-6 text-sm mt-2">
                                <p><span className="font-semibold text-gray-500">Tên khách:</span> <span className="text-gray-900 font-medium">{customerInfo.customerName}</span></p>
                                <p><span className="font-semibold text-gray-500">Tên công ty:</span> <span className="text-gray-900 font-medium">{customerInfo.companyName}</span></p>
                                <p><span className="font-semibold text-gray-500">Tổng số xe:</span> <span className="text-gray-900 font-medium">{customerInfo.totalVehicles}</span></p>
                            </div>
                        </div>
                        <button onClick={handleCloseHistoryModal} className="text-gray-400 hover:text-gray-800"><CloseIcon className="h-7 w-7"/></button>
                    </div>
                    <div className="p-4 overflow-y-auto" style={{ height: 'calc(100vh - 88px)' }}>
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-600 uppercase font-semibold sticky top-0 z-10">
                                <tr className="bg-gray-100">
                                    <th scope="col" className="p-3 w-12 text-center border-b" rowSpan={2}>STT</th>
                                    <th scope="col" className="p-3 border-b border-l" rowSpan={2}>Biển số xe</th>
                                    <th scope="col" className="p-3 border-b border-l" rowSpan={2}>Hiệu xe</th>
                                    <th scope="col" className="p-3 border-b border-l" rowSpan={2}>Loại xe</th>
                                    <th scope="col" className="p-3 text-center border-b border-l" rowSpan={2}>Tất cả RO</th>
                                    <th scope="col" className="p-3 text-center border-l" colSpan={2}>RO hoàn thành</th>
                                    <th scope="col" className="p-3 border-b border-l" rowSpan={2}>Lần cuối ghé</th>
                                    <th scope="col" className="p-3 text-right border-b border-l" rowSpan={2}>Công nợ</th>
                                    <th scope="col" className="p-3 text-center border-b border-l" rowSpan={2}>Hạng mục chờ</th>
                                </tr>
                                <tr className="bg-gray-100">
                                    <th scope="col" className="p-3 text-center border-b border-l">Tổng RO</th>
                                    <th scope="col" className="p-3 text-right border-b border-l">Tổng chi tiêu</th>
                                </tr>
                                 <tr className='bg-blue-100 text-blue-900 font-bold text-sm'>
                                    <td className="p-3" colSpan={4}>TỔNG CỘNG</td>
                                    <td className="p-3 text-center border-l">{vehicleHistoryTotals.totalRO}</td>
                                    <td className="p-3 text-center border-l">{vehicleHistoryTotals.totalROHoanThanh}</td>
                                    <td className="p-3 text-right border-l">{formatCurrency(vehicleHistoryTotals.totalChiTieu)}</td>
                                    <td className="p-3 border-l"></td>
                                    <td className={`p-3 text-right border-l ${vehicleHistoryTotals.totalCongNo > 0 ? 'text-red-600' : ''}`}>{formatCurrency(vehicleHistoryTotals.totalCongNo)}</td>
                                    <td className="p-3 text-center border-l"></td>
                                </tr>
                            </thead>
                            <tbody>
                            {customerForHistory?.vehicles?.map((vehicle, index) => (
                                <tr key={vehicle.bien_so} onClick={() => handleShowPlateHistoryModal(vehicle)} className="bg-white border-b hover:bg-sky-50 cursor-pointer">
                                    <td className="p-3 text-center">{index + 1}</td>
                                    <td className="p-3 font-medium text-sky-700">{vehicle.bien_so}</td>
                                    <td className="p-3">{vehicle.hieu_xe}</td>
                                    <td className="p-3">{vehicle.loai_xe}</td>
                                    <td className="p-3 text-center">{vehicle.tong_ro}</td>
                                    <td className="p-3 text-center">{vehicle.tong_ro_hoan_thanh}</td>
                                    <td className="p-3 text-right">{formatCurrency(vehicle.tong_chi_tieu)}</td>
                                    <td className="p-3">{formatDate(vehicle.lan_cuoi_ghe)}</td>
                                    <td className={`p-3 text-right ${vehicle.cong_no > 0 ? 'text-red-600 font-semibold' : ''}`}>{formatCurrency(vehicle.cong_no)}</td>
                                    <td className="p-3 text-center"></td>
                                </tr>
                             ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                </>
             )}

            {isPlateHistoryModalOpen && vehicleForPlateHistory && customerForHistory && plateHistoryInfo && (
                <div className="fixed inset-0 bg-gray-50 z-50">
                    <div className="p-5 border-b flex justify-between items-start bg-white">
                        <div>
                            <h2 className="font-bold text-xl text-gray-800 mb-4">Danh sách RO</h2>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center space-x-6">
                                    <p><span className="font-semibold text-gray-500 w-24 inline-block">Tên khách:</span> <span className="text-gray-900 font-medium">{customerInfo.customerName}</span></p>
                                    <p><span className="font-semibold text-gray-500 w-24 inline-block">Tên công ty:</span> <span className="text-gray-900 font-medium">{customerInfo.companyName}</span></p>
                                </div>
                                <div className="flex items-center space-x-6">
                                    <p><span className="font-semibold text-gray-500 w-24 inline-block">Biển số xe:</span> <span className="text-green-600 font-mono font-bold">{vehicleForPlateHistory.bien_so}</span></p>
                                    <p><span className="font-semibold text-gray-500 w-24 inline-block">Hiệu xe:</span> <span className="text-gray-900 font-medium">{vehicleForPlateHistory.hieu_xe}</span></p>
                                    <p><span className="font-semibold text-gray-500 w-24 inline-block">Loại xe:</span> <span className="text-gray-900 font-medium">{vehicleForPlateHistory.loai_xe}</span></p>
                                </div>
                                <div className="flex items-center space-x-6 pt-2">
                                    <p><span className="font-semibold text-gray-500">Tổng RO:</span> <span className="text-gray-900 font-medium bg-gray-200 px-2 py-0.5 rounded-full">{vehicleForPlateHistory.repair_history.length}</span></p>
                                    <p><span className="font-semibold text-gray-500">Tổng RO (hoàn thành):</span> <span className="text-gray-900 font-medium bg-green-200 text-green-800 px-2 py-0.5 rounded-full">{plateHistoryInfo.completedRoCount}</span></p>
                                    <label className="flex items-center space-x-2 cursor-pointer select-none">
                                        <input type="checkbox" checked={filterCompletedRo} onChange={(e) => setFilterCompletedRo(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
                                        <span>Chỉ hiển thị RO hoàn thành</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleClosePlateHistoryModal} className="text-gray-400 hover:text-gray-800"><CloseIcon className="h-7 w-7"/></button>
                    </div>
                    <div className="p-4 overflow-y-auto" style={{ height: 'calc(100vh - 170px)'}}>
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-600 uppercase bg-gray-100 font-semibold sticky top-0 z-10">
                                <tr>
                                    <th scope="col" className="p-3">STT</th>
                                    <th scope="col" className="p-3">Mã RO</th>
                                    <th scope="col" className="p-3">Ngày vào xưởng</th>
                                    <th scope="col" className="p-3">Trạng thái</th>
                                    <th scope="col" className="p-3 text-right">Tổng tiền báo giá</th>
                                    <th scope="col" className="p-3 text-right">Tổng chi tiêu</th>
                                    <th scope="col" className="p-3 text-right">Công nợ</th>
                                    <th scope="col" className="p-3">Cố vấn Gara</th>
                                    <th scope="col" className="p-3">Nội dung Khách yêu cầu</th>
                                    <th scope="col" className="p-3 text-right">Số KM</th>
                                </tr>
                                <tr className="bg-gray-200 font-bold">
                                    <td colSpan={4} className="p-3 text-center">TỔNG CỘNG</td>
                                    <td className="p-3 text-right">{formatCurrency(plateHistoryInfo.totals.baoGia)}</td>
                                    <td className="p-3 text-right">{formatCurrency(plateHistoryInfo.totals.chiTieu)}</td>
                                    <td className={`p-3 text-right ${plateHistoryInfo.totals.congNo > 0 ? 'text-red-600' : ''}`}>{formatCurrency(plateHistoryInfo.totals.congNo)}</td>
                                    <td colSpan={3}></td>
                                </tr>
                            </thead>
                            <tbody>
                                {plateHistoryInfo.filteredHistory.map((repair, index) => (
                                    <tr key={repair.ma_ro} className="bg-white border-b hover:bg-gray-50">
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3 font-medium text-gray-800">{repair.ma_ro}</td>
                                        <td className="p-3">{formatDate(repair.ngay_vao)}</td>
                                        <td className="p-3"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${repair.trang_thai.class}`}>{repair.trang_thai.text}</span></td>
                                        <td className="p-3 text-right">{formatCurrency(repair.tong_tien_bao_gia)}</td>
                                        <td className="p-3 text-right">{formatCurrency(repair.tong_chi_tieu)}</td>
                                        <td className={`p-3 text-right ${repair.cong_no > 0 ? 'text-red-600 font-semibold' : ''}`}>{formatCurrency(repair.cong_no)}</td>
                                        <td className="p-3">{repair.co_van}</td>
                                        <td className="p-3 text-sm">{repair.yeu_cau}</td>
                                        <td className="p-3 text-right">{formatNumber(repair.so_km)} km</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerHistoryModule;
