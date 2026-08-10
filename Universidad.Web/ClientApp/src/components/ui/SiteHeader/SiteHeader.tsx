import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '@components/ui/Logo/Logo';

const NAV_LINKS = [
    { href: '#carreras', label: 'Carreras' },
    { href: '#institucion', label: 'Institución' },
    { href: '#novedades', label: 'Novedades' },
    { href: '#contacto', label: 'Contacto' },
];

const SiteHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="sticky top-4 z-20 mx-[clamp(16px,4vw,48px)]">
            <header className="flex items-center justify-between gap-5 rounded-full border border-fq-border/90 bg-white/90 px-5 py-3 shadow-fq backdrop-blur-md">
                <a href="/" className="flex items-center gap-2.5">
                    <Logo size={34} />
                    <span className="font-display text-[15px] leading-tight font-bold text-fq-text">
                        Facultad de Química
                        <span className="block font-sans text-[10.5px] font-medium tracking-wide text-fq-muted">
                            UNIVERSIDAD DE LA REPÚBLICA
                        </span>
                    </span>
                </a>

                <nav className="hidden items-center gap-[clamp(12px,2.6vw,24px)] md:flex">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm font-semibold text-fq-text transition-colors hover:text-fq-primary-hover"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#carreras"
                        className="rounded-full bg-fq-primary px-5 py-2.5 font-display text-sm font-bold text-fq-text transition-colors hover:bg-fq-primary-hover"
                    >
                        Inscribite
                    </a>
                </nav>

                <button
                    type="button"
                    className="flex size-11 items-center justify-center rounded-full text-fq-text md:hidden"
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                    aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </header>

            {menuOpen && (
                <nav
                    id="mobile-menu"
                    className="mt-2 flex flex-col gap-1 rounded-fq-lg border border-fq-border bg-white p-4 shadow-fq md:hidden"
                >
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="min-h-11 rounded-fq px-3 py-3 text-sm font-semibold text-fq-text hover:bg-fq-surface"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#carreras"
                        className="mt-2 min-h-11 rounded-full bg-fq-primary px-5 py-3 text-center font-display text-sm font-bold text-fq-text"
                        onClick={() => setMenuOpen(false)}
                    >
                        Inscribite
                    </a>
                </nav>
            )}
        </div>
    );
};

export default SiteHeader;
