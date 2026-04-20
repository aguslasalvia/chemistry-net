import { useState } from 'react';
import toast from 'react-hot-toast';
import { Users, FileText, Save, UserX } from 'lucide-react';
import type { Group } from '../GroupList/GroupList';
import './GroupEditModal.css';

interface GroupEditModalProps {
    group: Group;
    onClose: () => void;
    onSave: (name: string, description: string) => void;
    onRemoveUser: (userId: number) => void;
    loading?: boolean;
}

const GroupEditModal: React.FC<GroupEditModalProps> = ({
    group,
    onClose,
    onSave,
    onRemoveUser,
    loading = false
}) => {
    const [name, setName] = useState(group.name);
    const [description, setDescription] = useState(group.description);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !description.trim()) {
            toast.error('Por favor completa todos los campos');
            return;
        }
        onSave(name.trim(), description.trim());
    };

    const handleRemoveUser = (userId: number) => {
        onRemoveUser(userId);
        toast.success('Usuario removido del grupo');
    };

    return (
        <form className="group-edit-modal" onSubmit={handleSubmit}>
            <div className="group-edit-modal__section">
                <h3 className="group-edit-modal__section-title">Datos del Grupo</h3>
                
                <div className="group-edit-modal__field">
                    <label htmlFor="name">Nombre</label>
                    <div className="group-edit-modal__input-wrapper">
                        <Users className="group-edit-modal__input-icon" size={18} />
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="group-edit-modal__field">
                    <label htmlFor="description">Descripción</label>
                    <div className="group-edit-modal__input-wrapper">
                        <FileText className="group-edit-modal__input-icon" size={18} />
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={2}
                        />
                    </div>
                </div>
            </div>

            <div className="group-edit-modal__section">
                <h3 className="group-edit-modal__section-title">
                    <Users size={16} />
                    <span>Usuarios del Grupo</span>
                </h3>
                
                {(!group.users || group.users.length === 0) ? (
                    <p className="group-edit-modal__empty">No hay usuarios en este grupo</p>
                ) : (
                    <div className="group-edit-modal__users">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {group.users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td className="group-edit-modal__user-email">{user.email}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="group-edit-modal__remove-btn"
                                                onClick={() => handleRemoveUser(user.id)}
                                                title="Remover usuario"
                                            >
                                                <UserX size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="group-edit-modal__actions">
                <button type="button" className="group-edit-modal__btn group-edit-modal__btn--cancel" onClick={onClose}>
                    Cancelar
                </button>
                <button type="submit" className="group-edit-modal__btn group-edit-modal__btn--submit" disabled={loading}>
                    {loading ? (
                        <span className="loading-spinner"></span>
                    ) : (
                        <>
                            <Save size={18} />
                            <span>Guardar</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default GroupEditModal;