import { useState } from 'react';
import toast from 'react-hot-toast';
import { Users, FileText, Save, UserX, UserPlus, Loader2 } from 'lucide-react';
import type { Group, Rol } from '@models/group';
import type { User } from '@models/user';

interface GroupEditModalProps {
    group: Group;
    allUsers: User[];
    onSave: (name: string, description: string) => Promise<void>;
    onAddUser: (userId: number, role: Rol) => Promise<void>;
    onRemoveUser: (userId: number) => Promise<void>;
}

const inputClasses =
    'w-full resize-none rounded-fq border border-fq-border bg-fq-surface py-3.5 pr-4 pl-11 text-sm text-fq-text placeholder:text-fq-muted/70 transition-colors focus:border-fq-primary focus:bg-white';

const ROLES: Rol[] = ['Student', 'Profesor', 'Admin', 'MasterAdmin'];

const GroupEditModal: React.FC<GroupEditModalProps> = ({
    group,
    allUsers,
    onSave,
    onAddUser,
    onRemoveUser,
}) => {
    const [name, setName] = useState(group.name);
    const [description, setDescription] = useState(group.description);
    const [saving, setSaving] = useState(false);
    const [removingId, setRemovingId] = useState<number | null>(null);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedRole, setSelectedRole] = useState<Rol>('Student');
    const [adding, setAdding] = useState(false);

    const memberIds = new Set((group.users ?? []).map((u) => u.id));
    const availableUsers = allUsers.filter((u) => !memberIds.has(u.id));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !description.trim()) {
            toast.error('Por favor completa todos los campos');
            return;
        }
        setSaving(true);
        try {
            await onSave(name.trim(), description.trim());
        } finally {
            setSaving(false);
        }
    };

    const handleRemoveUser = async (userId: number) => {
        setRemovingId(userId);
        try {
            await onRemoveUser(userId);
        } finally {
            setRemovingId(null);
        }
    };

    const handleAddUser = async () => {
        if (!selectedUserId) {
            toast.error('Seleccioná un usuario para agregar');
            return;
        }
        setAdding(true);
        try {
            await onAddUser(Number(selectedUserId), selectedRole);
            setSelectedUserId('');
        } finally {
            setAdding(false);
        }
    };

    return (
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                <h3 className="font-display text-sm font-bold tracking-wide text-fq-muted uppercase">
                    Datos del grupo
                </h3>
                <div className="flex flex-col gap-2">
                    <label htmlFor="group-name" className="text-sm font-semibold text-fq-text">Nombre</label>
                    <div className="relative flex items-start">
                        <Users className="pointer-events-none absolute top-3.5 left-3.5 text-fq-muted" size={18} />
                        <input
                            id="group-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="group-desc" className="text-sm font-semibold text-fq-text">
                        Descripción
                    </label>
                    <div className="relative flex items-start">
                        <FileText
                            className="pointer-events-none absolute top-3.5 left-3.5 text-fq-muted"
                            size={18}
                        />
                        <textarea
                            id="group-desc"
                            rows={2}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex min-h-11 items-center justify-center gap-2 self-end rounded-fq bg-fq-primary px-6 py-3 text-sm font-semibold text-fq-text transition-colors hover:bg-fq-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    <span>Guardar</span>
                </button>
            </div>

            <div className="flex flex-col gap-4 border-t border-fq-border pt-6">
                <h3 className="flex items-center gap-2 font-display text-sm font-bold tracking-wide text-fq-muted uppercase">
                    <Users size={16} />
                    <span>Usuarios del grupo</span>
                </h3>

                {!group.users || group.users.length === 0 ? (
                    <p className="text-sm text-fq-muted">No hay usuarios en este grupo</p>
                ) : (
                    <ul className="flex flex-col divide-y divide-fq-border">
                        {group.users.map((user) => (
                            <li key={user.id} className="flex items-center justify-between gap-3 py-2.5">
                                <div>
                                    <div className="text-sm font-semibold text-fq-text">{user.name}</div>
                                    <div className="text-xs text-fq-muted">{user.email}</div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveUser(user.id)}
                                    disabled={removingId === user.id}
                                    title="Remover usuario"
                                    className="flex size-8 items-center justify-center rounded-fq border border-fq-border text-fq-muted transition-colors hover:border-fq-danger hover:bg-fq-danger hover:text-white disabled:opacity-50"
                                >
                                    {removingId === user.id ? (
                                        <Loader2 size={14} className="animate-spin" />
                                    ) : (
                                        <UserX size={14} />
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                {availableUsers.length > 0 && (
                    <div className="flex flex-wrap items-end gap-3 rounded-fq border border-dashed border-fq-border p-3">
                        <div className="flex min-w-[160px] flex-1 flex-col gap-1.5">
                            <label htmlFor="add-user" className="text-xs font-semibold text-fq-muted">
                                Usuario
                            </label>
                            <select
                                id="add-user"
                                value={selectedUserId}
                                onChange={(e) => setSelectedUserId(e.target.value)}
                                className="rounded-fq border border-fq-border bg-white px-3 py-2 text-sm text-fq-text"
                            >
                                <option value="">Seleccionar...</option>
                                {availableUsers.map((u) => (
                                    <option key={u.id} value={u.id}>
                                        {u.name} {u.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="add-role" className="text-xs font-semibold text-fq-muted">
                                Rol
                            </label>
                            <select
                                id="add-role"
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
                            onClick={handleAddUser}
                            disabled={adding}
                            className="flex min-h-9 items-center justify-center gap-1.5 rounded-fq border border-fq-border px-3 text-sm font-semibold text-fq-text transition-colors hover:border-fq-primary hover:bg-fq-primary hover:text-white disabled:opacity-50"
                        >
                            {adding ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />}
                            <span>Agregar</span>
                        </button>
                    </div>
                )}
            </div>
        </form>
    );
};

export default GroupEditModal;
