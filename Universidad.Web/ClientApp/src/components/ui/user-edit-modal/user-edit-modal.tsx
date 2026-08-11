import { useState } from 'react';
import toast from 'react-hot-toast';
import { User as UserIcon, Mail, Save, KeyRound, Loader2, Users, UserMinus, UserPlus } from 'lucide-react';
import type { User } from '@models/user';
import type { Group, Rol } from '@models/group';

interface UserEditModalProps {
    user: User;
    allGroups: Group[];
    onSave: (name: string, lastName: string, email: string) => Promise<void>;
    onChangePassword: (newPassword: string) => Promise<void>;
    onAddGroup: (groupId: number, role: Rol) => Promise<void>;
    onRemoveGroup: (groupId: number) => Promise<void>;
    onClose: () => void;
}

const inputClasses =
    'w-full rounded-fq border border-fq-border bg-fq-surface py-3.5 pr-4 pl-11 text-sm text-fq-text placeholder:text-fq-muted/70 transition-colors focus:border-fq-primary focus:bg-white';

const ROLES: Rol[] = ['Student', 'Profesor', 'Admin', 'MasterAdmin'];

const UserEditModal: React.FC<UserEditModalProps> = ({
    user,
    allGroups,
    onSave,
    onChangePassword,
    onAddGroup,
    onRemoveGroup,
    onClose,
}) => {
    const [name, setName] = useState(user.name);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [newPassword, setNewPassword] = useState('');
    const [savingInfo, setSavingInfo] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);
    const [removingGroupId, setRemovingGroupId] = useState<number | null>(null);
    const [selectedGroupId, setSelectedGroupId] = useState('');
    const [selectedRole, setSelectedRole] = useState<Rol>('Student');
    const [addingGroup, setAddingGroup] = useState(false);

    const memberGroupIds = new Set(user.groups.map((g) => g.id));
    const availableGroups = allGroups.filter((g) => !memberGroupIds.has(g.id));

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

    const handleRemoveGroup = async (groupId: number) => {
        setRemovingGroupId(groupId);
        try {
            await onRemoveGroup(groupId);
        } finally {
            setRemovingGroupId(null);
        }
    };

    const handleAddGroup = async () => {
        if (!selectedGroupId) {
            toast.error('Seleccioná un grupo para agregar');
            return;
        }
        setAddingGroup(true);
        try {
            await onAddGroup(Number(selectedGroupId), selectedRole);
            setSelectedGroupId('');
        } finally {
            setAddingGroup(false);
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

            <div className="flex flex-col gap-4 border-t border-fq-border pt-6">
                <h3 className="flex items-center gap-2 font-display text-sm font-bold tracking-wide text-fq-muted uppercase">
                    <Users size={16} />
                    <span>Grupos</span>
                </h3>

                {user.groups.length === 0 ? (
                    <p className="text-sm text-fq-muted">Este usuario no pertenece a ningún grupo</p>
                ) : (
                    <ul className="flex flex-col divide-y divide-fq-border">
                        {user.groups.map((group) => (
                            <li key={group.id} className="flex items-center justify-between gap-3 py-2.5">
                                <div>
                                    <div className="text-sm font-semibold text-fq-text">{group.name}</div>
                                    <div className="text-xs text-fq-muted">{group.description}</div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveGroup(group.id)}
                                    disabled={removingGroupId === group.id}
                                    title="Quitar del grupo"
                                    className="flex size-8 items-center justify-center rounded-fq border border-fq-border text-fq-muted transition-colors hover:border-fq-danger hover:bg-fq-danger hover:text-white disabled:opacity-50"
                                >
                                    {removingGroupId === group.id ? (
                                        <Loader2 size={14} className="animate-spin" />
                                    ) : (
                                        <UserMinus size={14} />
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                {availableGroups.length > 0 && (
                    <div className="flex flex-wrap items-end gap-3 rounded-fq border border-dashed border-fq-border p-3">
                        <div className="flex min-w-[160px] flex-1 flex-col gap-1.5">
                            <label htmlFor="add-group" className="text-xs font-semibold text-fq-muted">
                                Grupo
                            </label>
                            <select
                                id="add-group"
                                value={selectedGroupId}
                                onChange={(e) => setSelectedGroupId(e.target.value)}
                                className="rounded-fq border border-fq-border bg-white px-3 py-2 text-sm text-fq-text"
                            >
                                <option value="">Seleccionar...</option>
                                {availableGroups.map((g) => (
                                    <option key={g.id} value={g.id}>
                                        {g.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="add-group-role" className="text-xs font-semibold text-fq-muted">
                                Rol
                            </label>
                            <select
                                id="add-group-role"
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value as Rol)}
                                className="rounded-fq border border-fq-border bg-white px-3 py-2 text-sm text-fq-text"
                            >
                                {ROLES.map((r) => (
                                    <option key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="button"
                            onClick={handleAddGroup}
                            disabled={addingGroup}
                            className="flex min-h-9 items-center justify-center gap-1.5 rounded-fq border border-fq-border px-3 text-sm font-semibold text-fq-text transition-colors hover:border-fq-primary hover:bg-fq-primary hover:text-white disabled:opacity-50"
                        >
                            {addingGroup ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />}
                            <span>Agregar</span>
                        </button>
                    </div>
                )}
            </div>

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
