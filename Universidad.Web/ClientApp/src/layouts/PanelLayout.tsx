import { useState } from 'react';
import { Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';
import PanelSidebar from '@components/ui/PanelSidebar/PanelSidebar';

const PanelLayout = () => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <div className="min-h-dvh bg-fq-surface">
            <PanelSidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
            <main
                className={`min-h-dvh p-8 transition-[margin] duration-200 ${collapsed ? 'ml-[72px]' : 'ml-[260px]'}`}
            >
                <Outlet />
            </main>
            <Toaster position="top-right" />
        </div>
    );
};

export default PanelLayout;
