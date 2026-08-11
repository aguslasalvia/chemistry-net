import { NavLink, useNavigate } from 'react-router';
import {
    LayoutDashboard,
    FileText,
    Users,
    FolderOpen,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import Logo from '@components/ui/logo/logo';
import { logoutUser } from '@services/user.service';

const NAV_ITEMS = [
    { to: '/panel/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
    { to: '/panel/content', label: 'Contenido', Icon: FileText },
    { to: '/panel/users', label: 'Usuarios', Icon: Users },
    { to: '/panel/groups', label: 'Grupos', Icon: FolderOpen },
    { to: '/panel/settings', label: 'Configuración', Icon: Settings },
];

interface PanelSidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

const PanelSidebar: React.FC<PanelSidebarProps> = ({ collapsed, onToggle }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        navigate('/panel/login', { replace: true });
    };

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-10 flex flex-col border-r border-fq-border bg-white transition-[width] duration-200 ${collapsed ? 'w-[72px]' : 'w-[260px]'}`}
        >
            <div className={`flex items-center gap-2.5 px-4 py-5 ${collapsed ? 'justify-center' : 'justify-between'}`}>
                {!collapsed && (
                    <div className="flex items-center gap-2.5 overflow-hidden">
                        <Logo size={28} />
                        <span className="truncate font-display text-sm font-bold text-fq-text">
                            Facultad de Química
                        </span>
                    </div>
                )}
                <button
                    type="button"
                    onClick={onToggle}
                    className="flex size-9 shrink-0 items-center justify-center rounded-fq text-fq-muted transition-colors hover:bg-fq-surface"
                    aria-label={collapsed ? 'Expandir menú' : 'Colapsar menú'}
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 px-3">
                {NAV_ITEMS.map(({ to, label, Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        title={collapsed ? label : undefined}
                        className={({ isActive }) =>
                            `flex min-h-11 items-center gap-3 rounded-fq px-3 text-sm font-semibold transition-colors ${collapsed ? 'justify-center' : ''} ${
                                isActive
                                    ? 'bg-fq-primary-tint text-fq-primary-text'
                                    : 'text-fq-body hover:bg-fq-surface'
                            }`
                        }
                    >
                        <Icon size={20} className="shrink-0" />
                        {!collapsed && <span>{label}</span>}
                    </NavLink>
                ))}
            </nav>

            <div className="px-3 py-4">
                <button
                    type="button"
                    onClick={handleLogout}
                    title={collapsed ? 'Cerrar sesión' : undefined}
                    className={`flex min-h-11 w-full items-center gap-3 rounded-fq px-3 text-sm font-semibold text-fq-danger transition-colors hover:bg-fq-danger-tint ${collapsed ? 'justify-center' : ''}`}
                >
                    <LogOut size={20} className="shrink-0" />
                    {!collapsed && <span>Cerrar sesión</span>}
                </button>
            </div>
        </aside>
    );
};

export default PanelSidebar;
