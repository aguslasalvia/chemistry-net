import { FlaskConical, GraduationCap, Users, MapPin, ArrowRight, Search, BookOpen, Microscope, Trophy } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-noise"></div>
            <div className="hero-grid"></div>
            <div className="hero-glow"></div>
            <div className="hero-glow-2"></div>

            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-tag">
                        <span className="hero-tag-dot"></span>
                        Universidad de la República · Uruguay
                    </div>

                    <h1 className="hero-title">
                        <span className="hero-title-line">Facultad de</span>
                        <span className="hero-title-line">Química</span>
                    </h1>

                    <p className="hero-description">
                        Formación académica de excelencia, investigación de frontera y compromiso social. 
                        Más de 70 años formando profesionales en las ciencias químicas.
                    </p>

                    <div className="hero-actions">
                        <a href="#carreras" className="btn-hero-primary">
                            Explorar Carreras
                            <ArrowRight />
                        </a>
                        <a href="#investigacion" className="btn-hero-secondary">
                            <Search />
                            Investigación
                        </a>
                    </div>

                    <div className="hero-meta">
                        <div className="hero-meta-item">
                            <MapPin />
                            Montevideo
                        </div>
                        <div className="hero-meta-item">
                            <GraduationCap />
                            Desde 1947
                        </div>
                        <div className="hero-meta-item">
                            <Users />
                            2000+ Estudiantes
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="hero-floating-badge">
                        <Trophy />
                        <span>#1 en Uruguay</span>
                    </div>

                    <div className="hero-cards">
                        <div className="hero-card">
                            <div className="hero-card-icon">
                                <BookOpen />
                            </div>
                            <div className="hero-card-content">
                                <h4>Carreras de Grado</h4>
                                <p>Licenciaturas, ingenierías y profesorados</p>
                            </div>
                            <div className="hero-card-number">12</div>
                        </div>

                        <div className="hero-card">
                            <div className="hero-card-icon">
                                <Microscope />
                            </div>
                            <div className="hero-card-content">
                                <h4>Grupos de Investigación</h4>
                                <p>Proyectos de frontera en química</p>
                            </div>
                            <div className="hero-card-number">40+</div>
                        </div>

                        <div className="hero-card">
                            <div className="hero-card-icon">
                                <FlaskConical />
                            </div>
                            <div className="hero-card-content">
                                <h4>Laboratorios</h4>
                                <p>Infraestructura de primer nivel</p>
                            </div>
                            <div className="hero-card-number">25</div>
                        </div>

                        <div className="hero-card">
                            <div className="hero-card-icon">
                                <Users />
                            </div>
                            <div className="hero-card-content">
                                <h4>Comunidad</h4>
                                <p>Egresados en todo el país</p>
                            </div>
                            <div className="hero-card-number">5K+</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;
