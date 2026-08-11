import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Type, Link as LinkIcon, FileText, Image as ImageIcon, Save, Plus, Loader2 } from 'lucide-react';
import type { Page } from '@models/page';
import type { Group } from '@models/group';
import { slugify } from '@utils/slugify';

interface PageFormProps {
    groups: Group[];
    initial?: Page;
    onSubmit: (data: { title: string; slug: string; body: string; groupId: number; imageUrl?: string }) => Promise<void>;
    onCancel: () => void;
}

const inputClasses =
    'w-full rounded-fq border border-fq-border bg-fq-surface py-3.5 pr-4 pl-11 text-sm text-fq-text placeholder:text-fq-muted/70 transition-colors focus:border-fq-primary focus:bg-white';

const PageForm: React.FC<PageFormProps> = ({ groups, initial, onSubmit, onCancel }) => {
    const [title, setTitle] = useState(initial?.title ?? '');
    const [slug, setSlug] = useState(initial?.slug ?? '');
    const [slugTouched, setSlugTouched] = useState(!!initial);
    const [body, setBody] = useState(initial?.body ?? '');
    const [groupId, setGroupId] = useState(
        initial ? String(initial.groupId) : groups[0] ? String(groups[0].id) : '',
    );
    const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? '');
    const [saving, setSaving] = useState(false);

    // Groups load asynchronously in the parent — if this form mounted before they
    // arrived (or the selected one disappeared), fall back to the first available one
    // instead of silently submitting an invalid groupId.
    useEffect(() => {
        if (groups.length === 0) return;
        if (!groups.some((g) => String(g.id) === groupId)) {
            setGroupId(String(groups[0].id));
        }
    }, [groups, groupId]);

    const handleTitleChange = (value: string) => {
        setTitle(value);
        if (!slugTouched) {
            setSlug(slugify(value));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !slug.trim() || !body.trim() || !groupId) {
            toast.error('Completá título, URL, contenido y grupo');
            return;
        }
        setSaving(true);
        try {
            await onSubmit({
                title: title.trim(),
                slug: slug.trim(),
                body: body.trim(),
                groupId: Number(groupId),
                imageUrl: imageUrl.trim() || undefined,
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <label htmlFor="page-title" className="text-sm font-semibold text-fq-text">Título</label>
                <div className="relative flex items-start">
                    <Type className="pointer-events-none absolute top-3.5 left-3.5 text-fq-muted" size={18} />
                    <input
                        id="page-title"
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className={inputClasses}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="page-slug" className="text-sm font-semibold text-fq-text">
                    URL <span className="font-normal text-fq-muted">(fq.edu.uy/{slug || '...'})</span>
                </label>
                <div className="relative flex items-start">
                    <LinkIcon className="pointer-events-none absolute top-3.5 left-3.5 text-fq-muted" size={18} />
                    <input
                        id="page-slug"
                        value={slug}
                        onChange={(e) => {
                            setSlugTouched(true);
                            setSlug(slugify(e.target.value));
                        }}
                        placeholder="se-genera-desde-el-titulo"
                        className={inputClasses}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="page-body" className="text-sm font-semibold text-fq-text">Contenido</label>
                <div className="relative flex items-start">
                    <FileText className="pointer-events-none absolute top-3.5 left-3.5 text-fq-muted" size={18} />
                    <textarea
                        id="page-body"
                        rows={6}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className={`${inputClasses} resize-none`}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="page-group" className="text-sm font-semibold text-fq-text">Grupo</label>
                {groups.length === 0 ? (
                    <p className="text-sm text-fq-danger">
                        No pertenecés a ningún grupo — pedile a un administrador que te agregue a uno.
                    </p>
                ) : (
                    <select
                        id="page-group"
                        value={groupId}
                        onChange={(e) => setGroupId(e.target.value)}
                        className="rounded-fq border border-fq-border bg-fq-surface px-3 py-3.5 text-sm text-fq-text"
                    >
                        {groups.map((g) => (
                            <option key={g.id} value={g.id}>
                                {g.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="page-image" className="text-sm font-semibold text-fq-text">
                    URL de imagen (opcional)
                </label>
                <div className="relative flex items-start">
                    <ImageIcon className="pointer-events-none absolute top-3.5 left-3.5 text-fq-muted" size={18} />
                    <input
                        id="page-image"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://..."
                        className={inputClasses}
                    />
                </div>
            </div>

            <div className="mt-2 flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-fq border border-fq-border bg-transparent px-6 py-3 text-sm font-semibold text-fq-text transition-colors hover:border-fq-muted hover:bg-fq-surface"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={saving || groups.length === 0}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-fq bg-fq-primary px-6 py-3 text-sm font-semibold text-fq-text transition-colors hover:bg-fq-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {saving ? (
                        <Loader2 size={18} className="animate-spin" />
                    ) : initial ? (
                        <Save size={18} />
                    ) : (
                        <Plus size={18} />
                    )}
                    <span>{initial ? 'Guardar cambios' : 'Crear página'}</span>
                </button>
            </div>
        </form>
    );
};

export default PageForm;
