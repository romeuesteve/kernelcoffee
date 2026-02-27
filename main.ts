import { ASCIIRenderer, isWebGPUSupported } from 'webgpu-ascii-renderer';

  interface ScrollState {
    lastScrollY: number;
    isScrolling: boolean;
    scrollTimeout: number | null;
    baseRotationX: number;
    baseRotationY: number;
  }

async function init() {
  const errorDiv = document.getElementById('error')!;

  if (!isWebGPUSupported()) {
    errorDiv.textContent = 'WebGPU is not supported in your browser. Please use Chrome 113+ or Firefox 113+.';
    throw new Error('WebGPU not supported');
  }

  const asciiBackground = document.querySelector('.ascii-background')!;

  const scrollState: ScrollState = {
    lastScrollY: window.scrollY,
    isScrolling: false,
    scrollTimeout: null,
    baseRotationX: 0.7,
    baseRotationY: 0.5,
  };

  try {
    const tempCanvas = document.createElement('canvas');
    const renderer = new ASCIIRenderer({
      canvas: tempCanvas,
      modelUrl: '/resources/coffee.glb',
      mode: 'ascii',
      fontSize: 20,
      asciiWidth: 120,
      asciiHeight: 80,
      asciiChars: ' .:-=+*#%@',
      gamma: 0.5,
      brightness: 0.8,
      autoRotate: false,
      autoRotateSpeed: 0.01,
      initialDistance: 5,
      bgColor: 'transparent',
      onError: (error) => {
        console.error('Renderer error:', error);
        errorDiv.textContent = `Error: ${error.message}`;
      },
    });

    await renderer.init();

    const renderedCanvas = renderer.getASCIICanvas();
    asciiBackground.appendChild(renderedCanvas);
    renderedCanvas.style.position = 'absolute';
    renderedCanvas.style.top = '50%';
    renderedCanvas.style.left = '10%';
    renderedCanvas.style.transform = 'translateY(-50%)';
    renderedCanvas.style.width = '1050px';
    renderedCanvas.style.height = '1050px';
    renderedCanvas.style.pointerEvents = 'none';

    window.addEventListener('scroll', () => {
      const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);

      const xPos = 10 + (scrollProgress * 70);
      renderedCanvas.style.left = `${xPos}%`;

      const scrollDelta = window.scrollY - scrollState.lastScrollY;
      renderer.incrementRotation(scrollDelta * 0.005, 0);

      renderer.setAutoRotate(true);
      scrollState.isScrolling = true;

      if (scrollState.scrollTimeout) {
        clearTimeout(scrollState.scrollTimeout);
      }

      scrollState.scrollTimeout = window.setTimeout(() => {
        scrollState.isScrolling = false;
        renderer.setAutoRotate(false);
        scrollState.baseRotationX = 0.7;
        scrollState.baseRotationY = 0.5 + (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 0.5;
      }, 100);

      scrollState.lastScrollY = window.scrollY;
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
      if (!scrollState.isScrolling) {
        const tiltX = (e.clientX / window.innerWidth - 0.5) * 0.3;
        const tiltY = (e.clientY / window.innerHeight - 0.5) * 0.3;
        renderer.setRotation(scrollState.baseRotationX + tiltX, scrollState.baseRotationY + tiltY);
      }
    });

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
