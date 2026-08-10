import { useState } from 'react';
import { Pencil, Trash2, Search, User as UserIcon } from 'lucide-react';
import type { User } from '@models/user';

interface UserListProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
    const [query, setQuery] = useState('');

    const filtered = users.filter((u) =>
        `${u.name} ${u.lastName} ${u.email}`.toLowerCase().includes(query.toLowerCase()),
    );

    return (
        <div className="rounded-fq-lg border border-fq-border bg-white p-6">
            <div className="mb-5 flex items-center gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-fq bg-fq-primary-tint text-fq-primary">
                    <UserIcon size={20} />
                </div>
                <div>
                    <h2 className="font-display text-lg font-bold text-fq-text">Usuarios Existentes</h2>
                    <p className="text-sm text-fq-muted">
                        {users.length} usuario{users.length === 1 ? '' : 's'} registrado
                        {users.length === 1 ? '' : 's'}
                    </p>
                </div>
            </div>

            <div className="relative mb-5 flex items-start">
                <Search className="pointer-events-none absolute top-3.5 left-3.5 text-fq-muted" size={18} />
                <input
                    type="text"
                    placeholder="Buscar usuarios..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-fq border border-fq-border bg-fq-surface py-3.5 pr-4 pl-11 text-sm text-fq-text placeholder:text-fq-muted/70 transition-colors focus:border-fq-primary focus:bg-white"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-fq-border text-xs font-bold tracking-wide text-fq-muted uppercase">
                            <th className="pb-3">Usuario</th>
                            <th className="pb-3">Grupos</th>
                            <th className="pb-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((user) => (
                            <tr key={user.id} className="border-b border-fq-border last:border-0">
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-fq bg-fq-primary-tint text-sm font-bold text-fq-primary-text">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-fq-text">
                                                {user.name} {user.lastName}
                                            </div>
                                            <div className="text-xs text-fq-muted">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 text-fq-muted italic">
                                    {user.groups.length > 0
                                        ? user.groups.map((g) => g.name).join(', ')
                                        : 'Sin grupos'}
                                </td>
                                <td className="py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(user)}
                                            title="Editar"
                                            className="flex size-9 items-center justify-center rounded-fq border border-fq-border text-fq-muted transition-colors hover:border-fq-primary hover:bg-fq-primary hover:text-white"
                                        >
                                            <Pencil size={14} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(user)}
                                            title="Eliminar"
                                            className="flex size-9 items-center justify-center rounded-fq border border-fq-border text-fq-muted transition-colors hover:border-fq-danger hover:bg-fq-danger hover:text-white"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={3} className="py-8 text-center text-fq-muted">
                                    No se encontraron usuarios.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
