import { useState } from 'react';
import { Pencil, Trash2, Users, Search } from 'lucide-react';
import './GroupList.css';

export interface GroupUser {
    id: number;
    name: string;
    email: string;
}

export interface Group {
    id: number;
    name: string;
    description: string;
    users?: GroupUser[];
}

interface GroupListProps {
    groups: Group[];
    onEdit?: (group: Group) => void;
    onDelete?: (group: Group) => void;
}

const GroupList: React.FC<GroupListProps> = ({ groups, onEdit, onDelete }) => {
    const [search, setSearch] = useState('');

    const filteredGroups = groups.filter(
        (g) =>
            g.name.toLowerCase().includes(search.toLowerCase()) ||
            g.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="group-list">
            <div className="group-list__header">
                <div className="group-list__header-icon">
                    <Users size={20} />
                </div>
                <div className="group-list__header-text">
                    <h2>Grupos Existentes</h2>
                    <p>
                        {groups.length} grupo{groups.length !== 1 ? 's' : ''} registrado
                        {groups.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>

            <div className="group-list__search">
                <Search size={18} />
                <input
                    type="text"
                    placeholder="Buscar grupos..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {filteredGroups.length === 0 ? (
                <div className="group-list__empty">
                    <p>{search ? 'No se encontraron grupos' : 'No hay grupos creados'}</p>
                    <span>
                        {search ? 'Intenta con otros términos de búsqueda' : 'Crea tu primer grupo usando el formulario'}
                    </span>
                </div>
            ) : (
                <div className="group-list__table-wrapper">
                    <table className="group-list__table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Usuarios</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGroups.map((group) => (
                                <tr key={group.id}>
                                    <td>
                                        <div className="group-list__name-cell">
                                            <div className="group-list__name-icon">
                                                <Users size={14} />
                                            </div>
                                            <span>{group.name}</span>
                                        </div>
                                    </td>
                                    <td className="group-list__desc">{group.description}</td>
                                    <td className="group-list__users-count">
                                        {group.users?.length || 0}
                                    </td>
                                    <td>
                                        <div className="group-list__actions">
                                            <button
                                                className="group-list__action-btn group-list__action-btn--edit"
                                                onClick={() => onEdit?.(group)}
                                                title="Editar"
                                            >
                                                <Pencil size={14} />
                                            </button>
                                            <button
                                                className="group-list__action-btn group-list__action-btn--delete"
                                                onClick={() => onDelete?.(group)}
                                                title="Eliminar"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default GroupList;