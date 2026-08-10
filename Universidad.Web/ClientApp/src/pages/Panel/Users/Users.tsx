import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import Modal from '@components/ui/Modal/Modal';
import UserForm from '@components/ui/UserForm/UserForm';
import UserEditModal from '@components/ui/UserEditModal/UserEditModal';
import UserList from '@components/ui/UserList/UserList';
import { getUsers, createUser, updateUser, deleteUser, changeUserPassword } from '@services/user.service';
import type { User } from '@models/user';

const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [creating, setCreating] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const loadUsers = async () => {
        setLoading(true);
        try {
            setUsers(await getUsers());
        } catch {
            toast.error('No se pudieron cargar los usuarios');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleCreate = async (name: string, lastName: string, email: string) => {
        setCreating(true);
        try {
            const ok = await createUser(name, lastName, email);
            if (!ok) throw new Error();
            toast.success('Usuario creado');
            setCreateOpen(false);
            await loadUsers();
        } catch {
            toast.error('No se pudo crear el usuario');
        } finally {
            setCreating(false);
        }
    };

    const handleSaveEdit = async (name: string, lastName: string, email: string) => {
        if (!editingUser) return;
        try {
            await updateUser(editingUser.id, name, lastName, email);
            toast.success('Usuario actualizado');
            setEditingUser(null);
            await loadUsers();
        } catch {
            toast.error('No se pudo actualizar el usuario');
        }
    };

    const handleChangePassword = async (newPassword: string) => {
        if (!editingUser) return;
        try {
            await changeUserPassword(editingUser.id, newPassword);
            toast.success('Contraseña actualizada');
        } catch {
            toast.error('No se pudo cambiar la contraseña');
        }
    };

    const handleDelete = async (user: User) => {
        if (!confirm(`¿Eliminar a ${user.name} ${user.lastName}?`)) return;
        try {
            await deleteUser(user.id);
            toast.success('Usuario eliminado');
            await loadUsers();
        } catch {
            toast.error('No se pudo eliminar el usuario');
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold text-fq-text">Gestión de Usuarios</h1>
                    <p className="text-fq-muted">Administra los usuarios del sistema</p>
                </div>
                <button
                    onClick={() => setCreateOpen(true)}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-fq bg-fq-primary px-6 py-3 text-sm font-semibold text-fq-text transition-colors hover:bg-fq-primary-hover"
                >
                    <Plus size={18} />
                    <span>Nuevo Usuario</span>
                </button>
            </div>

            {loading ? (
                <p className="text-fq-muted">Cargando usuarios…</p>
            ) : (
                <UserList users={users} onEdit={setEditingUser} onDelete={handleDelete} />
            )}

            <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="Nuevo Usuario">
                <UserForm onSubmit={handleCreate} loading={creating} onCancel={() => setCreateOpen(false)} />
            </Modal>

            <Modal isOpen={!!editingUser} onClose={() => setEditingUser(null)} title="Editar Usuario">
                {editingUser && (
                    <UserEditModal
                        user={editingUser}
                        onSave={handleSaveEdit}
                        onChangePassword={handleChangePassword}
                        onClose={() => setEditingUser(null)}
                    />
                )}
            </Modal>
        </div>
    );
};

export default UsersPage;
