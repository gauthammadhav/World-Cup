# Tech Stack

## Core
- **Framework**: React 19 + Vite
  - *Reasoning*: High performance, fast HMR, industry standard for modern SPAs.
- **Language**: TypeScript
  - *Reasoning*: Type safety is essential for ensuring robust interactive logic and component props.

## Styling
- **Methodology**: CSS Modules + Modern CSS Variables
  - *Reasoning*:
    - **Scoped Styling**: CSS Modules prevent class name collisions.
    - **Control**: Direct control over keyframes and complex animations without framework abstraction overhead.
    - **Variables**: CSS Variables for theming and easy tuning of "cinematic" values (easing, colors).
  - *Anti-Pattern*: Tailwind (avoided per constraints to keep "vanilla" feel and precise control).

## Animation
- **Library**: Framer Motion
  - *Reasoning*:
    - Declarative syntax for complex timeline-based animations.
    - Excellent support for layout transitions (Flip).
    - Gestures and scroll-linked animations out of the box.

## Routing
- **Library**: React Router DOM v6
  - *Reasoning*: Standard client-side routing.

## Assets & Fonts
- **Fonts**:
  - *Primary*: Bebas Neue (Hero/Headings)
  - *Secondary*: Inter/Roboto (Body)
  - *Icons*: Lucide React
