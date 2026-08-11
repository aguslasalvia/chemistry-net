import { UserPlus, BookOpen, HeartHandshake, FileText, Lock, Phone } from 'lucide-react';

const LINKS = [
    { icon: UserPlus, label: 'Inscripciones', href: '#carreras' },
    { icon: BookOpen, label: 'Biblioteca', href: 'https://www.fq.edu.uy' },
    { icon: HeartHandshake, label: 'Bienestar Universitario', href: 'https://www.fq.edu.uy' },
    { icon: FileText, label: 'Bedelía', href: 'https://www.fq.edu.uy' },
    { icon: Lock, label: 'Intranet', href: '/panel/login' },
    { icon: Phone, label: 'Contacto', href: '#contacto' },
];

const QuickLinks = () => {
    return (
        <section className="border-b border-fq-border px-[clamp(20px,5vw,64px)] py-10">
            <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
                {LINKS.map(({ icon: Icon, label, href }) => (
                    <a
                        key={label}
                        href={href}
                        className="flex flex-col items-center gap-2.5 rounded-fq-lg border border-fq-border p-5 text-center transition-colors hover:border-fq-primary hover:bg-fq-surface"
                    >
                        <Icon className="text-fq-primary" size={24} />
                        <span className="text-sm font-semibold text-fq-text">{label}</span>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default QuickLinks;
