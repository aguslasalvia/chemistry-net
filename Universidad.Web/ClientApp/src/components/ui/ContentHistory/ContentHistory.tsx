import { Eye } from 'lucide-react';
import './ContentHistory.css';

interface ContentHistoryItem {
    id: number;
    groupName: string;
    contentType: string;
    title: string;
    modifiedAt: Date;
    href: string;
}

interface ContentHistoryProps {
    items: ContentHistoryItem[];
}

const ContentHistory: React.FC<ContentHistoryProps> = ({ items }) => {
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('es-ES', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const getTypeColor = (type: string) => {
        const colors: Record<string, string> = {
            news: 'news',
            events: 'events',
            academic: 'academic'
        };
        return colors[type.toLowerCase()] || 'default';
    };

    if (items.length === 0) {
        return (
            <div className="content-history">
                <h2>Historial Reciente</h2>
                <p className="content-history__empty">No hay modificaciones recientes</p>
            </div>
        );
    }

    return (
        <div className="content-history">
            <h2>Historial Reciente</h2>
            <div className="content-history__table-wrapper">
                <table className="content-history__table">
                    <thead>
                        <tr>
                            <th>Grupo</th>
                            <th>Tipo</th>
                            <th>Título</th>
                            <th>Última modificación</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.groupName}</td>
                                <td>
                                    <span className={`content-history__type content-history__type--${getTypeColor(item.contentType)}`}>
                                        {item.contentType}
                                    </span>
                                </td>
                                <td className="content-history__title">{item.title}</td>
                                <td className="content-history__date">{formatDate(item.modifiedAt)}</td>
                                <td>
                                    <a href={item.href} className="content-history__view-btn">
                                        <Eye size={16} />
                                        <span>Ver</span>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContentHistory;