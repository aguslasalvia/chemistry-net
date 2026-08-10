import { useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { Mail, Lock, Loader2, LogIn } from 'lucide-react';
import Logo from '@components/ui/Logo/Logo';
import { loginUser } from '@services/user.service';
import { setCurrentUserId } from '@utils/session';

const inputClasses =
    'w-full rounded-fq border border-fq-border bg-fq-surface py-3.5 pr-4 pl-11 text-sm text-fq-text placeholder:text-fq-muted/70 transition-colors focus:border-fq-primary focus:bg-white';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim() || !password) {
            toast.error('Completá tu correo y contraseña');
            return;
        }

        setLoading(true);
        try {
            const user = await loginUser(email.trim(), password);
            setCurrentUserId(user.id);
            navigate('/panel/dashboard');
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'No se pudo iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-dvh flex-col md:flex-row">
            <div className="flex flex-col justify-center gap-6 bg-fq-dark px-10 py-16 text-white md:w-1/2 md:px-16">
                <Logo size={40} />
                <div>
                    <div className="mb-3 text-[13px] font-bold tracking-wide text-fq-primary-light uppercase">
                        Universidad de la República
                    </div>
                    <h1 className="mb-4 text-h2 font-bold text-white">Panel de la Facultad de Química</h1>
                    <p className="max-w-sm text-white/75">
                        Un lugar para administrar el contenido, los grupos y las personas detrás
                        del sitio de la facultad.
                    </p>
                </div>
            </div>

            <div className="flex flex-1 items-center justify-center px-6 py-16 md:px-16">
                <form onSubmit={handleSubmit} className="w-full max-w-sm">
                    <h2 className="mb-2 font-display text-2xl font-bold text-fq-text">Iniciar sesión</h2>
                    <p className="mb-8 text-sm text-fq-muted">
                        Accedé con tu cuenta de la Facultad de Química
                    </p>

                    <div className="mb-5 flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-semibold text-fq-text">
                            Correo electrónico
                        </label>
                        <div className="relative flex items-start">
                            <Mail
                                className="pointer-events-none absolute top-3.5 left-3.5 text-fq-muted"
                                size={18}
                            />
                            <input
                                id="email"
                                type="email"
                                placeholder="correo@fq.edu.uy"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    <div className="mb-6 flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm font-semibold text-fq-text">
                            Contraseña
                        </label>
                        <div className="relative flex items-start">
                            <Lock
                                className="pointer-events-none absolute top-3.5 left-3.5 text-fq-muted"
                                size={18}
                            />
                            <input
                                id="password"
                                type="password"
                                placeholder="Tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex min-h-11 w-full items-center justify-center gap-2 rounded-fq bg-fq-primary py-3.5 font-display text-sm font-bold text-fq-text transition-colors hover:bg-fq-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
                        <span>Ingresar</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
