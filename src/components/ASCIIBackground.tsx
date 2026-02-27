import { useEffect, useRef, useState } from 'react';
import { ASCIIRenderer, isWebGPUSupported } from 'webgpu-ascii-renderer';

interface ScrollState {
  lastScrollY: number;
  isScrolling: boolean;
  scrollTimeout: number | null;
  baseRotationX: number;
  baseRotationY: number;
}

type AnimationPhase = 'blank' | 'lighting-up' | 'moving-left' | 'complete';

export function ASCIIBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<ASCIIRenderer | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [error, setError] = useState<string>('');
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('blank');
  const animationPhaseRef = useRef<AnimationPhase>('blank');
  const animationTimeoutRef = useRef<number | null>(null);

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
          fontSize: 12,
          asciiWidth: 120,
          asciiHeight: 80,
          asciiPattern: ' [ᵏᵉʳⁿᵉˡᶜᵒᶠᶠᵉᵉ][KERNELCOFFEE][KERNELCOFFEE] [ᵏᵉʳⁿᵉˡᶜᵒᶠᶠᵉᵉ][KernelCoffee]',//' cofe .cofCCOFE', ' ░▒▓█'
          gamma: 0.5,
          brightness: 1.2,
          autoRotate: false,
          autoRotateSpeed: 0.01,
            initialDistance: 5,
          bgColor: 'transparent',
          onError: (err: Error) => {
            console.error('Renderer error:', err);
            setError(`Error: ${err.message}`);
          },
        });

        await renderer.init();
        rendererRef.current = renderer;

        const renderedCanvas = renderer.getASCIICanvas();
        canvasRef.current = renderedCanvas;
        
        if (containerRef.current) {
          containerRef.current.appendChild(renderedCanvas);
          renderedCanvas.style.position = 'absolute';
          renderedCanvas.style.top = '50%';
          renderedCanvas.style.left = '50%';
          renderedCanvas.style.transform = 'translate(-50%, -50%)';
          renderedCanvas.style.width = '850px';
          renderedCanvas.style.height = '850px';
          renderedCanvas.style.pointerEvents = 'none';
          renderedCanvas.style.opacity = '0';
          renderedCanvas.style.transition = 'left 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 2s ease-in-out';
        }

        const startAnimation = async () => {
          await new Promise(resolve => setTimeout(resolve, 500));
          
          animationPhaseRef.current = 'lighting-up';
          setAnimationPhase('lighting-up');
          
          if (canvasRef.current) {
            canvasRef.current.style.opacity = '1';
          }
          
          const lightUpDuration = 2000;
          const startTime = Date.now();
          
          const lightUpInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / lightUpDuration, 1);
            
            if (progress >= 1) {
              clearInterval(lightUpInterval);
              
              setTimeout(() => {
                animationPhaseRef.current = 'moving-left';
                setAnimationPhase('moving-left');
                
                if (canvasRef.current) {
                  canvasRef.current.style.transition = 'none';
                  canvasRef.current.style.transform = 'translateY(-50%)';
                  canvasRef.current.style.left = 'calc(50% - 425px)';
                  
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      if (canvasRef.current) {
                        canvasRef.current.style.transition = 'left 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 2s ease-in-out';
                        canvasRef.current.style.left = '10%';
                      }
                      animationPhaseRef.current = 'complete';
                      setAnimationPhase('complete');
                    });
                  });
                }
              }, 300);
            }
          }, 16);
        };

        startAnimation();

        const handleScroll = () => {
          if (!rendererRef.current) return;

          if (animationPhaseRef.current !== 'complete') return;

          const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
          const xPos = 10 + (scrollProgress * 70);

          if (canvasRef.current) {
            canvasRef.current.style.left = `${xPos}%`;
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
          if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
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
