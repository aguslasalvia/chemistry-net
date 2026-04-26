import { useState } from "react";
import { Pencil, Trash2, User, Search, Key } from "lucide-react";
import "./UserList.css";

export interface UserGroup {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  groups?: UserGroup[];
}

interface UserListProps {
  users: User[] | [];
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  onChangePassword?: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  onEdit,
  onDelete,
  onChangePassword,
}) => {
  const [search, setSearch] = useState("");

  const filteredUsers = Array.isArray(users)
    ? users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.lastName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    )
    : [];


  return (
    <div className="user-list">
      <div className="user-list__header">
        <div className="user-list__header-icon">
          <User size={20} />
        </div>
        <div className="user-list__header-text">
          <h2>Usuarios Existentes</h2>
          <p>
            {users.length} usuario{users.length !== 1 ? "s" : ""} registrado
            {users.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="user-list__search">
        <Search size={18} />
        <input
          type="text"
          placeholder="Buscar usuarios..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredUsers.length === 0 ? (
        <div className="user-list__empty">
          <p>
            {search ? "No se encontraron usuarios" : "No hay usuarios creados"}
          </p>
          <span>
            {search
              ? "Intenta con otros términos de búsqueda"
              : "Crea tu primer usuario usando el formulario"}
          </span>
        </div>
      ) : (
        <div className="user-list__table-wrapper">
          <table className="user-list__table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Grupos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-list__name-cell">
                      <div className="user-list__name-icon">
                        <User size={14} />
                      </div>
                      <div className="user-list__name-info">
                        <span className="user-list__fullname">
                          {user.name} {user.lastName}
                        </span>
                        <span className="user-list__email">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="user-list__groups">
                    {user.groups && user.groups.length > 0 ? (
                      <div className="user-list__groups-tags">
                        {user.groups.slice(0, 3).map((group) => (
                          <span key={group.id} className="user-list__group-tag">
                            {group.name}
                          </span>
                        ))}
                        {user.groups.length > 3 && (
                          <span className="user-list__group-more">
                            +{user.groups.length - 3}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="user-list__no-groups">Sin grupos</span>
                    )}
                  </td>
                  <td>
                    <div className="user-list__actions">
                      <button
                        className="user-list__action-btn user-list__action-btn--password"
                        onClick={() => onChangePassword?.(user)}
                        title="Cambiar contraseña"
                      >
                        <Key size={14} />
                      </button>
                      <button
                        className="user-list__action-btn user-list__action-btn--edit"
                        onClick={() => onEdit?.(user)}
                        title="Editar"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        className="user-list__action-btn user-list__action-btn--delete"
                        onClick={() => onDelete?.(user)}
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

export default UserList;
