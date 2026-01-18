import { useCountdown } from '../../../utils/useCountdown';

export function HeroCountdown() {
    // Target Date: World Cup 2026 Opening
    const { days, hours, minutes, seconds } = useCountdown('June 11, 2026 00:00:00');

    const timeUnits = [
        { label: 'Days', value: days },
        { label: 'Hours', value: hours },
        { label: 'Minutes', value: minutes },
        { label: 'Seconds', value: seconds }
    ];

    return (
        <div className="countdown" style={{ display: 'flex', gap: '3rem' }}>
            {timeUnits.map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{
                        fontSize: '3rem',
                        fontWeight: 600, // Medium/Bold
                        fontFamily: 'var(--font-display)',
                        lineHeight: 1,
                        color: '#111',
                        fontVariantNumeric: 'tabular-nums' // Monospaced numbers for stability
                    }}>
                        {value}
                    </span>
                    <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 400, // Regular/Light
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'var(--text-secondary)',
                        marginTop: '0.5rem'
                    }}>
                        {label}
                    </span>
                </div>
            ))}
        </div>
    );
}
