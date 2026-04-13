import { Newspaper, TrendingUp } from 'lucide-react';
import NewsCard from './NewsCard';
import './News.css';

const newsData = [
    {
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
        category: 'Investigación',
        title: 'Nuevo descubrimiento en química cuántica podría revolucionar la industria farmacéutica',
        excerpt: 'Investigadores de la Facultad de Química desarrollan un método innovador para el diseño de fármacos más eficientes.',
        date: '12 Abr 2026',
        readTime: '5 min'
    },
    {
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
        category: 'Académico',
        title: 'Abiertas las inscripciones para el segundo semestre 2026',
        excerpt: 'Los estudiantes pueden inscribirse en las diferentes carreras de grado y posgrado hasta el 30 de mayo.',
        date: '10 Abr 2026',
        readTime: '3 min'
    },
    {
        image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80',
        category: 'Eventos',
        title: 'Conferencia Internacional de Química Sustentable 2026',
        excerpt: 'Expertos de todo el mundo se reunirán en Montevideo para discutir avances en química verde y sostenible.',
        date: '8 Abr 2026',
        readTime: '4 min'
    }
];

const News = () => {
    return (
        <section className="news">
            <div className="news-background"></div>
            <div className="news-container">
                <div className="news-header">
                    <div className="news-header-content">
                        <div className="news-tag">
                            <Newspaper />
                            <span>Noticias</span>
                        </div>
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
