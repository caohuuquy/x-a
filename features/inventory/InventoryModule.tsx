
import React, { useState, useCallback } from 'react';
import InventoryList from './InventoryList';
import InventoryForm from './InventoryForm';
import { initialInventoryRecords } from '../../data/mockData';
import { InventoryRecord } from '../../types';

type ViewType = 'list' | 'form';

const InventoryModule: React.FC = () => {
    const [view, setView] = useState<ViewType>('list');
    const [records, setRecords] = useState<InventoryRecord[]>(initialInventoryRecords);
    const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);

    const handleViewRecord = useCallback((id: number) => {
        setSelectedRecordId(id);
        setView('form');
    }, []);

    const handleBackToList = useCallback(() => {
        setSelectedRecordId(null);
        setView('list');
    }, []);
    
    const handleSaveRecord = useCallback((updatedRecord: InventoryRecord) => {
        setRecords(prevRecords => 
            prevRecords.map(rec => rec.id === updatedRecord.id ? updatedRecord : rec)
        );
        handleBackToList();
    }, [handleBackToList]);

    const handleUpdateRecords = useCallback((updatedRecords: InventoryRecord[]) => {
        setRecords(updatedRecords);
    }, []);

    return (
        <>
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="px-6">
                    <nav className="-mb-px flex space-x-6">
                        <button className="py-4 px-1 border-b-2 font-semibold text-sm text-blue-600 border-blue-600">
                            Danh sách
                        </button>
                    </nav>
                </div>
            </header>

            {view === 'list' && (
                <InventoryList
                    records={records}
                    onViewRecord={handleViewRecord}
                    onUpdateRecords={handleUpdateRecords}
                />
            )}
            {view === 'form' && selectedRecordId !== null && (
                <InventoryForm
                    recordId={selectedRecordId}
                    allRecords={records}
                    onBack={handleBackToList}
                    onSave={handleSaveRecord}
                />
            )}
        </>
    );
};

export default InventoryModule;
