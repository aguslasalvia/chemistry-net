import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { loginUser } from '@services/user.service';
import './Login.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Por favor completa todos los campos');
            return;
        }

        setLoading(true);
        try {
            await loginUser(email, password);
            navigate('/panel/dashboard');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <aside className="login-brand">
                <div className="login-molecule" aria-hidden="true">
                    <span className="login-molecule__bond login-molecule__bond--1"></span>
                    <span className="login-molecule__bond login-molecule__bond--2"></span>
                    <span className="login-molecule__bond login-molecule__bond--3"></span>
                    <span className="login-molecule__bond login-molecule__bond--4"></span>
                    <span className="login-molecule__bond login-molecule__bond--5"></span>
                    <span className="login-molecule__bond login-molecule__bond--6"></span>
                    <span className="login-molecule__hex login-molecule__hex--center fq-hex"></span>
                    <span className="login-molecule__hex login-molecule__hex--n fq-hex"></span>
                    <span className="login-molecule__hex login-molecule__hex--s fq-hex"></span>
                    <span className="login-molecule__hex login-molecule__hex--nw fq-hex"></span>
                    <span className="login-molecule__hex login-molecule__hex--ne fq-hex"></span>
                    <span className="login-molecule__hex login-molecule__hex--sw fq-hex"></span>
                    <span className="login-molecule__hex login-molecule__hex--se fq-hex"></span>
                </div>

                <div className="login-brand__content">
                    <img src="/logo-inverted.png" alt="" className="login-brand__logo" />
                    <p className="login-brand__eyebrow">Universidad de la República</p>
                    <h1 className="login-brand__title">Panel de la Facultad de Química</h1>
                    <p className="login-brand__text">
                        Un lugar para administrar el contenido, los grupos y las personas
                        detrás del sitio de la facultad.
                    </p>
                </div>
            </aside>

            <main className="login-form-pane">
                <div className="login-container">
                    <div className="login-header">
                        <h2 className="login-title">Iniciar sesión</h2>
                        <p className="login-subtitle">Accedé con tu cuenta de la Facultad de Química</p>
                    </div>

                    {error && (
                        <div className="login-error" role="alert">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Correo electrónico</label>
                            <div className="input-wrapper">
                                <Mail className="input-icon" size={20} />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="correo@fq.edu.uy"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={20} />
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Tu contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" />
                                <span>Recordarme</span>
                            </label>
                            <a href="/recuperar-password" className="forgot-password">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        <button type="submit" className="btn-login" disabled={loading}>
                            {loading ? (
                                <span className="loading-spinner"></span>
                            ) : (
                                <>
                                    <span>Ingresar</span>
                                    <LogIn size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>¿No tenés cuenta? <a href="/registro">Solicitar acceso</a></p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;
