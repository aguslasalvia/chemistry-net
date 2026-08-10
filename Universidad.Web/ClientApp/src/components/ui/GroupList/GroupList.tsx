import { useState } from 'react';
import { Pencil, Trash2, Search, FolderOpen } from 'lucide-react';
import type { Group } from '@models/group';

interface GroupListProps {
    groups: Group[];
    onEdit: (group: Group) => void;
    onDelete: (group: Group) => void;
}

const GroupList: React.FC<GroupListProps> = ({ groups, onEdit, onDelete }) => {
    const [query, setQuery] = useState('');

    const filtered = groups.filter((g) =>
        `${g.name} ${g.description}`.toLowerCase().includes(query.toLowerCase()),
    );

    return (
        <div className="rounded-fq-lg border border-fq-border bg-white p-6">
            <div className="mb-5 flex items-center gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-fq bg-fq-primary-tint text-fq-primary">
                    <FolderOpen size={20} />
                </div>
                <div>
                    <h2 className="font-display text-lg font-bold text-fq-text">Grupos Existentes</h2>
                    <p className="text-sm text-fq-muted">
                        {groups.length} grupo{groups.length === 1 ? '' : 's'} registrado
                        {groups.length === 1 ? '' : 's'}
                    </p>
                </div>
            </div>

            <div className="relative mb-5 flex items-start">
                <Search className="pointer-events-none absolute top-3.5 left-3.5 text-fq-muted" size={18} />
                <input
                    type="text"
                    placeholder="Buscar grupos..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-fq border border-fq-border bg-fq-surface py-3.5 pr-4 pl-11 text-sm text-fq-text placeholder:text-fq-muted/70 transition-colors focus:border-fq-primary focus:bg-white"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-fq-border text-xs font-bold tracking-wide text-fq-muted uppercase">
                            <th className="pb-3">Grupo</th>
                            <th className="pb-3">Miembros</th>
                            <th className="pb-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((group) => (
                            <tr key={group.id} className="border-b border-fq-border last:border-0">
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-fq bg-fq-primary-tint text-sm font-bold text-fq-primary-text">
                                            {group.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-fq-text">{group.name}</div>
                                            <div className="text-xs text-fq-muted">{group.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 text-fq-muted">
                                    {group.users?.length
                                        ? `${group.users.length} miembro${group.users.length === 1 ? '' : 's'}`
                                        : 'Sin miembros'}
                                </td>
                                <td className="py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(group)}
                                            title="Editar"
                                            className="flex size-9 items-center justify-center rounded-fq border border-fq-border text-fq-muted transition-colors hover:border-fq-primary hover:bg-fq-primary hover:text-white"
                                        >
                                            <Pencil size={14} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(group)}
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
                                    No se encontraron grupos.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GroupList;
