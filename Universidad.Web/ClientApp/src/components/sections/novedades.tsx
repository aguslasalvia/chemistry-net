import ImageSlot from '@components/ui/image-slot/image-slot';
import { useInView } from '@hooks/use-in-view';
import type { Content } from '@models/content';

interface NovedadesProps {
    items: Content[];
}

const Novedades: React.FC<NovedadesProps> = ({ items }) => {
    const { ref, inView } = useInView<HTMLDivElement>();

    if (items.length === 0) return null;

    return (
        <section id="novedades" className="px-[clamp(20px,5vw,64px)] py-section">
            <div
                ref={ref}
                className={`mx-auto max-w-[1240px] transition-all duration-500 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
            >
                <div className="mb-2.5 text-[13px] font-bold tracking-wide text-fq-primary-text uppercase">
                    Novedades
                </div>
                <h2 className="mb-9 text-h2 font-bold">Lo último de la facultad</h2>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-start gap-6">
                    {items.map((n) => (
                        <a
                            key={n.id}
                            href="https://www.fq.edu.uy"
                            className="flex flex-col overflow-hidden rounded-fq-lg border border-fq-border text-fq-text transition-[box-shadow,transform] hover:-translate-y-[3px] hover:shadow-fq-hover"
                        >
                            <ImageSlot alt={n.title} src={n.imageUrl} className="aspect-[16/10] w-full" />
                            <div className="p-[18px]">
                                {n.subtitle && (
                                    <div className="mb-2 text-xs font-bold tracking-wide text-fq-primary-text uppercase">
                                        {n.subtitle}
                                    </div>
                                )}
                                <div className="mb-2 font-display text-[16.5px] leading-[1.35] font-semibold">
                                    {n.title}
                                </div>
                                <div className="text-[13.5px] leading-[1.5] text-fq-muted">{n.body}</div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Novedades;
