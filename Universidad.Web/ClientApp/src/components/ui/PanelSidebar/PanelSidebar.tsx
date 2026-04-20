import { useState, useEffect } from 'react';
import {
    Settings,
    Bell,
    ChevronLeft,
    ChevronRight,
    LogOut,
    HelpCircle,
    LayoutDashboard,
    FileText,
    FolderOpen,
    Users,
    User
} from 'lucide-react';
import './PanelSidebar.css';

interface PanelSidebarProps {
    defaultCollapsed?: boolean;
}

const PanelSidebar: React.FC<PanelSidebarProps> = ({ defaultCollapsed = true }) => {
    const [collapsed, setCollapsed] = useState(defaultCollapsed);

    useEffect(() => {
        document.body.classList.toggle('sidebar-collapsed', collapsed);
        return () => {
            document.body.classList.remove('sidebar-collapsed');
        };
    }, [collapsed]);

    return (
        <aside className={`panel-sidebar ${collapsed ? 'panel-sidebar--collapsed' : ''}`}>
            <div className="panel-sidebar__header">
                {!collapsed && (
                    <div className="panel-sidebar__brand">
                        <img src="/logo.png" alt="Facultad de Química" />
                        <span>FQ</span>
                    </div>
                )}
                <button
                    className="panel-sidebar__toggle"
                    onClick={() => setCollapsed(!collapsed)}
                    aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <nav className="panel-sidebar__nav">
                <ul className="panel-sidebar__menu">
                    <li>
                        <a href="/panel/dashboard" className="panel-sidebar__item" title={collapsed ? 'Dashboard' : undefined}>
                            <LayoutDashboard size={20} className="panel-sidebar__icon" />
                            {!collapsed && <span>Dashboard</span>}
                        </a>
                    </li>

                    <li>
                        <a href="/panel/content" className="panel-sidebar__item" title={collapsed ? 'Contenido' : undefined}>
                            <FileText size={20} className="panel-sidebar__icon" />
                            {!collapsed && <span>Contenido</span>}
                        </a>
                    </li>

                    <li>
                        <a href="/panel/users" className="panel-sidebar__item" title={collapsed ? 'Usuarios' : undefined}>
                            <Users size={20} className="panel-sidebar__icon" />
                            {!collapsed && <span>Usuarios</span>}
                        </a>
                    </li>

                    <li>
                        <a href="/panel/groups" className="panel-sidebar__item" title={collapsed ? 'Grupos' : undefined}>
                            <FolderOpen size={20} className="panel-sidebar__icon" />
                            {!collapsed && <span>Grupos</span>}
                        </a>
                    </li>

                    <li>
                        <a href="/panel/notificaciones" className="panel-sidebar__item" title={collapsed ? 'Notificaciones' : undefined}>
                            <Bell size={20} className="panel-sidebar__icon" />
                            {!collapsed && <span>Notificaciones</span>}
                        </a>
                    </li>

                    <li>
                        <a href="/panel/settings" className="panel-sidebar__item" title={collapsed ? 'Configuración' : undefined}>
                            <Settings size={20} className="panel-sidebar__icon" />
                            {!collapsed && <span>Configuración</span>}
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="panel-sidebar__footer">
                <a href="/panel/ayuda" className="panel-sidebar__item" title={collapsed ? 'Ayuda' : undefined}>
                    <HelpCircle size={20} className="panel-sidebar__icon" />
                    {!collapsed && <span>Ayuda</span>}
                </a>
                <a href="/panel/cerrar-sesion" className="panel-sidebar__item panel-sidebar__item--logout" title={collapsed ? 'Cerrar sesión' : undefined}>
                    <LogOut size={20} className="panel-sidebar__icon" />
                    {!collapsed && <span>Cerrar sesión</span>}
                </a>
            </div>
        </aside>
    );
};

export default PanelSidebar;