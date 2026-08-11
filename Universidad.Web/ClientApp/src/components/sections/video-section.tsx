import { useInView } from '@hooks/use-in-view';

const VideoSection = () => {
    const { ref, inView } = useInView<HTMLDivElement>();

    return (
        <section className="px-[clamp(20px,5vw,64px)] py-section text-center">
            <div
                ref={ref}
                className={`mx-auto max-w-[1240px] transition-all duration-500 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
            >
                <div className="mb-2.5 text-[13px] font-bold tracking-wide text-fq-primary-text uppercase">
                    Conocé la facultad
                </div>
                <h2 className="mx-auto mb-9 max-w-2xl text-h2 font-bold">
                    Un recorrido por nuestros laboratorios y aulas
                </h2>
                <div className="relative mx-auto aspect-video w-full max-w-[860px] overflow-hidden rounded-fq-lg border border-fq-border shadow-fq">
                    <iframe
                        className="absolute inset-0 h-full w-full"
                        src="https://www.youtube.com/embed/hXMPTbijEIM"
                        title="Video institucional de la Facultad de Química"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
