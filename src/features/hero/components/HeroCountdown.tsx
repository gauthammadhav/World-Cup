export function HeroCountdown() {
    const units = ['Days', 'Hours', 'Minutes', 'Seconds'];

    return (
        <div className="countdown" style={{ display: 'flex', gap: '3rem' }}>
            {units.map((unit) => (
                <div key={unit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{
                        fontSize: '3rem',
                        fontWeight: 600, // Medium/Bold
                        fontFamily: 'var(--font-display)',
                        lineHeight: 1,
                        color: '#111'
                    }}>
                        00
                    </span>
                    <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 400, // Regular/Light
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'var(--text-secondary)',
                        marginTop: '0.5rem'
                    }}>
                        {unit}
                    </span>
                </div>
            ))}
        </div>
    );
}
