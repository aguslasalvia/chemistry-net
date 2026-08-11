interface LogoProps {
    size?: number;
    className?: string;
}

/** The real Facultad de Química mark (same image as the favicon). */
const Logo: React.FC<LogoProps> = ({ size = 34, className = '' }) => {
    return (
        <img
            src="/favicon.png"
            alt="Facultad de Química"
            width={size}
            height={size}
            className={`shrink-0 ${className}`}
            style={{ width: size, height: size }}
        />
    );
};

export default Logo;
