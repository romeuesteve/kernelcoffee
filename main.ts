import { ASCIIRenderer, isWebGPUSupported } from 'webgpu-ascii-renderer';

async function init() {
  const errorDiv = document.getElementById('error')!;
  const asciiCanvas = document.getElementById('ascii-canvas') as HTMLCanvasElement;
  const webgpuCanvas = document.getElementById('webgpu-canvas') as HTMLCanvasElement;
  const fpsDiv = document.getElementById('fps')!;
  const toggleButton = document.getElementById('mode-toggle') as HTMLButtonElement;
  const toggleLabels = document.querySelectorAll('.toggle-label');
  const fontSizeSlider = document.getElementById('font-size-slider') as HTMLInputElement;
  const fontSizeValue = document.getElementById('font-size-value')!;

  if (!isWebGPUSupported()) {
    errorDiv.textContent = 'WebGPU is not supported in your browser. Please use Chrome 113+ or Firefox 113+.';
    throw new Error('WebGPU not supported');
  }

  let currentMode: 'ascii' | 'normal' = 'ascii';
  let renderer: ASCIIRenderer;

  function updateToggleUI() {
    if (currentMode === 'ascii') {
      toggleButton.classList.remove('normal');
      toggleLabels[0].classList.add('active');
      toggleLabels[1].classList.remove('active');
      asciiCanvas.style.display = 'block';
      webgpuCanvas.style.display = 'none';
    } else {
      toggleButton.classList.add('normal');
      toggleLabels[0].classList.remove('active');
      toggleLabels[1].classList.add('active');
      asciiCanvas.style.display = 'none';
      webgpuCanvas.style.display = 'block';
    }
  }

  toggleButton.addEventListener('click', () => {
    currentMode = currentMode === 'ascii' ? 'normal' : 'ascii';
    updateToggleUI();
    renderer.setMode(currentMode);
  });

  fontSizeSlider.addEventListener('input', (e) => {
    const newSize = parseInt((e.target as HTMLInputElement).value);
    fontSizeValue.textContent = newSize.toString();
    renderer.setFontSize(newSize);
  });

  updateToggleUI();

  webgpuCanvas.width = 960;
  webgpuCanvas.height = 960;

  try {
    const renderer = new ASCIIRenderer({
      canvas: webgpuCanvas,
      modelUrl: '/resources/apfel.glb',
      mode: 'ascii',
      fontSize: 12,
      autoRotate: true,
      onError: (error) => {
        console.error('Renderer error:', error);
        errorDiv.textContent = `Error: ${error.message}`;
      },
      onFPSUpdate: (fps) => {
        fpsDiv.textContent = `FPS: ${fps}`;
      },
    });

    await renderer.init();

    const asciiCanvasFromRenderer = renderer.getASCIICanvas();
    asciiCanvasFromRenderer.id = 'ascii-canvas';
    webgpuCanvas.parentNode?.replaceChild(asciiCanvasFromRenderer, asciiCanvas);

  } catch (error) {
    console.error('Failed to initialize:', error);
    errorDiv.textContent = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

function runWhenReady() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

runWhenReady();
