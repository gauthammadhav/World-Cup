import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { stats } from '../../../data/teams';
import { Trophy, Globe, Users, Calendar } from 'lucide-react';

export function GlobalStats() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.utils.toArray<HTMLElement>('.stat-num').forEach((el) => {
            const target = parseInt(el.innerText || '0', 10);

            gsap.fromTo(el,
                { innerText: 0 },
                {
                    innerText: target,
                    snap: { innerText: 1 },
                    duration: 2.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%"
                    }
                }
            );
        });
    }, { scope: containerRef });

    const getIcon = (label: string) => {
        switch (label) {
            case 'TEAMS': return <Users size={24} color="#FFD700" />;
            case 'MATCHES': return <Calendar size={24} color="#FFD700" />;
            case 'HOST NATIONS': return <Globe size={24} color="#FFD700" />;
            case 'TROPHY': return <Trophy size={24} color="#FFD700" />;
            case 'CONTINENTS': return <Globe size={24} color="#FFD700" />;
            default: return null;
        }
    };

    return (
        <div ref={containerRef} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '4rem',
            padding: '8rem var(--padding-x)',
            background: 'linear-gradient(to top, rgba(0,0,0,1), transparent)',
            position: 'relative',
            zIndex: 10
        }}>
            {stats.map((stat) => (
                <div key={stat.label} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '50%',
                        marginBottom: '0.5rem',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        {getIcon(stat.label)}
                    </div>

                    <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(3rem, 5vw, 5rem)',
                        fontWeight: 900,
                        lineHeight: 0.8,
                        color: '#fff'
                    }}>
                        <span className="stat-num">{stat.value}</span>
                    </div>

                    <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.9rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        color: 'rgba(255,255,255,0.5)'
                    }}>
                        {stat.label}
                    </div>
                </div>
            ))}
        </div>
    );
}
