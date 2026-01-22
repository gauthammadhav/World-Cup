import React from 'react';

export function HostFlagPanel({ country, flagImage, style }: { country: string, flagImage: string, style?: React.CSSProperties }) {
    return (
        <div
            style={{
                width: '100%',
                maxWidth: '100%', // Layout controlled by parent
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem', // Space between flag and text
                ...style
            }}
        >
            {/* Flag Container */}
            <div style={{
                width: '100%',
                aspectRatio: '3/2', // Standard flag ratio for authentic look
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#f0f0f0' // Fallback
            }}>
                <img
                    src={flagImage}
                    alt={`${country} Flag`}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                    }}
                />
            </div>

            {/* Country Label - Below Flag */}
            <div>
                <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem', // Modest size
                    fontWeight: 700, // Bold/Medium
                    color: '#ffffff', // Light text
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em', // Tight letter spacing
                    lineHeight: 1,
                    margin: 0
                }}>
                    {country}
                </h3>
            </div>
        </div>
    );
}
