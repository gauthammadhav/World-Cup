// import { Logo } from '../ui/Logo';
// import { Hamburger } from '../ui/Hamburger';

export function Header() {
    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '2rem',
            zIndex: 50
        }}>
            {/* <Logo /> */}
            <div className="logo-placeholder">FIFA Logo (Left)</div>

            {/* <Hamburger /> */}
            <div className="hamburger-placeholder">Hamburger (Right)</div>
        </header>
    );
}
