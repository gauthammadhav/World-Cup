import logoImg from '../../assets/images/WC26_Logo.png';

export function Logo() {
    return (
        <div className="logo">
            <img
                src={logoImg}
                alt="FIFA World Cup 26"
                style={{
                    height: '80px', // Adjusted for visual balance in header
                    width: 'auto',
                    display: 'block'
                }}
            />
        </div>
    );
}
