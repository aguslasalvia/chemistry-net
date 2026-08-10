import { CalendarDays, MapPin } from 'lucide-react';

const EVENTOS = [
    { date: '15 de marzo, 2026', title: 'Jornada de puertas abiertas', location: 'Edificio central' },
    { date: '22 de marzo, 2026', title: 'Charla: Química verde y sostenibilidad', location: 'Aula Magna' },
    { date: '28 de marzo, 2026', title: 'Defensa de tesis de maestría', location: 'Sala de posgrados' },
    { date: '5 de abril, 2026', title: 'Feria de carreras UDELAR', location: 'Explanada' },
];

const Agenda = () => {
    return (
        <section id="agenda" className="bg-fq-surface px-[clamp(20px,5vw,64px)] py-section">
            <div className="mx-auto max-w-[1240px]">
                <div className="mb-2.5 text-[13px] font-bold tracking-wide text-fq-primary-text uppercase">
                    Agenda
                </div>
                <h2 className="mb-9 text-h2 font-bold">Próximos eventos</h2>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
                    {EVENTOS.map((e) => (
                        <div
                            key={e.title}
                            className="flex flex-col gap-3 rounded-fq-lg border border-fq-border bg-white p-5"
                        >
                            <div className="flex items-center gap-2 text-xs font-bold tracking-wide text-fq-primary-text uppercase">
                                <CalendarDays size={14} />
                                {e.date}
                            </div>
                            <div className="font-display text-base font-semibold text-fq-text">
                                {e.title}
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-fq-muted">
                                <MapPin size={14} />
                                {e.location}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Agenda;
