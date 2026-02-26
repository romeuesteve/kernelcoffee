# WebGPU ASCII Renderer

A real-time 3D ASCII renderer using WebGPU compute shaders. This project demonstrates advanced GPU computing by converting 3D graphics into colored ASCII art in real-time.

## Features

- **Real-time 3D rendering** using WebGPU
- **GPU-accelerated ASCII conversion** via compute shaders
- **Interactive camera controls** (drag to rotate, scroll to zoom)
- **Colored ASCII output** with brightness-mapped characters
- **High performance** - runs at 60 FPS

## Technology Stack

- **Vite** - Fast development server with HMR
- **TypeScript** - Type-safe development
- **WebGPU** - Modern GPU API for rendering and compute
- **WGSL** - WebGPU Shading Language for shaders

## Project Structure

```
landing/
├── src/
│   ├── main.ts              # Entry point and render loop
│   ├── webgpu.ts            # WebGPU device/context setup
│   ├── mesh.ts              # Procedural mesh generation
│   ├── render-pipeline.ts   # 3D rendering pipeline
│   ├── compute-pipeline.ts  # ASCII conversion compute shader
│   ├── text-renderer.ts     # Canvas text rendering
│   ├── camera.ts            # Camera controls and matrices
│   └── vite-env.d.ts        # Vite type declarations
├── shaders/
│   ├── render.wgsl          # 3D vertex+fragment shaders
│   └── ascii-compute.wgsl   # ASCII conversion compute shader
├── resources/
│   └── apfel.glb            # 3D model (not currently used)
└── index.html               # Entry HTML
```

## Getting Started

### Prerequisites

- Node.js 18+
- A WebGPU-compatible browser (Chrome 113+, Edge 113+, or Firefox Nightly)
- WebGPU enabled in your browser

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How It Works

### 1. 3D Rendering Pipeline

The 3D scene is rendered to a texture using a standard vertex/fragment shader pipeline:
- Vertex shader transforms 3D vertices using MVP (Model-View-Projection) matrix
- Fragment shader applies lighting and outputs colored pixels
- Output: 120x80 texture with RGBA colors

### 2. ASCII Conversion (Compute Shader)

A compute shader converts the rendered texture into ASCII characters:
- Divides texture into a grid of 120x80 cells
- For each cell:
  - Averages pixel colors and brightness
  - Maps brightness to ASCII character (@%#*+=-:. )
  - Preserves RGB color information
- Output: Storage buffer with (char_index, r, g, b) per cell

### 3. Text Rendering

The CPU reads the GPU output and renders ASCII to canvas:
- Iterates over the grid
- Draws each character with its corresponding color
- Updates at 60 FPS

## ASCII Character Mapping

```
Brightness  Character  Visual
0.00-0.10    @         ████ (darkest)
0.10-0.20    %         ███▒▒
0.20-0.30    #         ███░░
0.30-0.40    *         ██▒▒▒▒
0.40-0.50    +         ██░░░░
0.50-0.60    =         █▒▒▒▒▒
0.60-0.70    -         █░░░░░
0.70-0.80    :         ▒▒▒▒▒▒
0.80-0.90    .         ░░░░░░
0.90-1.00    (space)   (lightest)
```

## Controls

- **Click and drag**: Rotate the model
- **Scroll wheel**: Zoom in/out
- The model auto-smooths to target position for fluid motion

## Performance

- **Resolution**: 120x80 characters (9600 cells)
- **Frame rate**: ~60 FPS on modern GPUs
- **Rendering**: GPU-accelerated (both 3D and ASCII conversion)
- **Bottleneck**: GPU-to-CPU buffer transfer for text rendering

## Browser Compatibility

WebGPU is available in:
- Chrome 113+ (enable via `chrome://flags/#enable-unsafe-webgpu`)
- Edge 113+
- Firefox Nightly (enable in `about:config`)
- Safari Technology Preview

## Future Improvements

- [ ] Load and render the apfel.glb model
- [ ] Add material and texture support
- [ ] Implement multiple ASCII styles
- [ ] Add post-processing effects
- [ ] Optimize GPU-to-CPU transfer
- [ ] Support for custom color palettes
- [ ] Export ASCII art as text/image

## License

ISC
