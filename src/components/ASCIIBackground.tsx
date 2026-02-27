import { useEffect, useRef, useState } from 'react';
import { ASCIIRenderer, isWebGPUSupported } from 'webgpu-ascii-renderer';

interface ScrollState {
  lastScrollY: number;
  isScrolling: boolean;
  scrollTimeout: number | null;
  baseRotationX: number;
  baseRotationY: number;
}

export function ASCIIBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<ASCIIRenderer | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!containerRef.current) return;

    if (!isWebGPUSupported()) {
      setError('WebGPU is not supported in your browser. Please use Chrome 113+ or Firefox 113+.');
      return;
    }

    const scrollState: ScrollState = {
      lastScrollY: window.scrollY,
      isScrolling: false,
      scrollTimeout: null,
      baseRotationX: 0.7,
      baseRotationY: 0.5,
    };

    const initRenderer = async () => {
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
          onError: (err) => {
            console.error('Renderer error:', err);
            setError(`Error: ${err.message}`);
          },
        });

        await renderer.init();
        rendererRef.current = renderer;

        const renderedCanvas = renderer.getASCIICanvas();
        if (containerRef.current) {
          containerRef.current.appendChild(renderedCanvas);
          renderedCanvas.style.position = 'absolute';
          renderedCanvas.style.top = '50%';
          renderedCanvas.style.left = '10%';
          renderedCanvas.style.transform = 'translateY(-50%)';
          renderedCanvas.style.width = '1050px';
          renderedCanvas.style.height = '1050px';
          renderedCanvas.style.pointerEvents = 'none';
        }

        const handleScroll = () => {
          if (!rendererRef.current) return;

          const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
          const xPos = 10 + (scrollProgress * 70);

          if (renderedCanvas) {
            renderedCanvas.style.left = `${xPos}%`;
          }

          const scrollDelta = window.scrollY - scrollState.lastScrollY;
          rendererRef.current.incrementRotation(scrollDelta * 0.005, 0);

          rendererRef.current.setAutoRotate(true);
          scrollState.isScrolling = true;

          if (scrollState.scrollTimeout) {
            clearTimeout(scrollState.scrollTimeout);
          }

          scrollState.scrollTimeout = window.setTimeout(() => {
            scrollState.isScrolling = false;
            if (rendererRef.current) {
              rendererRef.current.setAutoRotate(false);
            }
            scrollState.baseRotationX = 0.7;
            scrollState.baseRotationY = 0.5 + (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 0.5;
          }, 100);

          scrollState.lastScrollY = window.scrollY;
        };

        const handleMouseMove = (e: MouseEvent) => {
          if (!rendererRef.current || scrollState.isScrolling) return;

          const tiltX = (e.clientX / window.innerWidth - 0.5) * 0.3;
          const tiltY = (e.clientY / window.innerHeight - 0.5) * 0.3;
          rendererRef.current.setRotation(scrollState.baseRotationX + tiltX, scrollState.baseRotationY + tiltY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true } as AddEventListenerOptions);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
          window.removeEventListener('scroll', handleScroll);
          window.removeEventListener('mousemove', handleMouseMove);
          if (scrollState.scrollTimeout) {
            clearTimeout(scrollState.scrollTimeout);
          }
        };
      } catch (err) {
        console.error('Failed to initialize:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    initRenderer();
  }, []);

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <div className="text-destructive text-center p-4">{error}</div>
      </div>
    );
  }

  return (
    <>
      <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 transition-left duration-100 ease-out" />
    </>
  );
}
