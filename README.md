// README.md
# Boston Redlining Interactive Visualization

This project uses React, Vite, TypeScript, Tailwind CSS, Recharts, Framer Motion, and react-map-gl to tell the story of historical redlining in Boston with animated charts and an interactive map.

## Setup
```bash
# 1. Scaffold
npm create vite@latest my-viz -- --template react-ts
cd my-viz

# 2. Install dependencies
npm install
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install recharts framer-motion react-intersection-observer react-map-gl mapbox-gl
npm install -D @types/mapbox-gl
```
