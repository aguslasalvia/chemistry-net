import { useState } from 'react';
import toast from 'react-hot-toast';
import { User, Mail, Plus } from 'lucide-react';
import './UserForm.css';

interface UserFormProps {
    onSubmit: (firstName: string, lastName: string, email: string) => void;
    loading?: boolean;
    onCancel?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({
    onSubmit,
    loading = false,
    onCancel
}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!firstName.trim() || !lastName.trim() || !email.trim()) {
            toast.error('Por favor completa todos los campos');
            return;
        }

        onSubmit(firstName.trim(), lastName.trim(), email.trim());
        setFirstName('');
        setLastName('');
        setEmail('');
    };

    return (
        <form className="user-form-modal" onSubmit={handleSubmit}>
            <div className="user-form-modal__field">
                <label htmlFor="firstName">Nombre</label>
                <div className="user-form-modal__input-wrapper">
                    <User className="user-form-modal__input-icon" size={18} />
                    <input
                        id="firstName"
                        type="text"
                        placeholder="Ingresa el nombre"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        autoComplete="off"
                    />
                </div>
            </div>

            <div className="user-form-modal__field">
                <label htmlFor="lastName">Apellido</label>
                <div className="user-form-modal__input-wrapper">
                    <User className="user-form-modal__input-icon" size={18} />
                    <input
                        id="lastName"
                        type="text"
                        placeholder="Ingresa el apellido"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        autoComplete="off"
                    />
                </div>
            </div>

            <div className="user-form-modal__field">
                <label htmlFor="email">Email</label>
                <div className="user-form-modal__input-wrapper">
                    <Mail className="user-form-modal__input-icon" size={18} />
                    <input
                        id="email"
                        type="email"
                        placeholder="correo@fq.edu.uy"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                    />
                </div>
            </div>

            <div className="user-form-modal__actions">
                {onCancel && (
                    <button type="button" className="user-form-modal__btn user-form-modal__btn--cancel" onClick={onCancel}>
                        Cancelar
                    </button>
                )}
                <button type="submit" className="user-form-modal__btn user-form-modal__btn--submit" disabled={loading}>
                    {loading ? (
                        <span className="loading-spinner"></span>
                    ) : (
                        <>
                            <Plus size={18} />
                            <span>Crear Usuario</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default UserForm;