import type { HTMLAttributes } from 'react';

type HexagonProps = HTMLAttributes<HTMLSpanElement>;

/** Flat-top hexagon (the benzene ring) — the FQ brand signature shape.
 *  Callers set width via className; height follows the 44/38 aspect ratio. */
const Hexagon: React.FC<HexagonProps> = ({ className = '', ...rest }) => {
    return (
        <span
            className={`fq-hex inline-flex aspect-[44/38] items-center justify-center ${className}`}
            {...rest}
        />
    );
};

export default Hexagon;
