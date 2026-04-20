import { useState } from 'react';
import toast from 'react-hot-toast';
import { Users, FileText, Save, Plus } from 'lucide-react';
import './GroupForm.css';

interface GroupFormProps {
    onSubmit: (name: string, description: string) => void;
    initialName?: string;
    initialDescription?: string;
    loading?: boolean;
    isEditing?: boolean;
    onCancel?: () => void;
}

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
        <form className="group-form-modal" onSubmit={handleSubmit}>
            <div className="group-form-modal__field">
                <label htmlFor="name">Nombre del grupo</label>
                <div className="group-form-modal__input-wrapper">
                    <Users className="group-form-modal__input-icon" size={18} />
                    <input
                        id="name"
                        type="text"
                        placeholder="Ej: News, Events, Academic"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="off"
                    />
                </div>
            </div>

            <div className="group-form-modal__field">
                <label htmlFor="description">Descripción</label>
                <div className="group-form-modal__input-wrapper">
                    <FileText className="group-form-modal__input-icon" size={18} />
                    <textarea
                        id="description"
                        placeholder="Describe el propósito de este grupo..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                    />
                </div>
            </div>

            <div className="group-form-modal__actions">
                {onCancel && (
                    <button type="button" className="group-form-modal__btn group-form-modal__btn--cancel" onClick={onCancel}>
                        Cancelar
                    </button>
                )}
                <button type="submit" className="group-form-modal__btn group-form-modal__btn--submit" disabled={loading}>
                    {loading ? (
                        <span className="loading-spinner"></span>
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