import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import UserList, { type User } from "@components/ui/UserList/UserList";
import UserEditModal from "@components/ui/UserEditModal/UserEditModal";
import UserForm from "@components/ui/UserForm/UserForm";
import Modal from "@components/ui/Modal/Modal";
import "./Users.css";
import { createUser, getUsers } from "@services/user.service";

const UsersPage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [changingPasswordUser, setChangingPasswordUser] = useState<User | null>(
    null,
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        toast.error("Error al obtener los usuarios");
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = (name: string, lastName: string, email: string) => {
    setLoading(true);

    setTimeout(async () => {
      const newUser: User = {
        id: Date.now(),
        name,
        lastName,
        email,
        groups: [],
      };

      try {
        await createUser(newUser);
        setUsers([...users, newUser]);
        setLoading(false);
        setIsModalOpen(false);
        toast.success("Usuario creado exitosamente");
      } catch (error) {
        setLoading(false);
        toast.error("Error al crear el usuario");
      }
    }, 1000);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleEditSave = (
    name: string,
    lastName: string,
    email: string,
  ) => {
    if (!editingUser) return;

    setLoading(true);
    setTimeout(() => {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id ? { ...u, name, lastName, email } : u,
        ),
      );
      setLoading(false);
      setEditingUser(null);
      toast.success("Usuario actualizado exitosamente");
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
      toast.success("Contraseña actualizada exitosamente");
    }, 1000);
  };

  const handleDelete = (user: User) => {
    setUsers(users.filter((u) => u.id !== user.id));
    toast.success("Usuario eliminado");
  };

  return (
    <div className="users-page">
      <div className="users-page__header">
        <div className="users-page__header-text">
          <h1>Gestión de Usuarios</h1>
          <p>Administra los usuarios del sistema</p>
        </div>
        <button
          className="users-page__add-btn"
          onClick={() => setIsModalOpen(true)}
        >
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nuevo Usuario"
      >
        <UserForm
          onSubmit={handleSubmit}
          loading={loading}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        title={`Editar: ${editingUser ? `${editingUser.name} ${editingUser.lastName}` : ""}`}
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
        title={`Cambiar Contraseña: ${changingPasswordUser ? `${changingPasswordUser.name} ${changingPasswordUser.lastName}` : ""}`}
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
