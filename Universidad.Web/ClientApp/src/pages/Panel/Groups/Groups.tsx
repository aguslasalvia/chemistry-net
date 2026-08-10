import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import GroupForm from '@components/ui/GroupForm/GroupForm';
import GroupList, { type Group } from '@components/ui/GroupList/GroupList';
import GroupEditModal from '@components/ui/GroupEditModal/GroupEditModal';
import Modal from '@components/ui/Modal/Modal';
import './Groups.css';
import { createGroup, deleteGroup, getGroups, removeUserFromGroup, updateGroup } from '@services/group.service';

const GroupsPage = () => {
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState<Group[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGroup, setEditingGroup] = useState<Group | null>(null);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const groupsData = await getGroups();
                setGroups(groupsData);
            } catch {
                toast.error('Error al obtener los grupos');
            }
        };

        fetchGroups();
    }, []);

    const handleSubmit = async (name: string, description: string) => {
        setLoading(true);

        try {
            const newGroup = await createGroup(name, description);
            setGroups([...groups, newGroup]);
            setLoading(false);
            setIsModalOpen(false);
            toast.success('Grupo creado exitosamente');
        } catch {
            setLoading(false);
            toast.error('Error al crear el grupo');
        }
    };

    const handleEdit = (group: Group) => {
        setEditingGroup(group);
    };

    const handleEditSave = async (name: string, description: string) => {
        if (!editingGroup) return;

        setLoading(true);
        try {
            await updateGroup(editingGroup.id, name, description);
            setGroups(groups.map(g =>
                g.id === editingGroup.id
                    ? { ...g, name, description }
                    : g
            ));
            setLoading(false);
            setEditingGroup(null);
            toast.success('Grupo actualizado exitosamente');
        } catch {
            setLoading(false);
            toast.error('Error al actualizar el grupo');
        }
    };

    const handleRemoveUser = async (userId: number) => {
        if (!editingGroup) return;

        try {
            await removeUserFromGroup(editingGroup.id, userId);
            const updatedUsers = editingGroup.users?.filter(u => u.id !== userId) || [];
            setEditingGroup({ ...editingGroup, users: updatedUsers });
            setGroups(groups.map(g =>
                g.id === editingGroup.id
                    ? { ...g, users: updatedUsers }
                    : g
            ));
            toast.success('Usuario removido del grupo');
        } catch {
            toast.error('Error al remover el usuario');
        }
    };

    const handleDelete = async (group: Group) => {
        try {
            await deleteGroup(group.id);
            setGroups(groups.filter(g => g.id !== group.id));
            toast.success('Grupo eliminado');
        } catch {
            toast.error('Error al eliminar el grupo');
        }
    };

    return (
        <div className="groups-page">
            <div className="groups-page__header">
                <div className="groups-page__header-text">
                    <h1>Gestión de Grupos</h1>
                    <p>Administra los grupos de trabajo del sistema</p>
                </div>
                <button className="groups-page__add-btn" onClick={() => setIsModalOpen(true)}>
                    <Plus size={20} />
                    <span>Nuevo Grupo</span>
                </button>
            </div>

            <div className="groups-page__table">
                <GroupList groups={groups} onEdit={handleEdit} onDelete={handleDelete} />
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nuevo Grupo">
                <GroupForm
                    onSubmit={handleSubmit}
                    loading={loading}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>

            <Modal
                isOpen={!!editingGroup}
                onClose={() => setEditingGroup(null)}
                title={`Editar: ${editingGroup?.name || ''}`}
            >
                {editingGroup && (
                    <GroupEditModal
                        group={editingGroup}
                        onClose={() => setEditingGroup(null)}
                        onSave={handleEditSave}
                        onRemoveUser={handleRemoveUser}
                        loading={loading}
                    />
                )}
            </Modal>
        </div>
    );
};

export default GroupsPage;
