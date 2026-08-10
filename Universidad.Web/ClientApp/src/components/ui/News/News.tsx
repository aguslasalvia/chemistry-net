import { TrendingUp } from 'lucide-react';
import NewsCard from './NewsCard';
import './News.css';

const newsData = [
    {
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
        category: 'Investigación',
        title: 'Ciencia e innovación para mejorar la calidad nutricional del pan',
        excerpt: 'Un equipo de la facultad investiga cómo optimizar el valor nutricional de uno de los alimentos más consumidos del país.',
        date: '2026',
        readTime: '4 min'
    },
    {
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
        category: 'Académico',
        title: 'Formación para una práctica segura en el laboratorio',
        excerpt: 'Un ciclo de capacitación para estudiantes y funcionarios sobre normas de seguridad en el trabajo de laboratorio.',
        date: '2026',
        readTime: '3 min'
    },
    {
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
        category: 'Institucional',
        title: 'Puerta al futuro: restauración del edificio histórico',
        excerpt: 'Avanza la restauración de la entrada principal de la facultad, parte del patrimonio edilicio de la institución.',
        date: '2026',
        readTime: '3 min'
    }
];

const News = () => {
    return (
        <section className="news">
            <div className="news-background"></div>
            <div className="news-container">
                <div className="news-header">
                    <div className="news-header-content">
                        <p className="news-eyebrow">Noticias</p>
                        <h2 className="news-title">
                            Últimas noticias de la
                            <span className="news-title-accent"> Facultad</span>
                        </h2>
                        <p className="news-description">
                            Mantente informado sobre las últimas novedades en investigación, 
                            académico y vida universitaria de la Facultad de Química.
                        </p>
                    </div>
                    <a href="#" className="news-view-all">
                        Ver todas las noticias
                        <TrendingUp />
                    </a>
                </div>

                <div className="news-grid">
                    {newsData.map((news, index) => (
                        <NewsCard
                            key={index}
                            image={news.image}
                            category={news.category}
                            title={news.title}
                            excerpt={news.excerpt}
                            date={news.date}
                            readTime={news.readTime}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default News;
