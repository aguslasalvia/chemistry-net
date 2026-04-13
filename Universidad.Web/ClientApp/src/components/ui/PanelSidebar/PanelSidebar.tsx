import { useState, useEffect } from 'react';
import {
    Home,
    Users,
    BookOpen,
    GraduationCap,
    Building2,
    Search,
    FileText,
    Settings,
    Bell,
    ChevronLeft,
    ChevronRight,
    LogOut,
    HelpCircle
} from 'lucide-react';
import './PanelSidebar.css';

interface SidebarItem {
    icon: React.ElementType;
    label: string;
    href?: string;
    children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
    { icon: Home, label: 'Inicio', href: '/' },
    { icon: Users, label: 'Estudiantes', href: '/estudiantes' },
    { icon: GraduationCap, label: 'Docentes', href: '/docentes' },
    { icon: BookOpen, label: 'Cursos', href: '/cursos' },
    { icon: Building2, label: 'Departamentos', href: '/departamentos' },
    { icon: FileText, label: 'Documentos', href: '/documentos' },
    { icon: Search, label: 'Investigación', href: '/investigacion' },
    { icon: Bell, label: 'Notificaciones', href: '/notificaciones' },
    { icon: Settings, label: 'Configuración', href: '/configuracion' },
];

interface PanelSidebarProps {
    defaultCollapsed?: boolean;
}

const PanelSidebar: React.FC<PanelSidebarProps> = ({ defaultCollapsed = false }) => {
    const [collapsed, setCollapsed] = useState(defaultCollapsed);
    const [activeItem, setActiveItem] = useState<string>('Inicio');

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
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeItem === item.label;

                        return (
                            <li key={item.label}>
                                <a
                                    href={item.href || '#'}
                                    className={`panel-sidebar__item ${isActive ? 'panel-sidebar__item--active' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveItem(item.label);
                                    }}
                                    title={collapsed ? item.label : undefined}
                                >
                                    <Icon size={20} className="panel-sidebar__icon" />
                                    {!collapsed && <span>{item.label}</span>}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="panel-sidebar__footer">
                <a
                    href="/ayuda"
                    className="panel-sidebar__item"
                    title={collapsed ? 'Ayuda' : undefined}
                >
                    <HelpCircle size={20} className="panel-sidebar__icon" />
                    {!collapsed && <span>Ayuda</span>}
                </a>
                <a
                    href="/logout"
                    className="panel-sidebar__item panel-sidebar__item--logout"
                    title={collapsed ? 'Cerrar sesión' : undefined}
                >
                    <LogOut size={20} className="panel-sidebar__icon" />
                    {!collapsed && <span>Cerrar sesión</span>}
                </a>
            </div>
        </aside>
    );
};

export default PanelSidebar;
