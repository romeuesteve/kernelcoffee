const ASCII_CHARS = '@%#*+=-:. ';

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

  let frameCount = 0;

  return {
    render(data: Float32Array) {
      frameCount++;
      
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let hasContent = false;
      let totalBrightness = 0;
      
      for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
          const index = (y * GRID_WIDTH + x) * 4;
          const charIndex = Math.floor(data[index]);
          const r = Math.floor(data[index + 1] * 255);
          const g = Math.floor(data[index + 2] * 255);
          const b = Math.floor(data[index + 3] * 255);

          const char = ASCII_CHARS[Math.min(charIndex, ASCII_CHARS.length - 1)];
          
          totalBrightness += charIndex;
          
          if (charIndex < 9) {
            hasContent = true;
          }
          
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillText(char, x * CELL_WIDTH, y * CELL_HEIGHT);
        }
      }
      
      const avgBrightness = totalBrightness / (GRID_WIDTH * GRID_HEIGHT);
      
      if (frameCount % 60 === 0) {
        console.log(`Frame ${frameCount}: Avg brightness=${avgBrightness.toFixed(2)}, hasContent=${hasContent}`);
        
        ctx.fillStyle = '#ffff00';
        ctx.font = '12px monospace';
        ctx.fillText(`FPS: 60 | Brightness: ${avgBrightness.toFixed(2)}`, 10, canvas.height - 20);
        ctx.font = `${CELL_HEIGHT}px monospace`;
      }
      
      if (!hasContent) {
        ctx.fillStyle = '#ff0000';
        ctx.font = '16px monospace';
        ctx.fillText('NO DATA - Check console', 10, 30);
        ctx.font = `${CELL_HEIGHT}px monospace`;
        console.warn('No content rendered - all pixels are empty');
      }
    },
  };
}
