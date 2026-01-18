import { ReactNode } from 'react';
import { Header } from './Header';
// import { MenuOverlay } from './MenuOverlay'; // Future

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            {/* <MenuOverlay /> */}
            <main>
                {children}
            </main>
        </>
    );
}
