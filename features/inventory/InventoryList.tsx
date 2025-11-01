
import React, { useState, useMemo } from 'react';
import { InventoryRecord } from '../../types';
import { PlusIcon, LockIcon, PencilIcon, TrashIcon, PrintIcon } from '../../components/icons';

interface InventoryListProps {
    records: InventoryRecord[];
    onViewRecord: (id: number) => void;
    onUpdateRecords: (records: InventoryRecord[]) => void;
}

const InventoryList: React.FC<InventoryListProps> = ({ records, onViewRecord, onUpdateRecords }) => {
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(new Set(records.map(r => r.id)));
        } else {
            setSelectedIds(new Set());
        }
    };

    const handleSelectOne = (id: number) => {
        const newSelectedIds = new Set(selectedIds);
        if (newSelectedIds.has(id)) {
            newSelectedIds.delete(id);
        } else {
            newSelectedIds.add(id);
        }
        setSelectedIds(newSelectedIds);
    };
    
    const handleToggleLock = () => {
        const updatedRecords = records.map(record => {
            if (selectedIds.has(record.id)) {
                return { ...record, isLocked: !record.isLocked };
            }
            return record;
        });
        onUpdateRecords(updatedRecords);
        setSelectedIds(new Set());
    };

    const handlePrint = () => {
        window.open('https://docs.google.com/spreadsheets/d/1xGqNYDoeIYZBacSBHDhupkGz58Rqd5rv/edit?gid=2127710031#gid=2127710031', '_blank');
    };

    const totals = useMemo(() => {
        return records.map(record => {
            const giaTriSoSach = record.vatTu.reduce((sum, item) => sum + (item.slSoSach * item.giaVon), 0);
            const giaTriThucTe = record.vatTu.reduce((sum, item) => sum + (item.slThucTe * item.giaVon), 0);
            return {
                id: record.id,
                giaTriSoSach,
                giaTriThucTe,
                giaTriChenhLech: giaTriThucTe - giaTriSoSach
            };
        });
    }, [records]);

    return (
        <>
            <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
                {selectedIds.size > 0 ? (
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-700">Đã chọn {selectedIds.size} mục</span>
                        <div className="h-6 border-l border-gray-300"></div>
                        <button onClick={handleToggleLock} className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                            <LockIcon /> Đổi Trạng thái Kho
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"><PencilIcon /> Sửa</button>
                        <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"><TrashIcon /> Xóa</button>
                        <button onClick={handlePrint} className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"><PrintIcon /> In</button>
                    </div>
                ) : (
                    <div></div> // Placeholder for alignment
                )}
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <PlusIcon /> Thêm
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Danh sách</h1>
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3 px-4">
                                    <input type="checkbox" onChange={handleSelectAll} checked={selectedIds.size === records.length && records.length > 0} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái Kho</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã kho</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên kho</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày kiểm kê</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người thực hiện</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày chứng từ</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng giá trị sổ sách</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng giá trị thực tế</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng giá trị chênh lệch</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diễn giải</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {records.map((record, index) => {
                                const recordTotals = totals.find(t => t.id === record.id);
                                return (
                                <tr key={record.id} className="hover:bg-gray-50" onClick={() => onViewRecord(record.id)}>
                                    <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                                        <input type="checkbox" onChange={() => handleSelectOne(record.id)} checked={selectedIds.has(record.id)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {record.isLocked 
                                            ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Đã khóa</span>
                                            : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Đang mở</span>
                                        }
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer">{record.maKho}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">{record.tenKho}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">{record.ngayKiemKe}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">{record.nguoiThucHien}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">{record.ngayChungTu}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer text-right">{recordTotals?.giaTriSoSach.toLocaleString('vi-VN')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer text-right">{recordTotals?.giaTriThucTe.toLocaleString('vi-VN')}</td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm cursor-pointer text-right ${recordTotals?.giaTriChenhLech !== 0 ? 'text-red-600 font-medium' : 'text-gray-500'}`}>{recordTotals?.giaTriChenhLech.toLocaleString('vi-VN')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">{record.dienGiai}</td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default InventoryList;
