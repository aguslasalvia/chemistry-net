import { useState } from 'react';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import GroupForm from '../../../components/ui/GroupForm/GroupForm';
import GroupList, { type Group } from '../../../components/ui/GroupList/GroupList';
import GroupEditModal from '../../../components/ui/GroupEditModal/GroupEditModal';
import Modal from '../../../components/ui/Modal/Modal';
import './Groups.css';

const mockGroups: Group[] = [
    {
        id: 1,
        name: 'News',
        description: 'Grupo de noticias y comunicaciones',
        users: [
            { id: 1, name: 'Juan Perez', email: 'juan@fq.edu.uy' },
            { id: 2, name: 'Maria Garcia', email: 'maria@fq.edu.uy' }
        ]
    },
    {
        id: 2,
        name: 'Events',
        description: 'Gestión de eventos académicos',
        users: [
            { id: 3, name: 'Carlos Rodriguez', email: 'carlos@fq.edu.uy' }
        ]
    },
    { id: 3, name: 'Academic', description: 'Contenido académico y posgrados', users: [] },
    { id: 4, name: 'Investigacion', description: 'Proyectos de investigación actuales', users: [] },
    { id: 5, name: 'Extensión', description: 'Actividades de extensión universitaria', users: [] },
];

const GroupsPage = () => {
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState<Group[]>(mockGroups);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGroup, setEditingGroup] = useState<Group | null>(null);

    const handleSubmit = (name: string, description: string) => {
        setLoading(true);

        setTimeout(() => {
            const newGroup: Group = {
                id: Date.now(),
                name,
                description,
                users: []
            };
            setGroups([...groups, newGroup]);
            setLoading(false);
            setIsModalOpen(false);
            toast.success('Grupo creado exitosamente');
        }, 1000);
    };

    const handleEdit = (group: Group) => {
        setEditingGroup(group);
    };

    const handleEditSave = (name: string, description: string) => {
        if (!editingGroup) return;

        setLoading(true);
        setTimeout(() => {
            setGroups(groups.map(g =>
                g.id === editingGroup.id
                    ? { ...g, name, description }
                    : g
            ));
            setLoading(false);
            setEditingGroup(null);
            toast.success('Grupo actualizado exitosamente');
        }, 1000);
    };

    const handleRemoveUser = (userId: number) => {
        if (!editingGroup) return;

        const updatedUsers = editingGroup.users?.filter(u => u.id !== userId) || [];
        setEditingGroup({ ...editingGroup, users: updatedUsers });
        setGroups(groups.map(g =>
            g.id === editingGroup.id
                ? { ...g, users: updatedUsers }
                : g
        ));
    };

    const handleDelete = (group: Group) => {
        setGroups(groups.filter(g => g.id !== group.id));
        toast.success('Grupo eliminado');
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