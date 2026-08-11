import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { User as UserIcon, Mail, KeyRound, Save, Loader2 } from 'lucide-react';
import { getUsers, updateUser, changeUserPassword } from '@services/user.service';
import { getCurrentUserId } from '@utils/session';
import type { User } from '@models/user';

const inputClasses =
    'w-full rounded-fq border border-fq-border bg-fq-surface py-3.5 pr-4 pl-11 text-sm text-fq-text placeholder:text-fq-muted/70 transition-colors focus:border-fq-primary focus:bg-white';

const ProfilePage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [savingInfo, setSavingInfo] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);

    useEffect(() => {
        const userId = getCurrentUserId();
        if (!userId) {
            setLoading(false);
            return;
        }
        getUsers()
            .then((users) => {
                const current = users.find((u) => u.id === userId) ?? null;
                setUser(current);
                if (current) {
                    setName(current.name);
                    setLastName(current.lastName);
                    setEmail(current.email);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSaveInfo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setSavingInfo(true);
        try {
            await updateUser(user.id, name.trim(), lastName.trim(), email.trim());
            toast.success('Perfil actualizado');
        } catch {
            toast.error('No se pudo actualizar el perfil');
        } finally {
            setSavingInfo(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        if (newPassword.length < 6) {
            toast.error('La contraseña debe tener al menos 6 caracteres');
            return;
        }
        setSavingPassword(true);
        try {
            await changeUserPassword(user.id, newPassword);
            toast.success('Contraseña actualizada');
            setNewPassword('');
        } catch {
            toast.error('No se pudo cambiar la contraseña');
        } finally {
            setSavingPassword(false);
        }
    };

    if (loading) {
        return <p className="text-fq-muted">Cargando perfil…</p>;
    }

    if (!user) {
        return <p className="text-fq-muted">Iniciá sesión de nuevo para ver tu perfil.</p>;
    }

    return (
        <div className="flex max-w-xl flex-col gap-8">
            <div>
                <h1 className="font-display text-3xl font-bold text-fq-text">Mi Perfil</h1>
                <p className="text-fq-muted">Ver y editar tu información</p>
            </div>

            <form
                onSubmit={handleSaveInfo}
                className="flex flex-col gap-4 rounded-fq-lg border border-fq-border bg-white p-6"
            >
                <h2 className="font-display text-sm font-bold tracking-wide text-fq-muted uppercase">
                    Información
                </h2>
                <div className="flex flex-col gap-2">
                    <label htmlFor="profile-name" className="text-sm font-semibold text-fq-text">Nombre</label>
                    <div className="relative flex items-start">
                        <UserIcon className="pointer-events-none absolute top-3.5 left-3.5 text-fq-muted" size={18} />
                        <input
                            id="profile-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="profile-lastname" className="text-sm font-semibold text-fq-text">
                        Apellido
                    </label>
                    <div className="relative flex items-start">
                        <UserIcon className="pointer-events-none absolute top-3.5 left-3.5 text-fq-muted" size={18} />
                        <input
                            id="profile-lastname"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="profile-email" className="text-sm font-semibold text-fq-text">Email</label>
                    <div className="relative flex items-start">
                        <Mail className="pointer-events-none absolute top-3.5 left-3.5 text-fq-muted" size={18} />
                        <input
                            id="profile-email"
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

            <form
                onSubmit={handleChangePassword}
                className="flex flex-col gap-4 rounded-fq-lg border border-fq-border bg-white p-6"
            >
                <h2 className="font-display text-sm font-bold tracking-wide text-fq-muted uppercase">
                    Contraseña
                </h2>
                <div className="flex flex-col gap-2">
                    <label htmlFor="profile-password" className="text-sm font-semibold text-fq-text">
                        Nueva contraseña
                    </label>
                    <div className="relative flex items-start">
                        <KeyRound className="pointer-events-none absolute top-3.5 left-3.5 text-fq-muted" size={18} />
                        <input
                            id="profile-password"
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
        </div>
    );
};

export default ProfilePage;
