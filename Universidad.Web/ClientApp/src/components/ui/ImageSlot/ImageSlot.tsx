import { Image as ImageIcon } from 'lucide-react';

interface ImageSlotProps {
    alt: string;
    src?: string;
    className?: string;
}

/** Renders a real photo when `src` is provided; otherwise a dashed placeholder
 *  showing the alt text, so layout/design reads as intentional before real
 *  photos exist. Swap in `src` later without touching layout. */
const ImageSlot: React.FC<ImageSlotProps> = ({ alt, src, className = '' }) => {
    if (src) {
        return <img src={src} alt={alt} className={`object-cover ${className}`} />;
    }

    return (
        <div
            className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed border-fq-border bg-fq-surface p-4 text-center ${className}`}
        >
            <ImageIcon className="shrink-0 text-fq-muted" size={28} aria-hidden />
            <span className="text-xs text-fq-muted">{alt}</span>
        </div>
    );
};

export default ImageSlot;
