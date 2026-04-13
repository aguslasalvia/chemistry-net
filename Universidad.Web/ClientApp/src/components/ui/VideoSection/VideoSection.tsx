import { Film } from 'lucide-react';
import './VideoSection.css';

const VideoSection = () => {
    return (
        <section className="video-section">
            <div className="video-background"></div>
            <div className="video-container">
                <div className="video-header">
                    <div className="video-tag">
                        <Film />
                        <span>Videos</span>
                    </div>
                    <h2 className="video-title">
                        Conocé la
                        <span className="video-title-accent"> Facultad de Química</span>
                    </h2>
                </div>

                <div className="video-grid">
                    <div className="video-card">
                        <div className="video-wrapper">
                            <iframe
                                src="https://www.youtube.com/embed/eku47Qc78Hg"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    <div className="video-card">
                        <div className="video-wrapper">
                            <iframe
                                src="https://www.youtube.com/embed/biBwi997srI"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
