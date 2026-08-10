import { GraduationCap, CalendarDays, ShieldAlert, Users2 } from 'lucide-react';
import './QuickLinks.css';

const links = [
    { icon: GraduationCap, label: 'Bedelía', href: '#' },
    { icon: CalendarDays, label: 'Calendario 2024', href: '#' },
    { icon: ShieldAlert, label: 'Violencia, Acoso y Discriminación', href: '#' },
    { icon: Users2, label: 'Comisión de Género', href: '#' },
];

const QuickLinks = () => (
    <nav className="quicklinks" aria-label="Accesos rápidos">
        <div className="quicklinks-container">
            {links.map((l) => (
                <a className="quicklinks-item" href={l.href} key={l.label}>
                    <l.icon size={16} />
                    <span>{l.label}</span>
                </a>
            ))}
        </div>
    </nav>
);

export default QuickLinks;
