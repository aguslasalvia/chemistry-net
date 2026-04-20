import { useState } from 'react';
import toast from 'react-hot-toast';
import { User, Mail, Save } from 'lucide-react';
import type { User as UserType } from '../UserList/UserList';
import './UserEditModal.css';

interface UserEditModalProps {
    user: UserType;
    onClose: () => void;
    onSave?: (firstName: string, lastName: string, email: string) => void;
    onSavePassword?: (newPassword: string) => void;
    isPasswordChange?: boolean;
    loading?: boolean;
}

const UserEditModal: React.FC<UserEditModalProps> = ({
    user,
    onClose,
    onSave,
    onSavePassword,
    isPasswordChange = false,
    loading = false
}) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isPasswordChange) {
            if (!password || !confirmPassword) {
                toast.error('Por favor completa todos los campos');
                return;
            }
            if (password !== confirmPassword) {
                toast.error('Las contraseñas no coinciden');
                return;
            }
            if (password.length < 6) {
                toast.error('La contraseña debe tener al menos 6 caracteres');
                return;
            }
            onSavePassword?.(password);
        } else {
            if (!firstName.trim() || !lastName.trim() || !email.trim()) {
                toast.error('Por favor completa todos los campos');
                return;
            }
            onSave?.(firstName.trim(), lastName.trim(), email.trim());
        }
    };

    return (
        <form className="user-edit-modal" onSubmit={handleSubmit}>
            {isPasswordChange ? (
                <div className="user-edit-modal__section">
                    <h3 className="user-edit-modal__section-title">Nueva Contraseña</h3>
                    
                    <div className="user-edit-modal__field">
                        <label htmlFor="password">Nueva Contraseña</label>
                        <div className="user-edit-modal__input-wrapper">
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Ingresa la nueva contraseña"
                            />
                        </div>
                    </div>

                    <div className="user-edit-modal__field">
                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <div className="user-edit-modal__input-wrapper">
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirma la contraseña"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="user-edit-modal__section">
                    <h3 className="user-edit-modal__section-title">Datos del Usuario</h3>
                    
                    <div className="user-edit-modal__field">
                        <label htmlFor="firstName">Nombre</label>
                        <div className="user-edit-modal__input-wrapper">
                            <User className="user-edit-modal__input-icon" size={18} />
                            <input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="user-edit-modal__field">
                        <label htmlFor="lastName">Apellido</label>
                        <div className="user-edit-modal__input-wrapper">
                            <User className="user-edit-modal__input-icon" size={18} />
                            <input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="user-edit-modal__field">
                        <label htmlFor="email">Email</label>
                        <div className="user-edit-modal__input-wrapper">
                            <Mail className="user-edit-modal__input-icon" size={18} />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="user-edit-modal__actions">
                <button type="button" className="user-edit-modal__btn user-edit-modal__btn--cancel" onClick={onClose}>
                    Cancelar
                </button>
                <button type="submit" className="user-edit-modal__btn user-edit-modal__btn--submit" disabled={loading}>
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

export default UserEditModal;