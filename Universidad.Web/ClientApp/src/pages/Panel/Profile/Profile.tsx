import { useState } from 'react';
import toast from 'react-hot-toast';
import { User, Mail, Lock, Save, Eye, EyeOff } from 'lucide-react';
import './Profile.css';

interface UserProfile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

const ProfilePage = () => {
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<UserProfile>({
        id: 1,
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@fq.edu.uy'
    });

    const [firstName, setFirstName] = useState(profile.firstName);
    const [lastName, setLastName] = useState(profile.lastName);
    const [email, setEmail] = useState(profile.email);

    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSaveProfile = () => {
        if (!firstName.trim() || !lastName.trim() || !email.trim()) {
            toast.error('Por favor completa todos los campos');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setProfile({
                ...profile,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim()
            });
            setLoading(false);
            toast.success('Perfil actualizado exitosamente');
        }, 1000);
    };

    const handleChangePassword = () => {
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            toast.error('Por favor completa todos los campos');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            toast.error('Las nuevas contraseñas no coinciden');
            return;
        }

        if (newPassword.length < 6) {
            toast.error('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setShowPasswordFields(false);
            toast.success('Contraseña actualizada exitosamente');
        }, 1000);
    };

    return (
        <div className="profile-page">
            <div className="profile-page__header">
                <div className="profile-page__header-text">
                    <h1>Mi Perfil</h1>
                    <p>Administra tu información personal</p>
                </div>
            </div>

            <div className="profile-page__content">
                <div className="profile-page__section">
                    <h2 className="profile-page__section-title">Información Personal</h2>
                    
                    <div className="profile-page__field">
                        <label htmlFor="firstName">Nombre</label>
                        <div className="profile-page__input-wrapper">
                            <User className="profile-page__input-icon" size={18} />
                            <input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="profile-page__field">
                        <label htmlFor="lastName">Apellido</label>
                        <div className="profile-page__input-wrapper">
                            <User className="profile-page__input-icon" size={18} />
                            <input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="profile-page__field">
                        <label htmlFor="email">Email</label>
                        <div className="profile-page__input-wrapper">
                            <Mail className="profile-page__input-icon" size={18} />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <button 
                        className="profile-page__btn profile-page__btn--primary"
                        onClick={handleSaveProfile}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading-spinner"></span>
                        ) : (
                            <>
                                <Save size={18} />
                                <span>Guardar Cambios</span>
                            </>
                        )}
                    </button>
                </div>

                <div className="profile-page__section">
                    <h2 className="profile-page__section-title">
                        <Lock size={18} />
                        <span>Cambiar Contraseña</span>
                    </h2>

                    {!showPasswordFields ? (
                        <button 
                            className="profile-page__btn profile-page__btn--secondary"
                            onClick={() => setShowPasswordFields(true)}
                        >
                            <Lock size={18} />
                            <span>Cambiar Contraseña</span>
                        </button>
                    ) : (
                        <div className="profile-page__password-fields">
                            <div className="profile-page__field">
                                <label htmlFor="currentPassword">Contraseña Actual</label>
                                <div className="profile-page__input-wrapper">
                                    <Lock className="profile-page__input-icon" size={18} />
                                    <input
                                        id="currentPassword"
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        placeholder="Ingresa tu contraseña actual"
                                    />
                                    <button
                                        type="button"
                                        className="profile-page__toggle-password"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    >
                                        {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div className="profile-page__field">
                                <label htmlFor="newPassword">Nueva Contraseña</label>
                                <div className="profile-page__input-wrapper">
                                    <Lock className="profile-page__input-icon" size={18} />
                                    <input
                                        id="newPassword"
                                        type={showNewPassword ? 'text' : 'password'}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Mínimo 6 caracteres"
                                    />
                                    <button
                                        type="button"
                                        className="profile-page__toggle-password"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div className="profile-page__field">
                                <label htmlFor="confirmNewPassword">Confirmar Nueva Contraseña</label>
                                <div className="profile-page__input-wrapper">
                                    <Lock className="profile-page__input-icon" size={18} />
                                    <input
                                        id="confirmNewPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        placeholder="Confirma la nueva contraseña"
                                    />
                                    <button
                                        type="button"
                                        className="profile-page__toggle-password"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div className="profile-page__password-actions">
                                <button 
                                    className="profile-page__btn profile-page__btn--cancel"
                                    onClick={() => {
                                        setShowPasswordFields(false);
                                        setCurrentPassword('');
                                        setNewPassword('');
                                        setConfirmNewPassword('');
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    className="profile-page__btn profile-page__btn--primary"
                                    onClick={handleChangePassword}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="loading-spinner"></span>
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            <span>Actualizar Contraseña</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;