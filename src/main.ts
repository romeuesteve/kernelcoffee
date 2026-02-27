import { initWebGPU } from './webgpu.js';
import { createRenderPipeline, updateUniforms as updateRenderUniforms } from './render-pipeline.js';
import { createComputePipeline, readComputeOutput, updateUniforms as updateComputeUniforms } from './compute-pipeline.js';
import { createTextRenderer } from './text-renderer.js';
import { Camera } from './camera.js';

  async function init() {
    const asciiCanvas = document.getElementById('ascii-canvas') as HTMLCanvasElement;
    const webgpuCanvas = document.getElementById('webgpu-canvas') as HTMLCanvasElement;
    const errorDiv = document.getElementById('error')!;
    const fpsDiv = document.getElementById('fps')!;
    const toggleButton = document.getElementById('mode-toggle') as HTMLButtonElement;
    const toggleLabels = document.querySelectorAll('.toggle-label');

  let currentMode: 'ascii' | 'normal' = 'ascii';

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
  });

  updateToggleUI();

  if (!asciiCanvas) {
    if (errorDiv) {
      errorDiv.textContent = 'ASCII canvas element not found';
    }
    return;
  }

  if (!webgpuCanvas) {
    if (errorDiv) {
      errorDiv.textContent = 'WebGPU canvas element not found';
    }
    return;
  }

  if (!errorDiv) {
    return;
  }

  // Set webgpu canvas to a visible size
  webgpuCanvas.width = 960;
  webgpuCanvas.height = 960;

  try {
    const { device, context, format } = await initWebGPU(webgpuCanvas);
    
    const camera = new Camera(asciiCanvas);
    camera.attachCanvas(webgpuCanvas);

    const asciiPipeline = await createRenderPipeline(device, 'rgba8unorm');
    const normalPipeline = await createRenderPipeline(device, format);
    const computePipeline = createComputePipeline(device, asciiPipeline.textureView);
    
    const GAMMA = 0.7;
    updateComputeUniforms(device, computePipeline, 120, 80, GAMMA);
    
    const textRenderer = createTextRenderer(asciiCanvas);

    const depthTexture = device.createTexture({
      size: [120, 80, 1],
      format: 'depth24plus',
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });

    const normalDepthTexture = device.createTexture({
      size: [960, 960, 1],
      format: 'depth24plus',
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });

    let frameCount = 0;
    let lastTime = performance.now();

    async function render() {
      const now = performance.now();
      frameCount++;

      if (now - lastTime >= 1000) {
        fpsDiv.textContent = `FPS: ${frameCount}`;
        frameCount = 0;
        lastTime = now;
      }

      camera.update();

      // Account for non-square character cells (8x12 pixels)
      const charAspect = (8 / 12); // width/height of each character
      const gridAspect = (120 / 80); // width/height of the grid
      const aspect = gridAspect * charAspect;

      const projection = camera.getProjectionMatrix(aspect);
      const view = camera.getViewMatrix();
      const model = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

      const mvp = multiplyMatrices(projection, view);

      updateRenderUniforms(device, asciiPipeline, mvp, model);
      updateRenderUniforms(device, normalPipeline, mvp, model);

      const commandEncoder = device.createCommandEncoder();

      if (currentMode === 'ascii') {
        const renderPass = commandEncoder.beginRenderPass({
          colorAttachments: [{
            view: asciiPipeline.textureView,
            clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1 },
            loadOp: 'clear',
            storeOp: 'store',
          }],
          depthStencilAttachment: {
            view: depthTexture.createView(),
            depthClearValue: 1.0,
            depthLoadOp: 'clear',
            depthStoreOp: 'store',
          },
        });

        renderPass.setPipeline(asciiPipeline.pipeline);
        renderPass.setBindGroup(0, asciiPipeline.bindGroup);
        renderPass.setVertexBuffer(0, asciiPipeline.positionBuffer);
        renderPass.setVertexBuffer(1, asciiPipeline.normalBuffer);
        renderPass.setVertexBuffer(2, asciiPipeline.uvBuffer);
        renderPass.setIndexBuffer(asciiPipeline.indexBuffer, asciiPipeline.indexFormat);
        renderPass.setViewport(0, 0, 120, 80, 0, 1);
        renderPass.setScissorRect(0, 0, 120, 80);

        renderPass.drawIndexed(asciiPipeline.indexCount);
        renderPass.end();

        device.queue.submit([commandEncoder.finish()]);

        await device.queue.onSubmittedWorkDone();

        const computeEncoder = device.createCommandEncoder();
        const computePass = computeEncoder.beginComputePass();
        computePass.setPipeline(computePipeline.pipeline);
        computePass.setBindGroup(0, computePipeline.bindGroup);
        computePass.dispatchWorkgroups(...computePipeline.workgroups);
        computePass.end();
        device.queue.submit([computeEncoder.finish()]);

        const asciiData = await readComputeOutput(device, computePipeline);
        textRenderer.render(asciiData);
      } else {
        const renderPass = commandEncoder.beginRenderPass({
          colorAttachments: [{
            view: context.getCurrentTexture().createView(),
            clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1 },
            loadOp: 'clear',
            storeOp: 'store',
          }],
          depthStencilAttachment: {
            view: normalDepthTexture.createView(),
            depthClearValue: 1.0,
            depthLoadOp: 'clear',
            depthStoreOp: 'store',
          },
        });

        renderPass.setPipeline(normalPipeline.pipeline);
        renderPass.setBindGroup(0, normalPipeline.bindGroup);
        renderPass.setVertexBuffer(0, normalPipeline.positionBuffer);
        renderPass.setVertexBuffer(1, normalPipeline.normalBuffer);
        renderPass.setVertexBuffer(2, normalPipeline.uvBuffer);
        renderPass.setIndexBuffer(normalPipeline.indexBuffer, normalPipeline.indexFormat);
        renderPass.setViewport(0, 0, 960, 960, 0, 1);
        renderPass.setScissorRect(0, 0, 960, 960);

        renderPass.drawIndexed(normalPipeline.indexCount);
        renderPass.end();

        device.queue.submit([commandEncoder.finish()]);
      }

      requestAnimationFrame(render);
    }

    render();

  } catch (error) {
    console.error('Failed to initialize:', error);
    errorDiv.textContent = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

function multiplyMatrices(a: Float32Array, b: Float32Array): Float32Array {
  const result = new Float32Array(16);
  
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      result[i * 4 + j] = 
        a[0 * 4 + j] * b[i * 4 + 0] +
        a[1 * 4 + j] * b[i * 4 + 1] +
        a[2 * 4 + j] * b[i * 4 + 2] +
        a[3 * 4 + j] * b[i * 4 + 3];
    }
  }
  
  return result;
}

function runWhenReady() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

runWhenReady();
