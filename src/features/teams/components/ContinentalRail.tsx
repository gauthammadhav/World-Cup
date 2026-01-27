import { useRef } from 'react';
import { motion } from 'framer-motion';
import { teams } from '../../../data/teams';
import { TeamCard } from './TeamCard';

interface ContinentalRailProps {
    continent: string;
    label: string;
}

export function ContinentalRail({ continent, label }: ContinentalRailProps) {
    // Filter teams for this continent
    const regionTeams = teams.filter(t => t.continent === continent);

    // Sort by tier (Favorites first) then ranking
    const sortedTeams = regionTeams.sort((a, b) => {
        const tierOrder = { 'Favorite': 1, 'Contender': 2, 'Challenger': 3 };
        const tierDiff = tierOrder[a.tier] - tierOrder[b.tier];
        if (tierDiff !== 0) return tierDiff;
        return a.ranking - b.ranking; // Ascending rank
    });

    if (sortedTeams.length === 0) return null;

    return (
        <div style={{ marginBottom: '6rem' }}>
            {/* Rail Header */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8 }}
                style={{
                    padding: '0 var(--padding-x)',
                    marginBottom: '2rem',
                    borderLeft: '4px solid #fff',
                    paddingLeft: '1rem',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '1rem'
                }}
            >
                <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    color: '#fff',
                    margin: 0,
                    lineHeight: 1
                }}>
                    {label}
                </h3>
                <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.5)',
                    textTransform: 'uppercase'
                }}>
                    {sortedTeams.length} Nations
                </span>
            </motion.div>

            {/* Scroll Container */}
            <div
                className="hide-scrollbar"
                style={{
                    display: 'flex',
                    gap: '2rem',
                    padding: '0 var(--padding-x)',
                    overflowX: 'auto',
                    scrollBehavior: 'smooth',
                    paddingBottom: '2rem', // Space for hover lift
                    cursor: 'grab'
                }}
            >
                {sortedTeams.map((team, index) => (
                    <motion.div
                        key={team.id}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "200px" }} // Load early
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                    >
                        <TeamCard team={team} />
                    </motion.div>
                ))}

                {/* End padding matching padding-x */}
                <div style={{ width: 'var(--padding-x)', flexShrink: 0 }} />
            </div>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
