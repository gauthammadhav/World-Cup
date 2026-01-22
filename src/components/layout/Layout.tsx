import { type ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#ffffff' }}>
            <main style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </main>
        </div>
    );
}
