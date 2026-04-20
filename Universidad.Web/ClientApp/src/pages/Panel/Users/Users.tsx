import { useState } from 'react';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import UserList, { type User } from '@components/ui/UserList/UserList';
import UserEditModal from '@components/ui/UserEditModal/UserEditModal';
import UserForm from '@components/ui/UserForm/UserForm';
import Modal from '@components/ui/Modal/Modal';
import './Users.css';

const mockUsers: User[] = [
    {
        id: 1,
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@fq.edu.uy',
        groups: [
            { id: 1, name: 'News' },
            { id: 3, name: 'Academic' }
        ]
    },
    {
        id: 2,
        firstName: 'María',
        lastName: 'García',
        email: 'maria.garcia@fq.edu.uy',
        groups: [
            { id: 2, name: 'Events' }
        ]
    },
    {
        id: 3,
        firstName: 'Carlos',
        lastName: 'Rodríguez',
        email: 'carlos.rodriguez@fq.edu.uy',
        groups: []
    },
    {
        id: 4,
        firstName: 'Ana',
        lastName: 'López',
        email: 'ana.lopez@fq.edu.uy',
        groups: [
            { id: 1, name: 'News' },
            { id: 4, name: 'Investigacion' },
            { id: 5, name: 'Extensión' }
        ]
    },
    {
        id: 5,
        firstName: 'Pedro',
        lastName: 'Martínez',
        email: 'pedro.martinez@fq.edu.uy',
        groups: [
            { id: 3, name: 'Academic' }
        ]
    },
];

const UsersPage = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [changingPasswordUser, setChangingPasswordUser] = useState<User | null>(null);

    const handleSubmit = (firstName: string, lastName: string, email: string) => {
        setLoading(true);

        setTimeout(() => {
            const newUser: User = {
                id: Date.now(),
                firstName,
                lastName,
                email,
                groups: []
            };
            setUsers([...users, newUser]);
            setLoading(false);
            setIsModalOpen(false);
            toast.success('Usuario creado exitosamente');
        }, 1000);
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
    };

    const handleEditSave = (firstName: string, lastName: string, email: string) => {
        if (!editingUser) return;

        setLoading(true);
        setTimeout(() => {
            setUsers(users.map(u =>
                u.id === editingUser.id
                    ? { ...u, firstName, lastName, email }
                    : u
            ));
            setLoading(false);
            setEditingUser(null);
            toast.success('Usuario actualizado exitosamente');
        }, 1000);
    };

    const handleChangePassword = (user: User) => {
        setChangingPasswordUser(user);
    };

    const handlePasswordSave = (_newPassword: string) => {
        if (!changingPasswordUser) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setChangingPasswordUser(null);
            toast.success('Contraseña actualizada exitosamente');
        }, 1000);
    };

    const handleDelete = (user: User) => {
        setUsers(users.filter(u => u.id !== user.id));
        toast.success('Usuario eliminado');
    };

    return (
        <div className="users-page">
            <div className="users-page__header">
                <div className="users-page__header-text">
                    <h1>Gestión de Usuarios</h1>
                    <p>Administra los usuarios del sistema</p>
                </div>
                <button className="users-page__add-btn" onClick={() => setIsModalOpen(true)}>
                    <Plus size={20} />
                    <span>Nuevo Usuario</span>
                </button>
            </div>

            <div className="users-page__table">
                <UserList
                    users={users}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onChangePassword={handleChangePassword}
                />
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nuevo Usuario">
                <UserForm
                    onSubmit={handleSubmit}
                    loading={loading}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>

            <Modal
                isOpen={!!editingUser}
                onClose={() => setEditingUser(null)}
                title={`Editar: ${editingUser ? `${editingUser.firstName} ${editingUser.lastName}` : ''}`}
            >
                {editingUser && (
                    <UserEditModal
                        user={editingUser}
                        onClose={() => setEditingUser(null)}
                        onSave={handleEditSave}
                        loading={loading}
                    />
                )}
            </Modal>

            <Modal
                isOpen={!!changingPasswordUser}
                onClose={() => setChangingPasswordUser(null)}
                title={`Cambiar Contraseña: ${changingPasswordUser ? `${changingPasswordUser.firstName} ${changingPasswordUser.lastName}` : ''}`}
            >
                {changingPasswordUser && (
                    <UserEditModal
                        user={changingPasswordUser}
                        onClose={() => setChangingPasswordUser(null)}
                        onSavePassword={handlePasswordSave}
                        isPasswordChange
                        loading={loading}
                    />
                )}
            </Modal>
        </div>
    );
};

export default UsersPage;
