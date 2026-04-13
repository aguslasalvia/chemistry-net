import "./Hamburger.css"

const Hamburguer = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
    return (
        <button className={`hamburger ${isOpen ? 'hamburger--open' : ''}`} onClick={onClick} aria-label="Toggle menu">
            <span className="hamburger__line"></span>
            <span className="hamburger__line"></span>
            <span className="hamburger__line"></span>
        </button>
    );
}


export default Hamburguer;