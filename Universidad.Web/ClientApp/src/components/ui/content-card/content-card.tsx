import {
    Calendar,
    User as UserIcon,
    Pencil,
    Trash2,
    Newspaper,
    CalendarDays,
    GraduationCap,
    FileText,
} from 'lucide-react';
import ImageSlot from '@components/ui/image-slot/image-slot';
import type { Content } from '@models/content';

interface ContentCardProps {
    content: Content;
    onEdit?: (content: Content) => void;
    onDelete?: (content: Content) => void;
}

const TYPE_STYLES: Record<Content['type'], { label: string; className: string; Icon: typeof Newspaper }> = {
    News: { label: 'Noticias', className: 'bg-fq-primary text-fq-text', Icon: Newspaper },
    Events: { label: 'Eventos', className: 'bg-fq-primary-tint text-fq-text', Icon: CalendarDays },
    Academic: {
        label: 'Académico',
        className: 'border border-fq-border bg-white text-fq-text',
        Icon: GraduationCap,
    },
    Default: {
        label: 'General',
        className: 'border border-fq-border bg-fq-surface text-fq-muted',
        Icon: FileText,
    },
};

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('es-UY', { day: 'numeric', month: 'short', year: 'numeric' });

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');

const getExcerpt = (html: string, maxLength = 110) => {
    const text = stripHtml(html);
    return text.length <= maxLength ? text : `${text.slice(0, maxLength).trim()}...`;
};

const ContentCard: React.FC<ContentCardProps> = ({ content, onEdit, onDelete }) => {
    const { label, className, Icon } = TYPE_STYLES[content.type];

    return (
        <article className="flex flex-col overflow-hidden rounded-fq-lg border border-fq-border bg-white transition-[box-shadow,transform] hover:-translate-y-[2px] hover:shadow-fq-hover">
            <div className="relative">
                <ImageSlot alt={content.title} src={content.imageUrl} className="aspect-[16/10] w-full" />
                <span
                    className={`absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${className}`}
                >
                    <Icon size={12} />
                    {label}
                </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-xs font-semibold tracking-wide text-fq-primary-text uppercase">
                    {content.groupName}
                </span>
                <h3 className="font-display text-base font-bold text-fq-text">{content.title}</h3>
                <p className="flex-1 text-sm text-fq-muted">{getExcerpt(content.body)}</p>
                <div className="flex items-center gap-4 text-xs text-fq-muted">
                    <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(content.creationDate)}
                    </span>
                    <span className="flex items-center gap-1">
                        <UserIcon size={12} />
                        {content.userName}
                    </span>
                </div>
                {(onEdit || onDelete) && (
                    <div className="flex justify-end gap-2 border-t border-fq-border pt-3">
                        {onEdit && (
                            <button
                                onClick={() => onEdit(content)}
                                title="Editar"
                                className="flex size-8 items-center justify-center rounded-fq border border-fq-border text-fq-muted transition-colors hover:border-fq-primary hover:bg-fq-primary hover:text-white"
                            >
                                <Pencil size={14} />
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={() => onDelete(content)}
                                title="Eliminar"
                                className="flex size-8 items-center justify-center rounded-fq border border-fq-border text-fq-muted transition-colors hover:border-fq-danger hover:bg-fq-danger hover:text-white"
                            >
                                <Trash2 size={14} />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </article>
    );
};

export default ContentCard;
