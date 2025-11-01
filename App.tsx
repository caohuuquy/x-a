import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import InventoryModule from './features/inventory/InventoryModule';
import CustomerHistoryModule from './features/customer-history/CustomerHistoryModule';

type ActiveModule = 'inventory' | 'customer-history';

const App: React.FC = () => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeModule, setActiveModule] = useState<ActiveModule>('inventory');

    return (
        <div className="flex h-screen bg-gray-100 text-gray-800">
            <Sidebar 
                isCollapsed={isSidebarCollapsed} 
                setCollapsed={setSidebarCollapsed}
                activeModule={activeModule}
                setActiveModule={setActiveModule}
            />
            <main className="flex-1 flex flex-col overflow-hidden">
                {activeModule === 'inventory' && <InventoryModule />}
                {activeModule === 'customer-history' && <CustomerHistoryModule />}
            </main>
        </div>
    );
};

export default App;
