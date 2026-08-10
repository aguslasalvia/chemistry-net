interface LogoProps {
    size?: number;
    className?: string;
}

/** The "Fq" mark — sole brand signature (replaces the old hexagon motif). */
const Logo: React.FC<LogoProps> = ({ size = 34, className = '' }) => {
    return (
        <span
            className={`inline-flex shrink-0 items-center justify-center bg-fq-primary font-display font-bold text-white ${className}`}
            style={{ width: size, height: size, fontSize: size * 0.41, borderRadius: size * 0.235 }}
        >
            Fq
        </span>
    );
};

export default Logo;
