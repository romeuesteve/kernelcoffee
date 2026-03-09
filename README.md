# kernelcoffee

A modern landing page showcasing WebGPU-powered 3D ASCII rendering technology.

## Tech Stack

- **Astro** - Static site builder
- **React** - UI framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **WebGPU ASCII Renderer** - Custom 3D rendering library (submodule)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone --recursive https://github.com/romeuesteve/kernelcoffee.git
cd kernelcoffee

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:4321` to see the site.

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Submodule

This project uses `webgpu-ascii-renderer` as a git submodule. To initialize or update the submodule:

```bash
git submodule update --init --recursive
```

## License

MIT
