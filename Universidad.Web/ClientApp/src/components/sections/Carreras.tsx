import { carreras } from '@data/home';
import ImageSlot from '@components/ui/ImageSlot/ImageSlot';
import { useInView } from '@hooks/useInView';

const Carreras = () => {
    const { ref, inView } = useInView<HTMLDivElement>();

    return (
        <section id="carreras" className="bg-fq-surface px-[clamp(20px,5vw,64px)] py-section">
            <div
                ref={ref}
                className={`mx-auto max-w-[1240px] transition-all duration-500 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
            >
                <div className="mb-9 flex flex-wrap items-baseline justify-between gap-4">
                    <div>
                        <div className="mb-2.5 text-[13px] font-bold tracking-wide text-fq-primary-text uppercase">
                            Oferta académica
                        </div>
                        <h2 className="text-h2 font-bold">Elegí tu carrera</h2>
                    </div>
                    <a
                        href="https://www.fq.edu.uy"
                        className="text-sm font-bold text-fq-text transition-colors hover:text-fq-primary-hover"
                    >
                        Ver todas →
                    </a>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-start gap-6">
                    {carreras.map((c) => (
                        <div
                            key={c.imgId}
                            className="flex flex-col overflow-hidden rounded-fq-lg border border-fq-border bg-white transition-[box-shadow,transform] hover:-translate-y-[3px] hover:shadow-fq-hover"
                        >
                            <div className="relative">
                                <ImageSlot alt={c.imgPlaceholder} className="aspect-[16/10] w-full" />
                                <div className="pointer-events-none absolute top-3.5 left-3.5 rounded-full bg-fq-dark/85 px-3 py-1.5 text-xs font-semibold text-white">
                                    {c.duration}
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col p-5">
                                <div className="mb-2 font-display text-lg font-bold">{c.name}</div>
                                <div className="flex-1 text-[14.5px] leading-[1.5] text-fq-muted">
                                    {c.desc}
                                </div>
                                <div className="mt-3.5 text-[13.5px] font-bold text-fq-primary-text">
                                    Conocer más →
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Carreras;
