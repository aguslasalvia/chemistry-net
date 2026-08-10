import Logo from '@components/ui/Logo/Logo';

const NotFound = () => {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
            <Logo size={48} />
            <div>
                <div className="font-display text-6xl font-extrabold text-fq-text">404</div>
                <p className="mt-3 max-w-sm text-fq-muted">
                    No encontramos la página que estás buscando.
                </p>
            </div>
            <a
                href="/"
                className="rounded-fq bg-fq-primary px-6 py-3 font-display text-sm font-bold text-fq-text transition-colors hover:bg-fq-primary-hover"
            >
                Volver al inicio
            </a>
        </div>
    );
};

export default NotFound;
