import { ArrowRight, MapPin, GraduationCap } from 'lucide-react';
import './Hero.css';

const elements = [
    { number: 12, symbol: 'Cg', label: 'Carreras de grado' },
    { number: 40, symbol: 'Gi', label: 'Grupos de investigación' },
    { number: 25, symbol: 'Lb', label: 'Laboratorios' },
    { number: 5000, symbol: 'Eg', label: 'Egresados' },
];

const formatNumber = (n: number) => n >= 1000 ? `${Math.round(n / 1000)}K+` : `${n}+`;
const atomicNumber = (i: number) => String(i + 1).padStart(2, '0');

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-container">
                <div className="hero-top">
                    <div className="hero-intro">
                        <p className="hero-eyebrow">Universidad de la República · Uruguay</p>

                        <h1 className="hero-title">
                            Formamos
                            <br />
                            química
                            <br />
                            <span className="hero-title-highlight">desde 1908.</span>
                        </h1>

                        <p className="hero-description">
                            Facultad de Química: formación académica de excelencia, investigación
                            de frontera y compromiso social con el país.
                        </p>

                        <div className="hero-actions">
                            <a href="#carreras" className="hero-cta">
                                Explorar carreras
                                <ArrowRight size={18} />
                            </a>
                            <div className="hero-facts">
                                <span><MapPin size={14} /> Montevideo</span>
                                <span><GraduationCap size={14} /> Desde 1908</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-photo">
                        <div className="hero-photo__block" aria-hidden="true"></div>
                        <img
                            src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&q=80"
                            alt="Estudiantes trabajando en el laboratorio de la Facultad de Química"
                        />
                    </div>
                </div>

                <ul className="hero-elements">
                    {elements.map((el, i) => (
                        <li className="hero-element" key={el.symbol}>
                            <span className="hero-element__atomic">{atomicNumber(i)}</span>
                            <span className="hero-element__symbol">{el.symbol}</span>
                            <span className="hero-element__number">{formatNumber(el.number)}</span>
                            <span className="hero-element__label">{el.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Hero;
