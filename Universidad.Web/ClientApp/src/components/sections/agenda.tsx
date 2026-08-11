import { CalendarDays, MapPin } from 'lucide-react';
import type { Content } from '@models/content';

interface AgendaProps {
    items: Content[];
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('es-UY', { day: 'numeric', month: 'long', year: 'numeric' });

const Agenda: React.FC<AgendaProps> = ({ items }) => {
    if (items.length === 0) return null;

    return (
        <section id="agenda" className="bg-fq-surface px-[clamp(20px,5vw,64px)] py-section">
            <div className="mx-auto max-w-[1240px]">
                <div className="mb-2.5 text-[13px] font-bold tracking-wide text-fq-primary-text uppercase">
                    Agenda
                </div>
                <h2 className="mb-9 text-h2 font-bold">Próximos eventos</h2>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
                    {items.map((e) => (
                        <div
                            key={e.id}
                            className="flex flex-col gap-3 rounded-fq-lg border border-fq-border bg-white p-5"
                        >
                            <div className="flex items-center gap-2 text-xs font-bold tracking-wide text-fq-primary-text uppercase">
                                <CalendarDays size={14} />
                                {formatDate(e.creationDate)}
                            </div>
                            <div className="font-display text-base font-semibold text-fq-text">
                                {e.title}
                            </div>
                            {e.subtitle && (
                                <div className="flex items-center gap-1.5 text-sm text-fq-muted">
                                    <MapPin size={14} />
                                    {e.subtitle}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Agenda;
