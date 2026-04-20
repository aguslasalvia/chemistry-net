import { Calendar, Clock, Pencil, Trash2, Eye } from 'lucide-react';
import './ContentCard.css';

export interface ContentCardProps {
    id: number;
    title: string;
    body: string;
    imageUrl?: string;
    creationDate: Date;
    groupName: string;
    userName: string;
    type: 'News' | 'Events' | 'Academic' | 'Default';
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
    id,
    title,
    body,
    imageUrl,
    creationDate,
    groupName,
    userName,
    type,
    onEdit,
    onDelete
}) => {
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const stripHtml = (html: string) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    const getExcerpt = (html: string, maxLength = 100) => {
        const text = stripHtml(html);
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    };

    const getTypeColor = (contentType: string) => {
        switch (contentType) {
            case 'News': return 'var(--fq-primary)';
            case 'Events': return '#8b5cf6';
            case 'Academic': return '#10b981';
            default: return 'var(--fq-muted)';
        }
    };

    return (
        <article className="content-card">
            <div className="content-card__image">
                {imageUrl ? (
                    <img src={imageUrl} alt={title} />
                ) : (
                    <div className="content-card__placeholder">
                        <span>{groupName.charAt(0)}</span>
                    </div>
                )}
                <span 
                    className="content-card__type"
                    style={{ backgroundColor: getTypeColor(type) }}
                >
                    {type}
                </span>
            </div>
            <div className="content-card__content">
                <div className="content-card__header">
                    <span className="content-card__group">{groupName}</span>
                </div>
                <h3 className="content-card__title">{title}</h3>
                <p className="content-card__excerpt">{getExcerpt(body)}</p>
                <div className="content-card__meta">
                    <div className="content-card__meta-item">
                        <Calendar size={12} />
                        <span>{formatDate(creationDate)}</span>
                    </div>
                    <div className="content-card__meta-item">
                        <Clock size={12} />
                        <span>{userName}</span>
                    </div>
                </div>
                <div className="content-card__actions">
                    <button 
                        className="content-card__action-btn"
                        title="Ver contenido"
                    >
                        <Eye size={14} />
                    </button>
                    <button 
                        className="content-card__action-btn"
                        onClick={() => onEdit?.(id)}
                        title="Editar"
                    >
                        <Pencil size={14} />
                    </button>
                    <button 
                        className="content-card__action-btn content-card__action-btn--delete"
                        onClick={() => onDelete?.(id)}
                        title="Eliminar"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ContentCard;