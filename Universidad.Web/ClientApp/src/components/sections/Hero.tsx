import ImageSlot from '@components/ui/ImageSlot/ImageSlot';

const Hero = () => {
    return (
        <section className="relative -mt-[72px] flex h-[clamp(480px,80vh,720px)]">
            <ImageSlot
                alt="Foto de estudiantes/laboratorio de la facultad"
                src="/hero.webp"
                className="absolute inset-0 z-0 h-full w-full"
            />
            <div
                className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(100deg,rgba(20,14,10,0.82)_0%,rgba(20,14,10,0.5)_55%,rgba(20,14,10,0.15)_100%)]"
                aria-hidden
            />
            <div className="relative z-[2] flex max-w-[760px] flex-col justify-center px-[clamp(20px,6vw,72px)] pt-24">
                <div className="animate-fade-up mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-fq-primary/90 px-3.5 py-1.5 text-[13px] font-bold text-white [animation-delay:0ms] [animation-fill-mode:both]">
                    Inscripciones abiertas 2027
                </div>
                <h1 className="animate-fade-up mb-5 text-display font-extrabold leading-[1.05] text-white [animation-delay:100ms] [animation-fill-mode:both]">
                    Estudiá química en la universidad pública
                </h1>
                <p className="animate-fade-up mb-8 max-w-[520px] text-lg leading-[1.55] text-white/90 [animation-delay:250ms] [animation-fill-mode:both]">
                    Formamos químicos, farmacéuticos e ingenieros desde 1908, con investigación de
                    punta y sin costo de matrícula.
                </p>
                <div className="animate-fade-up flex flex-wrap gap-3.5 [animation-delay:400ms] [animation-fill-mode:both]">
                    <a
                        href="#carreras"
                        className="rounded-fq bg-fq-primary px-7 py-[15px] font-display text-[15px] font-bold text-fq-text transition-colors hover:bg-fq-primary-hover"
                    >
                        Ver carreras
                    </a>
                    <a
                        href="#contacto"
                        className="rounded-fq bg-white px-7 py-[15px] font-display text-[15px] font-bold text-fq-text transition-colors hover:bg-fq-primary-tint"
                    >
                        Cómo llegar
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
