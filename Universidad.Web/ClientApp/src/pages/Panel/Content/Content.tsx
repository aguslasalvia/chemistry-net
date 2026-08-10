import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import Modal from '@components/ui/Modal/Modal';
import ContentCard from '@components/ui/ContentCard/ContentCard';
import ContentForm from '@components/ui/ContentForm/ContentForm';
import { getContent, createContent, updateContent, deleteContent } from '@services/content.service';
import { getGroups } from '@services/group.service';
import { getCurrentUserId } from '@utils/session';
import type { Content, ContentType } from '@models/content';
import type { Group } from '@models/group';

const ContentPage = () => {
    const [items, setItems] = useState<Content[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Content | null>(null);

    const loadData = async () => {
        setLoading(true);
        try {
            const [contentData, groupsData] = await Promise.all([getContent(), getGroups()]);
            setItems(contentData);
            setGroups(groupsData);
        } catch {
            toast.error('No se pudo cargar el contenido');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const openCreate = () => {
        setEditingItem(null);
        setFormOpen(true);
    };

    const openEdit = (content: Content) => {
        setEditingItem(content);
        setFormOpen(true);
    };

    const closeForm = () => {
        setFormOpen(false);
        setEditingItem(null);
    };

    const handleSubmit = async (data: {
        title: string;
        body: string;
        type: ContentType;
        groupId: number;
        imageUrl?: string;
    }) => {
        try {
            if (editingItem) {
                await updateContent(editingItem.id, data.title, data.body, data.type, data.imageUrl);
                toast.success('Contenido actualizado');
            } else {
                const userId = getCurrentUserId();
                if (!userId) {
                    toast.error('Iniciá sesión de nuevo para publicar contenido');
                    return;
                }
                await createContent(data.title, data.body, userId, data.groupId, data.type, data.imageUrl);
                toast.success('Contenido publicado');
            }
            closeForm();
            await loadData();
        } catch {
            toast.error('No se pudo guardar el contenido');
        }
    };

    const handleDelete = async (content: Content) => {
        if (!confirm(`¿Eliminar "${content.title}"?`)) return;
        try {
            await deleteContent(content.id);
            toast.success('Contenido eliminado');
            await loadData();
        } catch {
            toast.error('No se pudo eliminar el contenido');
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold text-fq-text">Contenido</h1>
                    <p className="text-fq-muted">Noticias, eventos y contenido académico del sitio</p>
                </div>
                <button
                    onClick={openCreate}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-fq bg-fq-primary px-6 py-3 text-sm font-semibold text-fq-text transition-colors hover:bg-fq-primary-hover"
                >
                    <Plus size={18} />
                    <span>Nuevo Contenido</span>
                </button>
            </div>

            {loading ? (
                <p className="text-fq-muted">Cargando contenido…</p>
            ) : items.length === 0 ? (
                <p className="text-fq-muted">Todavía no hay contenido cargado.</p>
            ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,360px))] gap-5">
                    {items.map((item) => (
                        <ContentCard key={item.id} content={item} onEdit={openEdit} onDelete={handleDelete} />
                    ))}
                </div>
            )}

            <Modal
                isOpen={formOpen}
                onClose={closeForm}
                title={editingItem ? 'Editar Contenido' : 'Nuevo Contenido'}
            >
                <ContentForm
                    groups={groups}
                    initial={editingItem ?? undefined}
                    onSubmit={handleSubmit}
                    onCancel={closeForm}
                />
            </Modal>
        </div>
    );
};

export default ContentPage;
