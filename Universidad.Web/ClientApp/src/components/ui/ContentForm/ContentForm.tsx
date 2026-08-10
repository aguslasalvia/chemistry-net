import { useState } from 'react';
import toast from 'react-hot-toast';
import { Type, FileText, Image as ImageIcon, Save, Plus, Loader2 } from 'lucide-react';
import type { Content, ContentType } from '@models/content';
import type { Group } from '@models/group';

interface ContentFormProps {
    groups: Group[];
    initial?: Content;
    onSubmit: (data: {
        title: string;
        body: string;
        type: ContentType;
        groupId: number;
        imageUrl?: string;
    }) => Promise<void>;
    onCancel: () => void;
}

const TYPES: ContentType[] = ['News', 'Events', 'Academic', 'Default'];

const inputClasses =
    'w-full rounded-fq border border-fq-border bg-fq-surface py-3.5 pr-4 pl-11 text-sm text-fq-text placeholder:text-fq-muted/70 transition-colors focus:border-fq-primary focus:bg-white';

const ContentForm: React.FC<ContentFormProps> = ({ groups, initial, onSubmit, onCancel }) => {
    const [title, setTitle] = useState(initial?.title ?? '');
    const [body, setBody] = useState(initial?.body ?? '');
    const [type, setType] = useState<ContentType>(initial?.type ?? 'News');
    const [groupId, setGroupId] = useState(
        initial ? String(initial.groupId) : groups[0] ? String(groups[0].id) : '',
    );
    const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? '');
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !body.trim() || !groupId) {
            toast.error('Completá todos los campos obligatorios');
            return;
        }
        setSaving(true);
        try {
            await onSubmit({
                title: title.trim(),
                body: body.trim(),
                type,
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
                <label htmlFor="content-title" className="text-sm font-semibold text-fq-text">Título</label>
                <div className="relative flex items-start">
                    <Type className="pointer-events-none absolute top-3.5 left-3.5 text-fq-muted" size={18} />
                    <input
                        id="content-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={inputClasses}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="content-body" className="text-sm font-semibold text-fq-text">Contenido</label>
                <div className="relative flex items-start">
                    <FileText className="pointer-events-none absolute top-3.5 left-3.5 text-fq-muted" size={18} />
                    <textarea
                        id="content-body"
                        rows={4}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className={`${inputClasses} resize-none`}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="content-image" className="text-sm font-semibold text-fq-text">
                    URL de imagen (opcional)
                </label>
                <div className="relative flex items-start">
                    <ImageIcon className="pointer-events-none absolute top-3.5 left-3.5 text-fq-muted" size={18} />
                    <input
                        id="content-image"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://..."
                        className={inputClasses}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="content-type" className="text-sm font-semibold text-fq-text">Tipo</label>
                    <select
                        id="content-type"
                        value={type}
                        onChange={(e) => setType(e.target.value as ContentType)}
                        className="rounded-fq border border-fq-border bg-fq-surface px-3 py-3.5 text-sm text-fq-text"
                    >
                        {TYPES.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="content-group" className="text-sm font-semibold text-fq-text">Grupo</label>
                    <select
                        id="content-group"
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
                    disabled={saving}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-fq bg-fq-primary px-6 py-3 text-sm font-semibold text-fq-text transition-colors hover:bg-fq-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {saving ? (
                        <Loader2 size={18} className="animate-spin" />
                    ) : initial ? (
                        <Save size={18} />
                    ) : (
                        <Plus size={18} />
                    )}
                    <span>{initial ? 'Guardar cambios' : 'Publicar'}</span>
                </button>
            </div>
        </form>
    );
};

export default ContentForm;
