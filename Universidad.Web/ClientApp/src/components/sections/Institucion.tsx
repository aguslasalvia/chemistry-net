import ImageSlot from '@components/ui/ImageSlot/ImageSlot';
import { useInView } from '@hooks/useInView';

const FEATURES = [
    { title: 'Pública y gratuita', desc: 'Sin costo de matrícula.' },
    { title: 'Investigación activa', desc: 'Laboratorios en múltiples disciplinas.' },
];

const Institucion = () => {
    const { ref, inView } = useInView<HTMLDivElement>();

    return (
        <section id="institucion" className="px-[clamp(20px,5vw,64px)] py-section">
            <div
                ref={ref}
                className={`mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-12 transition-all duration-500 md:grid-cols-2 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
            >
                <ImageSlot
                    alt="Foto del edificio o laboratorios de la facultad"
                    src="/university.webp"
                    className="aspect-[4/3] w-full rounded-fq-xl"
                />
                <div>
                    <div className="mb-3.5 text-[13px] font-bold tracking-wide text-fq-primary-text uppercase">
                        Institución
                    </div>
                    <h2 className="mb-5 text-h2 leading-[1.15] font-bold">
                        Más de un siglo formando profesionales para el país
                    </h2>
                    <p className="mb-7 text-[16.5px] leading-[1.65] text-fq-body">
                        La Facultad de Química es un servicio público de la Universidad de la
                        República, con sede en Montevideo. Sus orígenes se remontan al Instituto de
                        Química, creado en 1908, hoy convertido en una comunidad de docencia e
                        investigación en ciencias químicas, farmacéuticas y alimentarias.
                    </p>
                    <div className="grid grid-cols-2 gap-5">
                        {FEATURES.map((f) => (
                            <div key={f.title} className="border-l-[3px] border-fq-primary pl-4">
                                <div className="font-display text-base font-bold">{f.title}</div>
                                <div className="mt-1 text-sm text-fq-muted">{f.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Institucion;
