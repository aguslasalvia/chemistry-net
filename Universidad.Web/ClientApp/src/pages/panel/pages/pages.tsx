import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import Modal from '@components/ui/modal/modal';
import PageList from '@components/ui/page-list/page-list';
import PageForm from '@components/ui/page-form/page-form';
import { getPages, createPage, updatePage, deletePage } from '@services/page.service';
import { getGroups } from '@services/group.service';
import type { Page } from '@models/page';
import type { Group } from '@models/group';
import type { User } from '@models/user';

const PagesPage = () => {
    const currentUser = useOutletContext<User>();
    const [pages, setPages] = useState<Page[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [editingPage, setEditingPage] = useState<Page | null>(null);

    const loadPages = async () => {
        setLoading(true);
        try {
            const [pagesData, groupsData] = await Promise.all([getPages(), getGroups()]);
            setPages(pagesData);
            setGroups(groupsData);
        } catch {
            toast.error('No se pudieron cargar las páginas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPages();
    }, []);

    const availableGroups = currentUser.isAdmin
        ? groups
        : groups.filter((g) => currentUser.groups.some((cg) => cg.id === g.id));

    const openCreate = () => {
        setEditingPage(null);
        setFormOpen(true);
    };

    const openEdit = (page: Page) => {
        setEditingPage(page);
        setFormOpen(true);
    };

    const closeForm = () => {
        setFormOpen(false);
        setEditingPage(null);
    };

    const handleSubmit = async (data: { title: string; slug: string; body: string; groupId: number; imageUrl?: string }) => {
        try {
            if (editingPage) {
                await updatePage(editingPage.id, data.title, data.slug, data.body, data.imageUrl);
                toast.success('Página actualizada');
            } else {
                await createPage(data.title, data.slug, data.body, currentUser.id, data.groupId, data.imageUrl);
                toast.success('Página creada');
            }
            closeForm();
            await loadPages();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'No se pudo guardar la página');
        }
    };

    const handleDelete = async (page: Page) => {
        if (!confirm(`¿Eliminar la página "${page.title}"?`)) return;
        try {
            await deletePage(page.id);
            toast.success('Página eliminada');
            await loadPages();
        } catch {
            toast.error('No se pudo eliminar la página');
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold text-fq-text">Páginas</h1>
                    <p className="text-fq-muted">Contenido estático del sitio público (Institución, Bedelía, etc.)</p>
                </div>
                <button
                    onClick={openCreate}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-fq bg-fq-primary px-6 py-3 text-sm font-semibold text-fq-text transition-colors hover:bg-fq-primary-hover"
                >
                    <Plus size={18} />
                    <span>Nueva Página</span>
                </button>
            </div>

            {loading ? (
                <p className="text-fq-muted">Cargando páginas…</p>
            ) : (
                <PageList pages={pages} onEdit={openEdit} onDelete={handleDelete} />
            )}

            <Modal isOpen={formOpen} onClose={closeForm} title={editingPage ? 'Editar Página' : 'Nueva Página'}>
                <PageForm groups={availableGroups} initial={editingPage ?? undefined} onSubmit={handleSubmit} onCancel={closeForm} />
            </Modal>
        </div>
    );
};

export default PagesPage;
