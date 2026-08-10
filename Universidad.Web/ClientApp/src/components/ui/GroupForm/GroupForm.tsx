import { useState } from 'react';
import toast from 'react-hot-toast';
import { Users, FileText, Save, Plus, Loader2 } from 'lucide-react';

interface GroupFormProps {
    onSubmit: (name: string, description: string) => void;
    initialName?: string;
    initialDescription?: string;
    loading?: boolean;
    isEditing?: boolean;
    onCancel?: () => void;
}

const inputClasses =
    'w-full resize-none rounded-fq border border-fq-border bg-fq-surface py-3.5 pr-4 pl-11 text-sm text-fq-text placeholder:text-fq-muted/70 transition-colors focus:border-fq-primary focus:bg-fq-bg';

const GroupForm: React.FC<GroupFormProps> = ({
    onSubmit,
    initialName = '',
    initialDescription = '',
    loading = false,
    isEditing = false,
    onCancel
}) => {
    const [name, setName] = useState(initialName);
    const [description, setDescription] = useState(initialDescription);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !description.trim()) {
            toast.error('Por favor completa todos los campos');
            return;
        }

        onSubmit(name.trim(), description.trim());
        if (!isEditing) {
            setName('');
            setDescription('');
        }
    };

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-fq-text">Nombre del grupo</label>
                <div className="relative flex items-start">
                    <Users className="pointer-events-none absolute left-3.5 top-3.5 text-fq-muted" size={18} />
                    <input
                        id="name"
                        type="text"
                        placeholder="Ej: News, Events, Academic"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="off"
                        className={inputClasses}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-sm font-semibold text-fq-text">Descripción</label>
                <div className="relative flex items-start">
                    <FileText className="pointer-events-none absolute left-3.5 top-3.5 text-fq-muted" size={18} />
                    <textarea
                        id="description"
                        placeholder="Describe el propósito de este grupo..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className={inputClasses}
                    />
                </div>
            </div>

            <div className="mt-2 flex justify-end gap-3">
                {onCancel && (
                    <button
                        type="button"
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-fq border border-fq-border bg-transparent px-6 py-3 text-sm font-semibold text-fq-text transition-colors hover:border-fq-muted hover:bg-fq-surface"
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>
                )}
                <button
                    type="submit"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-fq bg-fq-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-fq-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={loading}
                >
                    {loading ? (
                        <Loader2 size={18} className="animate-spin" />
                    ) : (
                        <>
                            {isEditing ? <Save size={18} /> : <Plus size={18} />}
                            <span>{isEditing ? 'Guardar' : 'Crear Grupo'}</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default GroupForm;
