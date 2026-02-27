const ASCII_CHARS = ' .epflÄ'; //' :=-+*#%&@';
const BRIGHTNESS = 2.5;
const GAMMA = 0.9;

export function createTextRenderer(canvas: HTMLCanvasElement) {
  if (!canvas) {
    throw new Error('Canvas element is null');
  }

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get 2D context from canvas');
  }

  const GRID_WIDTH = 120;
  const GRID_HEIGHT = 80;
  const CELL_WIDTH = 8;
  const CELL_HEIGHT = 12;

  canvas.width = GRID_WIDTH * CELL_WIDTH;
  canvas.height = GRID_HEIGHT * CELL_HEIGHT;

  ctx.font = `${CELL_HEIGHT}px monospace`;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';

  const colorBatches = new Map<string, Array<{char: string, x: number, y: number}>>();

  return {
    render(data: Float32Array) {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      colorBatches.clear();

      for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
          const index = (y * GRID_WIDTH + x) * 4;
          const charIndex = Math.floor(data[index]);
          const r = Math.min(255, Math.floor(Math.pow(data[index + 1], GAMMA) * 255 * BRIGHTNESS));
          const g = Math.min(255, Math.floor(Math.pow(data[index + 2], GAMMA) * 255 * BRIGHTNESS));
          const b = Math.min(255, Math.floor(Math.pow(data[index + 3], GAMMA) * 255 * BRIGHTNESS));

          const char = ASCII_CHARS[Math.min(charIndex, ASCII_CHARS.length - 1)];
          const colorKey = (r << 16) | (g << 8) | b;

          let batch = colorBatches.get(colorKey.toString());
          if (!batch) {
            batch = [];
            colorBatches.set(colorKey.toString(), batch);
          }
          batch.push({ char, x: x * CELL_WIDTH, y: y * CELL_HEIGHT });
        }
      }

      for (const [colorKey, cells] of colorBatches) {
        const colorNum = parseInt(colorKey, 10);
        const r = (colorNum >> 16) & 0xFF;
        const g = (colorNum >> 8) & 0xFF;
        const b = colorNum & 0xFF;

        ctx.fillStyle = `rgb(${r},${g},${b})`;

        for (const cell of cells) {
          ctx.fillText(cell.char, cell.x, cell.y);
        }
      }
    },
  };
}
