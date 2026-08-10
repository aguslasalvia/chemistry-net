import { useState } from 'react';
import toast from 'react-hot-toast';
import { User, Mail, Plus, Loader2 } from 'lucide-react';

interface UserFormProps {
    onSubmit: (firstName: string, lastName: string, email: string) => void;
    loading?: boolean;
    onCancel?: () => void;
}

const inputClasses =
    'w-full rounded-fq border border-fq-border bg-fq-surface py-3.5 pr-4 pl-11 text-sm text-fq-text placeholder:text-fq-muted/70 transition-colors focus:border-fq-primary focus:bg-fq-bg';

const UserForm: React.FC<UserFormProps> = ({
    onSubmit,
    loading = false,
    onCancel
}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!firstName.trim() || !lastName.trim() || !email.trim()) {
            toast.error('Por favor completa todos los campos');
            return;
        }

        onSubmit(firstName.trim(), lastName.trim(), email.trim());
        setFirstName('');
        setLastName('');
        setEmail('');
    };

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="text-sm font-semibold text-fq-text">Nombre</label>
                <div className="relative flex items-start">
                    <User className="pointer-events-none absolute left-3.5 top-3.5 text-fq-muted" size={18} />
                    <input
                        id="firstName"
                        type="text"
                        placeholder="Ingresa el nombre"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        autoComplete="off"
                        className={inputClasses}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="lastName" className="text-sm font-semibold text-fq-text">Apellido</label>
                <div className="relative flex items-start">
                    <User className="pointer-events-none absolute left-3.5 top-3.5 text-fq-muted" size={18} />
                    <input
                        id="lastName"
                        type="text"
                        placeholder="Ingresa el apellido"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        autoComplete="off"
                        className={inputClasses}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-fq-text">Email</label>
                <div className="relative flex items-start">
                    <Mail className="pointer-events-none absolute left-3.5 top-3.5 text-fq-muted" size={18} />
                    <input
                        id="email"
                        type="email"
                        placeholder="correo@fq.edu.uy"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                        className={inputClasses}
                    />
                </div>
            </div>

            <div className="mt-2 flex justify-end gap-3">
                {onCancel && (
                    <button
                        type="button"
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-fq border border-fq-border bg-transparent px-6 py-3 text-sm font-semibold text-fq-text transition-colors hover:border-fq-muted hover:bg-fq-surface"
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>
                )}
                <button
                    type="submit"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-fq bg-fq-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-fq-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={loading}
                >
                    {loading ? (
                        <Loader2 size={18} className="animate-spin" />
                    ) : (
                        <>
                            <Plus size={18} />
                            <span>Crear Usuario</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default UserForm;
