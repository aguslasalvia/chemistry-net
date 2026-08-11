import { useState } from 'react';
import { Menu, X, ChevronDown, Landmark, GraduationCap, Briefcase, Award, Building2, type LucideIcon } from 'lucide-react';
import Logo from '@components/ui/logo/logo';

interface NavLink {
    label: string;
    href: string;
}

interface NavSection {
    label: string;
    icon: LucideIcon;
    links: NavLink[];
}

const NAV_SECTIONS: NavSection[] = [
    {
        label: 'Facultad',
        icon: Landmark,
        links: [
            { label: 'Institución', href: '/Facultad/Institucion' },
            { label: 'Departamentos', href: '/Facultad/Departamentos' },
            { label: 'Administración', href: '/Facultad/Administracion' },
            { label: 'Investigación', href: '/Facultad/Investigacion' },
            { label: 'Extensión', href: '/Facultad/Extension' },
            { label: 'Enseñanza', href: '/Facultad/Ensenanza' },
        ],
    },
    {
        label: 'Estudiantes',
        icon: GraduationCap,
        links: [
            { label: 'Bedelía', href: '/Estudiantes/Bedelia' },
            { label: 'Carreras', href: '/Estudiantes/Carreras' },
            { label: 'Futuros estudiantes', href: '/Estudiantes/FuturosEstudiantes' },
            { label: 'Estudiantes de pregrado', href: '/Estudiantes/Pregrado' },
            { label: 'Estudiantes de grado', href: '/Estudiantes/Grado' },
            { label: 'Estudiantes de posgrado', href: '/Estudiantes/Posgrado' },
            { label: 'Aulas virtuales', href: '/Estudiantes/AulasVirtuales' },
            { label: 'Apoyo al estudiante', href: '/Estudiantes/ApoyoEstudiante' },
            { label: 'Educación permanente', href: '/Estudiantes/EducacionPermanente' },
        ],
    },
    {
        label: 'Funcionarios',
        icon: Briefcase,
        links: [
            { label: 'Docentes', href: '/Funcionarios/Docentes' },
            { label: 'Funcionarios TAS', href: '/Funcionarios/FuncionariosTas' },
            { label: 'Trámites', href: '/Funcionarios/Tramites' },
        ],
    },
    {
        label: 'Egresados',
        icon: Award,
        links: [
            { label: 'Educación permanente', href: '/Egresados/EducacionPermanente' },
            { label: 'Unidad de inserción laboral', href: '/Egresados/InsercionLaboral' },
        ],
    },
    {
        label: 'Empresas',
        icon: Building2,
        links: [
            { label: 'Educación permanente', href: '/Empresas/EducacionPermanente' },
            { label: 'Asesoramiento', href: '/Empresas/Asesoramiento' },
            { label: 'Unidad de inserción laboral', href: '/Empresas/InsercionLaboral' },
        ],
    },
];

const SiteHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openSection, setOpenSection] = useState<string | null>(null);

    const toggleMobileSection = (label: string) => {
        setOpenSection((current) => (current === label ? null : label));
    };

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

                <nav className="hidden items-center gap-[clamp(10px,2vw,20px)] lg:flex">
                    {NAV_SECTIONS.map((section) => (
                        <div key={section.label} className="group relative">
                            <button
                                type="button"
                                className="flex items-center gap-1 rounded-fq px-1 py-2 text-sm font-semibold text-fq-text transition-colors hover:text-fq-primary-hover"
                            >
                                {section.label}
                                <ChevronDown
                                    size={14}
                                    className="transition-transform duration-150 group-hover:rotate-180"
                                />
                            </button>
                            {/* Outer bridge: starts flush at top-full (pt-1, not mt-1) so the 4px
                                gap to the button stays part of the hoverable hit box — a margin
                                gap here would create a dead zone that closes the menu before the
                                pointer reaches it. */}
                            <div className="invisible absolute top-full left-0 z-10 pt-1 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                                <div className="w-56 -translate-y-1 rounded-fq-lg border border-fq-border bg-white p-2 shadow-fq-hover transition-transform duration-150 group-hover:translate-y-0 group-focus-within:translate-y-0">
                                    {section.links.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            className="block rounded-fq px-3 py-2 text-sm text-fq-body transition-colors hover:bg-fq-surface hover:text-fq-text"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                    <a
                        href="/Contacto"
                        className="rounded-full bg-fq-primary px-5 py-2.5 font-display text-sm font-bold text-fq-text transition-colors hover:bg-fq-primary-hover"
                    >
                        Contacto
                    </a>
                </nav>

                <button
                    type="button"
                    className="flex size-11 items-center justify-center rounded-full text-fq-text lg:hidden"
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
                    className="animate-slide-down absolute inset-x-0 top-full mt-2 flex max-h-[70vh] flex-col gap-1 overflow-y-auto rounded-fq-lg border border-fq-border bg-white p-4 shadow-fq lg:hidden"
                >
                    {NAV_SECTIONS.map((section, index) => (
                        <div
                            key={section.label}
                            className="animate-fade-up border-b border-fq-border [animation-fill-mode:both] last:border-0"
                            style={{ animationDelay: `${50 + index * 40}ms` }}
                        >
                            <button
                                type="button"
                                onClick={() => toggleMobileSection(section.label)}
                                aria-expanded={openSection === section.label}
                                className="flex min-h-11 w-full items-center justify-between rounded-fq px-3 text-sm font-semibold text-fq-text hover:bg-fq-surface"
                            >
                                <span className="flex items-center gap-2.5">
                                    <section.icon size={18} className="text-fq-primary" />
                                    {section.label}
                                </span>
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform ${openSection === section.label ? 'rotate-180' : ''}`}
                                />
                            </button>
                            {openSection === section.label && (
                                <div className="flex flex-col gap-1 pb-2 pl-3">
                                    {section.links.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            className="min-h-11 rounded-fq px-3 py-2.5 text-sm text-fq-body hover:bg-fq-surface"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <a
                        href="/Contacto"
                        className="animate-fade-up mt-2 min-h-11 rounded-full bg-fq-primary px-5 py-3 text-center font-display text-sm font-bold text-fq-text [animation-fill-mode:both]"
                        style={{ animationDelay: `${50 + NAV_SECTIONS.length * 40}ms` }}
                        onClick={() => setMenuOpen(false)}
                    >
                        Contacto
                    </a>
                </nav>
            )}
        </div>
    );
};

export default SiteHeader;
