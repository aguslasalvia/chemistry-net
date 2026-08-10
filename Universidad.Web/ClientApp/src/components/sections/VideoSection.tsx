import { Play } from 'lucide-react';
import ImageSlot from '@components/ui/ImageSlot/ImageSlot';

const VideoSection = () => {
    return (
        <section className="px-[clamp(20px,5vw,64px)] py-section text-center">
            <div className="mx-auto max-w-[1240px]">
                <div className="mb-2.5 text-[13px] font-bold tracking-wide text-fq-primary-text uppercase">
                    Conocé la facultad
                </div>
                <h2 className="mx-auto mb-9 max-w-2xl text-h2 font-bold">
                    Un recorrido por nuestros laboratorios y aulas
                </h2>
                <div className="relative mx-auto max-w-[860px]">
                    <ImageSlot
                        alt="Video institucional de la Facultad de Química"
                        className="aspect-video w-full rounded-fq-lg"
                    />
                    <button
                        type="button"
                        className="absolute inset-0 m-auto flex size-16 items-center justify-center rounded-full bg-fq-primary text-white shadow-fq-hover transition-colors hover:bg-fq-primary-hover"
                        aria-label="Reproducir video"
                    >
                        <Play size={26} fill="currentColor" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
