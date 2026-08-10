import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-6 animate-fade-in"
            onClick={onClose}
        >
            <div
                className="flex max-h-[calc(100vh-48px)] w-full max-w-[500px] flex-col overflow-hidden rounded-fq-lg border border-fq-border bg-fq-panel shadow-fq animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex shrink-0 items-center justify-between border-b border-fq-border px-6 py-5">
                    {title && <h2 className="font-display text-xl font-semibold text-fq-text">{title}</h2>}
                    <button
                        className="flex size-9 items-center justify-center rounded-fq border border-fq-border text-fq-muted transition-colors hover:border-fq-primary hover:bg-fq-primary hover:text-white"
                        onClick={onClose}
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="overflow-y-auto p-6">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
