import { useState } from 'react';
import toast from 'react-hot-toast';
import { User as UserIcon, Mail, Save, KeyRound, Loader2 } from 'lucide-react';
import type { User } from '@models/user';

interface UserEditModalProps {
    user: User;
    onSave: (name: string, lastName: string, email: string) => Promise<void>;
    onChangePassword: (newPassword: string) => Promise<void>;
    onClose: () => void;
}

const inputClasses =
    'w-full rounded-fq border border-fq-border bg-fq-surface py-3.5 pr-4 pl-11 text-sm text-fq-text placeholder:text-fq-muted/70 transition-colors focus:border-fq-primary focus:bg-white';

const UserEditModal: React.FC<UserEditModalProps> = ({ user, onSave, onChangePassword, onClose }) => {
    const [name, setName] = useState(user.name);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [newPassword, setNewPassword] = useState('');
    const [savingInfo, setSavingInfo] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);

    const handleSaveInfo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !lastName.trim() || !email.trim()) {
            toast.error('Completá todos los campos');
            return;
        }
        setSavingInfo(true);
        try {
            await onSave(name.trim(), lastName.trim(), email.trim());
        } finally {
            setSavingInfo(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword.length < 6) {
            toast.error('La contraseña debe tener al menos 6 caracteres');
            return;
        }
        setSavingPassword(true);
        try {
            await onChangePassword(newPassword);
            setNewPassword('');
        } finally {
            setSavingPassword(false);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <form onSubmit={handleSaveInfo} className="flex flex-col gap-4">
                <h3 className="font-display text-sm font-bold tracking-wide text-fq-muted uppercase">
                    Información
                </h3>
                <div className="flex flex-col gap-2">
                    <label htmlFor="edit-name" className="text-sm font-semibold text-fq-text">Nombre</label>
                    <div className="relative flex items-start">
                        <UserIcon className="pointer-events-none absolute top-3.5 left-3.5 text-fq-muted" size={18} />
                        <input
                            id="edit-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="edit-lastname" className="text-sm font-semibold text-fq-text">Apellido</label>
                    <div className="relative flex items-start">
                        <UserIcon className="pointer-events-none absolute top-3.5 left-3.5 text-fq-muted" size={18} />
                        <input
                            id="edit-lastname"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="edit-email" className="text-sm font-semibold text-fq-text">Email</label>
                    <div className="relative flex items-start">
                        <Mail className="pointer-events-none absolute top-3.5 left-3.5 text-fq-muted" size={18} />
                        <input
                            id="edit-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={savingInfo}
                    className="inline-flex min-h-11 items-center justify-center gap-2 self-end rounded-fq bg-fq-primary px-6 py-3 text-sm font-semibold text-fq-text transition-colors hover:bg-fq-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {savingInfo ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    <span>Guardar cambios</span>
                </button>
            </form>

            <form onSubmit={handleChangePassword} className="flex flex-col gap-4 border-t border-fq-border pt-6">
                <h3 className="font-display text-sm font-bold tracking-wide text-fq-muted uppercase">
                    Cambiar contraseña
                </h3>
                <div className="flex flex-col gap-2">
                    <label htmlFor="new-password" className="text-sm font-semibold text-fq-text">
                        Nueva contraseña
                    </label>
                    <div className="relative flex items-start">
                        <KeyRound className="pointer-events-none absolute top-3.5 left-3.5 text-fq-muted" size={18} />
                        <input
                            id="new-password"
                            type="password"
                            placeholder="Mínimo 6 caracteres"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={savingPassword}
                    className="inline-flex min-h-11 items-center justify-center gap-2 self-end rounded-fq border border-fq-border bg-transparent px-6 py-3 text-sm font-semibold text-fq-text transition-colors hover:border-fq-muted hover:bg-fq-surface disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {savingPassword ? <Loader2 size={18} className="animate-spin" /> : <KeyRound size={18} />}
                    <span>Actualizar contraseña</span>
                </button>
            </form>

            <button
                type="button"
                onClick={onClose}
                className="self-center text-sm font-semibold text-fq-muted hover:text-fq-text"
            >
                Cerrar
            </button>
        </div>
    );
};

export default UserEditModal;
