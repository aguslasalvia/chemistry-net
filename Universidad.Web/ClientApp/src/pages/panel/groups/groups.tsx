import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import Modal from '@components/ui/modal/modal';
import GroupForm from '@components/ui/group-form/group-form';
import GroupEditModal from '@components/ui/group-edit-modal/group-edit-modal';
import GroupList from '@components/ui/group-list/group-list';
import {
    getGroups,
    createGroup,
    updateGroup,
    deleteGroup,
    addUserToGroup,
    removeUserFromGroup,
} from '@services/group.service';
import { getUsers } from '@services/user.service';
import type { Group, Rol } from '@models/group';
import type { User } from '@models/user';

const GroupPage = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [creating, setCreating] = useState(false);
    const [editingGroup, setEditingGroup] = useState<Group | null>(null);

    const loadData = async () => {
        setLoading(true);
        try {
            const [groupsData, usersData] = await Promise.all([getGroups(), getUsers()]);
            setGroups(groupsData);
            setUsers(usersData);
        } catch {
            toast.error('No se pudieron cargar los grupos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleCreate = async (name: string, description: string) => {
        setCreating(true);
        try {
            await createGroup(name, description);
            toast.success('Grupo creado');
            setCreateOpen(false);
            await loadData();
        } catch {
            toast.error('No se pudo crear el grupo');
        } finally {
            setCreating(false);
        }
    };

    const refreshEditingGroup = async (groupId: number) => {
        const updated = await getGroups();
        setGroups(updated);
        setEditingGroup(updated.find((g) => g.id === groupId) ?? null);
    };

    const handleSaveEdit = async (name: string, description: string) => {
        if (!editingGroup) return;
        try {
            await updateGroup(editingGroup.id, name, description);
            toast.success('Grupo actualizado');
            await refreshEditingGroup(editingGroup.id);
        } catch {
            toast.error('No se pudo actualizar el grupo');
        }
    };

    const handleAddUser = async (userId: number, role: Rol) => {
        if (!editingGroup) return;
        try {
            await addUserToGroup(editingGroup.id, userId, role);
            toast.success('Usuario agregado al grupo');
            await refreshEditingGroup(editingGroup.id);
        } catch {
            toast.error('No se pudo agregar el usuario');
        }
    };

    const handleRemoveUser = async (userId: number) => {
        if (!editingGroup) return;
        try {
            await removeUserFromGroup(editingGroup.id, userId);
            toast.success('Usuario removido del grupo');
            await refreshEditingGroup(editingGroup.id);
        } catch {
            toast.error('No se pudo remover el usuario');
        }
    };

    const handleDelete = async (group: Group) => {
        if (!confirm(`¿Eliminar el grupo ${group.name}?`)) return;
        try {
            await deleteGroup(group.id);
            toast.success('Grupo eliminado');
            await loadData();
        } catch {
            toast.error('No se pudo eliminar el grupo');
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold text-fq-text">Gestión de Grupos</h1>
                    <p className="text-fq-muted">Administra los grupos y sus miembros</p>
                </div>
                <button
                    onClick={() => setCreateOpen(true)}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-fq bg-fq-primary px-6 py-3 text-sm font-semibold text-fq-text transition-colors hover:bg-fq-primary-hover"
                >
                    <Plus size={18} />
                    <span>Nuevo Grupo</span>
                </button>
            </div>

            {loading ? (
                <p className="text-fq-muted">Cargando grupos…</p>
            ) : (
                <GroupList groups={groups} onEdit={setEditingGroup} onDelete={handleDelete} />
            )}

            <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="Nuevo Grupo">
                <GroupForm onSubmit={handleCreate} loading={creating} onCancel={() => setCreateOpen(false)} />
            </Modal>

            <Modal isOpen={!!editingGroup} onClose={() => setEditingGroup(null)} title="Editar Grupo">
                {editingGroup && (
                    <GroupEditModal
                        group={editingGroup}
                        allUsers={users}
                        onSave={handleSaveEdit}
                        onAddUser={handleAddUser}
                        onRemoveUser={handleRemoveUser}
                    />
                )}
            </Modal>
        </div>
    );
};

export default GroupPage;
