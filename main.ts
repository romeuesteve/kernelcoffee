import { ASCIIRenderer, isWebGPUSupported } from 'webgpu-ascii-renderer';

interface ScrollState {
  lastScrollY: number;
  isScrolling: boolean;
  scrollTimeout: number | null;
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
  };

  try {
    const tempCanvas = document.createElement('canvas');
    const renderer = new ASCIIRenderer({
      canvas: tempCanvas,
      modelUrl: '/resources/apfel.glb',
      mode: 'ascii',
      fontSize: 14,
      asciiWidth: 100,
      asciiHeight: 80,
      autoRotate: false,
      autoRotateSpeed: 0.01,
      initialDistance: 8,
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
    renderedCanvas.style.width = '500px';
    renderedCanvas.style.height = '500px';
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
      }, 100);
      
      scrollState.lastScrollY = window.scrollY;
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
      if (!scrollState.isScrolling) {
        const tiltX = (e.clientX / window.innerWidth - 0.5) * 0.3;
        const tiltY = (e.clientY / window.innerHeight - 0.5) * 0.3;
        renderer.setRotation(tiltY, tiltX);
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
