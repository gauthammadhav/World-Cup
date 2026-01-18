import { Logo } from '../ui/Logo';
import { Hamburger } from '../ui/Hamburger';

interface HeaderProps {
    onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    return (
        <header style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--padding-y) var(--padding-x)',
            zIndex: 50,
            height: 'var(--header-height)'
        }}>
            <Logo />
            <div onClick={onMenuClick} style={{ cursor: 'pointer' }}>
                <Hamburger />
            </div>
        </header>
    );
}
