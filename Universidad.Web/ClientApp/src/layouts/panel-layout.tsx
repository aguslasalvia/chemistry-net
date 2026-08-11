import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { Toaster } from 'react-hot-toast';
import PanelSidebar from '@components/ui/panel-sidebar/panel-sidebar';
import { getCurrentUser } from '@services/user.service';
import type { User } from '@models/user';

const PanelLayout = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUser().then((current) => {
            if (current) {
                setUser(current);
            } else {
                navigate('/panel/login', { replace: true });
            }
            setChecked(true);
        });
    }, [navigate]);

    // Blank while checking the session, or during the redirect to login.
    if (!checked || !user) return null;

    return (
        <div className="min-h-dvh bg-fq-surface">
            <PanelSidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
            <main
                className={`min-h-dvh p-8 transition-[margin] duration-200 ${collapsed ? 'ml-[72px]' : 'ml-[260px]'}`}
            >
                <Outlet context={user} />
            </main>
            <Toaster position="top-right" />
        </div>
    );
};

export default PanelLayout;
