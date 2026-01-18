interface HamburgerProps {
    isOpen?: boolean;
    onClick?: () => void;
}

export function Hamburger({ isOpen, onClick }: HamburgerProps) {
    return (
        <button onClick={onClick} className="hamburger">
            {/* Animated bars will go here */}
            Menu
        </button>
    );
}
