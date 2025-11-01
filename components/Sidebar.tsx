import React from 'react';
import { EditIcon, UsersIcon, MenuIcon, ArchiveBoxIcon } from './icons';

type ActiveModule = 'inventory' | 'customer-history';

interface SidebarProps {
    isCollapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    activeModule: ActiveModule;
    setActiveModule: (module: ActiveModule) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setCollapsed, activeModule, setActiveModule }) => {
    return (
        <aside 
            className="flex flex-col bg-white shadow-md transition-all duration-300 ease-in-out" 
            style={{ width: isCollapsed ? '80px' : '256px' }}
        >
            <div className="flex items-center justify-center h-16 border-b shrink-0 px-4">
                <div className={`flex items-center gap-2 ${isCollapsed ? 'hidden' : ''}`}>
                    <EditIcon className="h-8 w-8 text-blue-600" />
                    <span className="text-xl font-semibold">Dashboard</span>
                </div>
                <div className={`flex items-center ${isCollapsed ? '' : 'hidden'}`}>
                    <EditIcon className="h-8 w-8 text-blue-600" />
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-2">
                    <li>
                        <a href="#" onClick={(e) => { e.preventDefault(); setActiveModule('inventory'); }} className={`flex items-center p-2 text-base font-normal rounded-lg ${activeModule === 'inventory' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`}>
                            <UsersIcon className="h-6 w-6 text-gray-500" />
                            {!isCollapsed && <span className="ml-3 menu-text">Kiểm kê</span>}
                        </a>
                    </li>
                     <li>
                        <a href="#" onClick={(e) => { e.preventDefault(); setActiveModule('customer-history'); }} className={`flex items-center p-2 text-base font-normal rounded-lg ${activeModule === 'customer-history' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`}>
                            <ArchiveBoxIcon className="h-6 w-6 text-gray-500" />
                            {!isCollapsed && <span className="ml-3 menu-text">Lịch sử khách hàng & xe</span>}
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="p-4 border-t mt-auto shrink-0">
                <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-2 ${isCollapsed ? 'hidden' : ''}`}>
                        <img className="h-8 w-8 rounded-full object-cover" src="https://picsum.photos/40/40" alt="Avatar" />
                        <div>
                            <p className="text-sm font-semibold">Bảo hiểm</p>
                        </div>
                    </div>
                    <button onClick={() => setCollapsed(!isCollapsed)} className="p-2 rounded-md hover:bg-gray-200">
                        <MenuIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
