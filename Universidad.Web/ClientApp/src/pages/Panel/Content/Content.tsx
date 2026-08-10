import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FileText, Filter } from 'lucide-react';
import ContentCard from '@components/ui/ContentCard/ContentCard';
import './Content.css';
import { getContent } from '@services/content.service';
import { getGroups } from '@services/group.service';

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

const ContentPage = () => {
    const [selectedGroup, setSelectedGroup] = useState<number | 'all'>('all');
    const [contents, setContents] = useState<ContentItem[]>([]);
    const [groups, setGroups] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [contentData, groupData] = await Promise.all([getContent(), getGroups()]);
                setContents(contentData.map(c => ({ ...c, creationDate: new Date(c.creationDate) })));
                setGroups(groupData);
            } catch {
                toast.error('Error al obtener el contenido');
            }
        };

        fetchData();
    }, []);

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
                    {groups.map(group => (
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
