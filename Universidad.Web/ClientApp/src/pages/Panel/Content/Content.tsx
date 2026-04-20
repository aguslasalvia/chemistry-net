import { useState } from 'react';
import { FileText, Filter } from 'lucide-react';
import ContentCard from '@components/ui/ContentCard/ContentCard';
import './Content.css';

export interface ContentItem {
    id: number;
    title: string;
    body: string;
    imageUrl?: string;
    creationDate: Date;
    groupId: number;
    groupName: string;
    userName: string;
    type: 'News' | 'Events' | 'Academic' | 'Default';
}

const mockGroups = [
    { id: 1, name: 'News' },
    { id: 2, name: 'Events' },
    { id: 3, name: 'Academic' },
    { id: 4, name: 'Investigacion' },
    { id: 5, name: 'Extensión' },
];

const mockContent: ContentItem[] = [
    {
        id: 1,
        title: 'Conferencia sobre Química Verde',
        body: '<p>Se realizará una conferencia sobre los avances en química verde y sostenibilidad ambiental...</p>',
        imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800',
        creationDate: new Date('2026-04-18'),
        groupId: 1,
        groupName: 'News',
        userName: 'Juan Pérez',
        type: 'News'
    },
    {
        id: 2,
        title: 'Jornada de Puertas Abiertas 2026',
        body: '<p>Invitamos a todos los estudiantes de secundaria a conocer nuestras instalaciones...</p>',
        imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800',
        creationDate: new Date('2026-04-17'),
        groupId: 2,
        groupName: 'Events',
        userName: 'María García',
        type: 'Events'
    },
    {
        id: 3,
        title: 'Nuevo Curso de Posgrado: Química Computacional',
        body: '<p>Abriremos inscripciones para el nuevo curso de posgrado en química computacional...</p>',
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
        creationDate: new Date('2026-04-15'),
        groupId: 3,
        groupName: 'Academic',
        userName: 'Carlos Rodríguez',
        type: 'Academic'
    },
    {
        id: 4,
        title: 'Proyecto de Investigación en Energías Renovables',
        body: '<p>Nuestro equipo de investigación inicia un nuevo proyecto sobre celdas solares orgánicas...</p>',
        imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a65a?w=800',
        creationDate: new Date('2026-04-14'),
        groupId: 4,
        groupName: 'Investigacion',
        userName: 'Ana López',
        type: 'News'
    },
    {
        id: 5,
        title: 'Taller de extensión comunitaria',
        body: '<p>Se realizará un taller de química básica para escuelas secundarias de la zona...</p>',
        imageUrl: 'https://images.unsplash.com/photo-1533047672418-903977fc7fc6?w=800',
        creationDate: new Date('2026-04-12'),
        groupId: 5,
        groupName: 'Extensión',
        userName: 'Pedro Martínez',
        type: 'Events'
    },
    {
        id: 6,
        title: 'Premio Nacional de Química',
        body: '<p>Felicidades a nuestro egresado por obtener el Premio Nacional de Química 2026...</p>',
        imageUrl: 'https://images.unsplash.com/photo-1564325724739-aeae29d5d8bb?w=800',
        creationDate: new Date('2026-04-10'),
        groupId: 1,
        groupName: 'News',
        userName: 'Juan Pérez',
        type: 'News'
    },
];

const ContentPage = () => {
    const [selectedGroup, setSelectedGroup] = useState<number | 'all'>('all');
    const [contents] = useState<ContentItem[]>(mockContent);

    const filteredContent = selectedGroup === 'all'
        ? contents
        : contents.filter(c => c.groupId === selectedGroup);

    const sortedContent = [...filteredContent]
        .sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime())
        .slice(0, 10);

    return (
        <div className="content-page">
            <div className="content-page__header">
                <div className="content-page__header-text">
                    <h1>Contenido</h1>
                    <p>Gestiona el contenido publicado en los grupos</p>
                </div>
            </div>

            <div className="content-page__filters">
                <div className="content-page__filter-icon">
                    <Filter size={18} />
                </div>
                <div className="content-page__filter-chips">
                    <button
                        className={`content-page__chip ${selectedGroup === 'all' ? 'content-page__chip--active' : ''}`}
                        onClick={() => setSelectedGroup('all')}
                    >
                        Todos
                    </button>
                    {mockGroups.map(group => (
                        <button
                            key={group.id}
                            className={`content-page__chip ${selectedGroup === group.id ? 'content-page__chip--active' : ''}`}
                            onClick={() => setSelectedGroup(group.id)}
                        >
                            {group.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="content-page__stats">
                <div className="content-page__stat">
                    <FileText size={20} />
                    <span>{sortedContent.length} contenido{sortedContent.length !== 1 ? 's' : ''}</span>
                </div>
            </div>

            <div className="content-page__grid">
                {sortedContent.map(content => (
                    <ContentCard
                        key={content.id}
                        {...content}
                    />
                ))}
            </div>
        </div>
    );
};

export default ContentPage;