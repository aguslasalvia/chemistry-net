import { Link } from 'react-router';
import { FileText } from 'lucide-react';
import type { Content } from '@models/content';

interface ContentHistoryProps {
    items: Content[];
}

const TYPE_LABELS: Record<Content['type'], string> = {
    News: 'Noticias',
    Events: 'Eventos',
    Academic: 'Académico',
    Default: 'General',
};

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('es-UY', { day: 'numeric', month: 'short', year: 'numeric' });

const ContentHistory: React.FC<ContentHistoryProps> = ({ items }) => {
    return (
        <div className="rounded-fq-lg border border-fq-border bg-white p-6">
            <h2 className="mb-1 font-display text-lg font-bold text-fq-text">Actividad reciente</h2>
            <p className="mb-5 text-sm text-fq-muted">Últimos contenidos publicados o editados</p>

            {items.length === 0 ? (
                <p className="text-sm text-fq-muted">Todavía no hay contenido cargado.</p>
            ) : (
                <ul className="flex flex-col divide-y divide-fq-border">
                    {items.map((item) => (
                        <li key={item.id}>
                            <Link
                                to="/panel/content"
                                className="flex items-center gap-4 py-3.5 transition-colors hover:bg-fq-surface"
                            >
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-fq bg-fq-surface text-fq-muted">
                                    <FileText size={16} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="truncate text-sm font-semibold text-fq-text">
                                        {item.title}
                                    </div>
                                    <div className="text-xs text-fq-muted">
                                        {item.groupName} · {TYPE_LABELS[item.type]}
                                    </div>
                                </div>
                                <div className="shrink-0 text-xs text-fq-muted">
                                    {formatDate(item.creationDate)}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ContentHistory;
