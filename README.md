# RadioWave

A modern web app for streaming Kenyan radio stations live.

Built with [Next.js](https://nextjs.org) (App Router), [Tailwind CSS](https://tailwindcss.com), [Framer Motion](https://www.framer.com/motion/), and [next-themes](https://github.com/pacocoursey/next-themes).

## Features

- Stream 5 Kenyan radio stations: NRG, Hot 96, Classic 105, Kiss 100, Homeboyz
- Dark/light theme toggle
- Animated UI with spring transitions and hover effects
- Floating player bar with live status indicator
- Responsive grid layout

## Getting Started

```bash
cp .env.local.example .env.local
# Edit .env.local with your stream URLs
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

## Stations

| Station     |
| ----------- |
| NRG Radio   |
| Hot 96      |
| Classic 105 |
| Kiss 100    |
| Homeboyz    |

Update stream URLs in `.env.local`.

## Tech

- **Next.js 16** — App Router, Turbopack
- **Tailwind CSS v4** — utility-first styling, dark mode via class strategy
- **Framer Motion** — spring animations, layout animations
- **next-themes** — theme persistence, flash prevention
- **Lucide React** — icons
