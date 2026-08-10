import { noticias } from '@data/home';
import ImageSlot from '@components/ui/ImageSlot/ImageSlot';

const Novedades = () => {
    return (
        <section id="novedades" className="px-[clamp(20px,5vw,64px)] py-section">
            <div className="mx-auto max-w-[1240px]">
                <div className="mb-2.5 text-[13px] font-bold tracking-wide text-fq-primary-text uppercase">
                    Novedades
                </div>
                <h2 className="mb-9 text-h2 font-bold">Lo último de la facultad</h2>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-start gap-6">
                    {noticias.map((n) => (
                        <a
                            key={n.imgId}
                            href="https://www.fq.edu.uy"
                            className="flex flex-col overflow-hidden rounded-fq-lg border border-fq-border text-fq-text transition-[box-shadow,transform] hover:-translate-y-[3px] hover:shadow-fq-hover"
                        >
                            <ImageSlot alt="Imagen de la noticia" className="aspect-[16/10] w-full" />
                            <div className="p-[18px]">
                                <div className="mb-2 text-xs font-bold tracking-wide text-fq-primary-text uppercase">
                                    {n.tag}
                                </div>
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
