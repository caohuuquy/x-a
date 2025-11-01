
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { InventoryRecord, Material } from '../../types';
import { ArrowLeftIcon, UploadIcon } from '../../components/icons';
import { warehouses, generateNewMaterials } from '../../data/mockData';

interface InventoryFormProps {
    recordId: number;
    allRecords: InventoryRecord[];
    onBack: () => void;
    onSave: (record: InventoryRecord) => void;
}

const formatCurrency = (value: number) => value.toLocaleString('vi-VN');

const InventoryForm: React.FC<InventoryFormProps> = ({ recordId, allRecords, onBack, onSave }) => {
    const [record, setRecord] = useState<InventoryRecord | null>(null);
    const [materials, setMaterials] = useState<Material[]>([]);

    useEffect(() => {
        const foundRecord = allRecords.find(r => r.id === recordId);
        if (foundRecord) {
            setRecord(JSON.parse(JSON.stringify(foundRecord))); // Deep copy
            setMaterials(JSON.parse(JSON.stringify(foundRecord.vatTu))); // Deep copy
        }
    }, [recordId, allRecords]);

    const handleInputChange = <K extends keyof InventoryRecord>(
        field: K,
        value: InventoryRecord[K]
    ) => {
        if (record) {
            const newRecord = { ...record, [field]: value };
             if (field === 'maKho') {
                newRecord.tenKho = warehouses[value as string] || '';
                setMaterials([]); // Clear materials list on warehouse change
            }
            setRecord(newRecord);
        }
    };

    const handleMaterialChange = (index: number, field: keyof Material, value: string | number) => {
        const newMaterials = [...materials];
        const materialToUpdate = { ...newMaterials[index] };
        
        if (field === 'slThucTe' || field === 'ghiChu') {
             (materialToUpdate[field] as any) = field === 'slThucTe' ? Number(value) : value;
        }

        newMaterials[index] = materialToUpdate;
        setMaterials(newMaterials);
    };

    const handleSave = () => {
        if (record) {
            onSave({ ...record, vatTu: materials });
        }
    };
    
    const handleAddMaterials = useCallback(() => {
        const newMaterials = generateNewMaterials(10);
        setMaterials(prev => [...prev, ...newMaterials]);
    }, []);

    const handleClearMaterials = useCallback(() => {
        setMaterials([]);
    }, []);

    const summary = useMemo(() => {
        let tongGiaTriSoSach = 0;
        let tongGiaTriThucTe = 0;

        materials.forEach(item => {
            tongGiaTriSoSach += item.slSoSach * item.giaVon;
            tongGiaTriThucTe += item.slThucTe * item.giaVon;
        });

        const tongGiaTriChenhLech = tongGiaTriThucTe - tongGiaTriSoSach;

        return { tongGiaTriSoSach, tongGiaTriThucTe, tongGiaTriChenhLech };
    }, [materials]);

    if (!record) {
        return <div className="p-6">Đang tải...</div>;
    }

    return (
        <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center mb-4">
                <button onClick={onBack} className="p-2 rounded-md hover:bg-gray-200 mr-2">
                    <ArrowLeftIcon />
                </button>
                <h1 className="text-2xl font-bold">Chi tiết Phiếu Kiểm Kê</h1>
            </div>
            <div className="bg-white rounded-lg shadow p-8 max-w-full mx-auto">
                {/* Form Fields */}
                <div className="space-y-6">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Số chứng từ</label>
                            <input type="text" value={record.soChungTu} onChange={e => handleInputChange('soChungTu', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ngày chứng từ</label>
                            <input type="date" value={record.ngayChungTu} onChange={e => handleInputChange('ngayChungTu', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Trạng thái chứng từ</label>
                            <select value={record.trangThaiChungTu} onChange={e => handleInputChange('trangThaiChungTu', e.target.value as 'lap-chung-tu' | 'chuyen-so-cai')} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                                <option value="lap-chung-tu">Lập chứng từ</option>
                                <option value="chuyen-so-cai">Chuyển sổ cái</option>
                            </select>
                        </div>
                    </div>
                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Mã kho</label>
                            <select value={record.maKho} onChange={e => handleInputChange('maKho', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                                {Object.keys(warehouses).map(key => <option key={key} value={key}>{key}</option>)}
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Tên kho</label>
                            <input type="text" value={record.tenKho} readOnly className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ngày kiểm kê</label>
                            <input type="date" value={record.ngayKiemKe} onChange={e => handleInputChange('ngayKiemKe', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                    </div>
                    {/* Row 3 */}
                    <div>
                         <label className="block text-sm font-medium text-gray-700">Diễn giải</label>
                         <input type="text" value={record.dienGiai} onChange={e => handleInputChange('dienGiai', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    {/* Row 4 */}
                    <div className="pt-2">
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 mb-4">
                            <UploadIcon /> Đính kèm tệp
                        </button>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Cột số lượng sổ sách khi in</label>
                            <div className="flex items-center gap-6">
                                <label className="flex items-center">
                                    <input type="radio" name="slThucTeOption" value="de-trong" checked={record.slThucTeOption === 'de-trong'} onChange={() => handleInputChange('slThucTeOption', 'de-trong')} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                    <span className="ml-2 text-sm">Để trống</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="radio" name="slThucTeOption" value="ton-kho" checked={record.slThucTeOption === 'ton-kho'} onChange={() => handleInputChange('slThucTeOption', 'ton-kho')} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                    <span className="ml-2 text-sm">Tồn kho hiện tại</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Materials List */}
                <div className="mt-8 pt-6 border-t">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Danh sách Vật tư</h2>
                        <div className="flex items-center gap-3">
                            <button onClick={handleAddMaterials} className="px-3 py-1.5 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">Hiển thị tất cả vật tư</button>
                            <button onClick={handleClearMaterials} className="px-3 py-1.5 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50">Xóa tất cả vật tư</button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {['STT', 'Mã Vật Tư', 'Tên Vật Tư', 'Mã quốc tế', 'Diễn giải', 'ĐVT', 'SL sổ sách', 'Giá vốn', 'Tổng giá trị sổ sách', 'SL thực tế', 'SL Chêch lệch', 'Tổng giá trị thực tế', 'Tổng giá trị chênh lệch', 'Ghi Chú'].map(h => 
                                    <th key={h} scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>)}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {materials.map((item, index) => {
                                    const tongGiaTriSoSach = item.slSoSach * item.giaVon;
                                    const slChenhLech = item.slSoSach - item.slThucTe;
                                    const tongGiaTriThucTe = item.slThucTe * item.giaVon;
                                    const tongGiaTriChenhLech = slChenhLech * item.giaVon;
                                    return (
                                    <tr key={index}>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.ten}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.maQuocTe}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.dienGiaiVatTu}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.dvt}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-right">{item.slSoSach}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-right">{formatCurrency(item.giaVon)}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-right">{formatCurrency(tongGiaTriSoSach)}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                                            <input type="number" value={item.slThucTe} onChange={(e) => handleMaterialChange(index, 'slThucTe', e.target.value)} className="w-24 px-2 py-1 border border-gray-300 rounded-md text-right focus:ring-blue-500 focus:border-blue-500" />
                                        </td>
                                        <td className={`px-4 py-2 whitespace-nowrap text-sm text-right ${slChenhLech !== 0 ? 'text-red-600 font-semibold' : ''}`}>{slChenhLech}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-right">{formatCurrency(tongGiaTriThucTe)}</td>
                                        <td className={`px-4 py-2 whitespace-nowrap text-sm text-right ${tongGiaTriChenhLech !== 0 ? 'text-red-600 font-semibold' : ''}`}>{formatCurrency(tongGiaTriChenhLech)}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                                            <input type="text" value={item.ghiChu} onChange={(e) => handleMaterialChange(index, 'ghiChu', e.target.value)} className="w-40 px-2 py-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                                        </td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                    </div>
                    {/* Summary Row */}
                     <div className="mt-4 flex justify-end">
                        <div className="w-full max-w-5xl grid grid-cols-12 gap-4 text-sm font-semibold">
                            <div className="col-start-9 text-right">Tổng giá trị:</div>
                            <div className="col-span-1 text-right">{formatCurrency(summary.tongGiaTriSoSach)}</div>
                            <div className="col-start-12 col-span-1 text-right">{formatCurrency(summary.tongGiaTriThucTe)}</div>
                            <div className="col-start-13 col-span-1 text-right text-red-600">{formatCurrency(summary.tongGiaTriChenhLech)}</div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 pt-6 border-t flex justify-end gap-3">
                    <button onClick={onBack} type="button" className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Hủy</button>
                    <button onClick={handleSave} type="button" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Lưu thay đổi</button>
                </div>
            </div>
        </div>
    );
};

export default InventoryForm;
