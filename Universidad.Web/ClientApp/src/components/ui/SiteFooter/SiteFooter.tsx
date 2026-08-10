import Logo from '@components/ui/Logo/Logo';

const FOOTER_LINKS = [
    { href: '#carreras', label: 'Carreras' },
    { href: '#novedades', label: 'Novedades' },
    { href: '#contacto', label: 'Contacto' },
];

const SiteFooter = () => {
    return (
        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-fq-border px-[clamp(20px,5vw,64px)] py-7">
            <div className="flex items-center gap-2.5">
                <Logo size={24} />
                <span className="text-[13px] text-fq-muted">
                    © Facultad de Química — Universidad de la República
                </span>
            </div>
            <nav className="flex gap-5">
                {FOOTER_LINKS.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        className="text-[13px] text-fq-body transition-colors hover:text-fq-primary-hover"
                    >
                        {link.label}
                    </a>
                ))}
            </nav>
        </footer>
    );
};

export default SiteFooter;
