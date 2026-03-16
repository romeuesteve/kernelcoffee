import { useEffect, useRef, useState } from 'react';
import { ASCIIRenderer, isWebGPUSupported } from 'webgpu-ascii-renderer';

type AnimationPhase = 'blank' | 'moving-left' | 'complete';

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
        rendererRef.current.setLightIntensity(1.0);
        rendererRef.current.setAutoRotate(false);

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
          renderedCanvas.style.opacity = '1';
          renderedCanvas.style.transition = 'left 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }

        const startAnimation = async () => {
          animationPhaseRef.current = 'moving-left';
          setAnimationPhase('moving-left');

          if (canvasRef.current) {
            canvasRef.current.style.transition = 'none';
            canvasRef.current.style.transform = 'translateY(-50%)';
            canvasRef.current.style.left = 'calc(50% - 425px)';

            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                if (canvasRef.current) {
                  canvasRef.current.style.transition = 'left 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                  canvasRef.current.style.left = '10%';
                }
                animationPhaseRef.current = 'complete';
                setAnimationPhase('complete');
              });
            });
          }
        };

        startAnimation();

        const handleMouseMove = (e: MouseEvent) => {
          if (!rendererRef.current) return;

          const baseRotationX = 0.7;
          const baseRotationY = 0.5;
          const tiltX = (e.clientY / window.innerHeight - 0.5) * 0.4;
          const tiltY = (e.clientX / window.innerWidth - 0.5) * (-2.0);
          rendererRef.current.setRotation(baseRotationX + tiltX, baseRotationY + tiltY);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
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
      <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 transition-left duration-100 ease-out" />
    </>
  );
}
