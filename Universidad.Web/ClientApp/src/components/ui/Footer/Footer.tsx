import { MapPin, Phone, Mail, GraduationCap } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <GraduationCap />
                            <span>Facultad de Química</span>
                        </div>
                        <p className="footer-description">
                            Universidad de la República
                        </p>
                    </div>

                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Institución</h4>
                            <ul>
                                <li><a href="#">Historia</a></li>
                                <li><a href="#">Autoridades</a></li>
                                <li><a href="#">Estatuto</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Académico</h4>
                            <ul>
                                <li><a href="#">Carreras</a></li>
                                <li><a href="#">Posgrados</a></li>
                                <li><a href="#">Investigación</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Contacto</h4>
                            <ul>
                                <li className="footer-contact-item">
                                    <MapPin />
                                    <span>Montevideo, Uruguay</span>
                                </li>
                                <li className="footer-contact-item">
                                    <Phone />
                                    <span>+598 2 525 8618</span>
                                </li>
                                <li className="footer-contact-item">
                                    <Mail />
                                    <span>contacto@fq.edu.uy</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 Facultad de Química - Universidad de la República</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
