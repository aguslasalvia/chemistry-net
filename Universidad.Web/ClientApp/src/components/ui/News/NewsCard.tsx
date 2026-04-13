import { Calendar, Clock, ArrowRight } from 'lucide-react';
import './NewsCard.css';

interface NewsCardProps {
    image: string;
    category: string;
    title: string;
    excerpt: string;
    date: string | null;
    readTime: string;
}

const NewsCard = ({ image, category, title, excerpt, date, readTime }: NewsCardProps) => {
    return (
        <article className="news-card">
            <div className="news-card-image">
                <img src={image} alt={title} />
                <span className="news-card-category">{category}</span>
            </div>
            <div className="news-card-content">
                <h3 className="news-card-title">{title}</h3>
                <p className="news-card-excerpt">{excerpt}</p>
                <div className="news-card-meta">
                    <div className="news-card-meta-item">
                        <Calendar />
                        <span>{date}</span>
                    </div>
                    <div className="news-card-meta-item">
                        <Clock />
                        <span>{readTime}</span>
                    </div>
                </div>
                <a href="#" className="news-card-link">
                    Leer más
                    <ArrowRight />
                </a>
            </div>
        </article>
    );
};

export default NewsCard;
