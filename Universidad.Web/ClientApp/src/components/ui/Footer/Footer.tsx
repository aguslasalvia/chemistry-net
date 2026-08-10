import { MapPin, Phone, Mail } from 'lucide-react';
import './Footer.css';

const locations = [
    {
        name: 'Edificio Central',
        address: 'Av. Gral. Flores 2124',
        phone: 'Tel.: 2924 1880 / 1882 / 1883',
    },
    {
        name: 'Anexo J.P. Sáenz',
        address: 'Isidoro de María 1614',
        phone: 'Tel.: (+598) 2924 1925',
    },
    {
        name: 'Inst. Polo Tecnológico de Pando',
        address: 'By Pass Ruta 101 y Ruta 8 s/n, esq. Saravia, Pando, Canelones',
        phone: 'Tel./Fax: 2292 2021 / 116',
    },
];

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="footer-logo__mark fq-hex">FQ</span>
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
                                    <Mail />
                                    <span>contacto@fq.edu.uy</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-locations">
                    {locations.map((loc) => (
                        <div className="footer-location" key={loc.name}>
                            <h5>{loc.name}</h5>
                            <p><MapPin size={14} /> {loc.address}</p>
                            <p><Phone size={14} /> {loc.phone}</p>
                        </div>
                    ))}
                </div>

                <div className="footer-bottom">
                    <p>© 2026 Facultad de Química - Universidad de la República</p>
                    <div className="footer-social">
                        <a href="#">Instagram</a>
                        <a href="#">X</a>
                        <a href="#">YouTube</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
