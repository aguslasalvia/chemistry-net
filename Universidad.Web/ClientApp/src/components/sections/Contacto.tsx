import ImageSlot from '@components/ui/ImageSlot/ImageSlot';

const Contacto = () => {
    return (
        <section id="contacto" className="bg-fq-primary px-[clamp(20px,5vw,64px)] py-section">
            <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-10 md:grid-cols-2">
                <div>
                    <h2 className="mb-6 text-h2-lg leading-[1.1] font-extrabold text-white">
                        ¿Vamos a estudiar química?
                    </h2>
                    <div className="mb-7 flex flex-col gap-3 text-[15px] text-white/90">
                        <div>
                            <strong>Dirección:</strong> Av. Gral. Flores 2124, Montevideo
                        </div>
                        <div>
                            <strong>Teléfono:</strong> 2924 1880 / 1882 / 1883
                        </div>
                        <div>
                            <strong>Web:</strong>{' '}
                            <a href="https://www.fq.edu.uy" className="text-white underline">
                                www.fq.edu.uy
                            </a>
                        </div>
                    </div>
                    <a
                        href="https://www.fq.edu.uy"
                        className="inline-block rounded-fq bg-white px-7 py-[15px] font-display text-[15px] font-bold text-fq-primary transition-colors hover:bg-fq-primary-tint"
                    >
                        Contactar a la facultad
                    </a>
                </div>
                <ImageSlot
                    alt="Mapa o foto de la entrada de la facultad"
                    className="aspect-[4/3] w-full rounded-fq-lg"
                />
            </div>
        </section>
    );
};

export default Contacto;
