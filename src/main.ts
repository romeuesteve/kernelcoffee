import { initWebGPU } from './webgpu.js';
import { createRenderPipeline, updateUniforms } from './render-pipeline.js';
import { createComputePipeline, readComputeOutput } from './compute-pipeline.js';
import { createTextRenderer } from './text-renderer.js';
import { Camera } from './camera.js';

async function init() {
  console.log('Init function called');
  console.log('DOM ready state:', document.readyState);
  console.log('Document elements:', document.body.children.length);

  const asciiCanvas = document.getElementById('ascii-canvas') as HTMLCanvasElement;
  const webgpuCanvas = document.getElementById('webgpu-canvas') as HTMLCanvasElement;
  const errorDiv = document.getElementById('error')!;
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

  console.log('Looking for canvases...');
  console.log('asciiCanvas:', asciiCanvas);
  console.log('webgpuCanvas:', webgpuCanvas);
  console.log('errorDiv:', errorDiv);

  if (!asciiCanvas) {
    if (errorDiv) {
      errorDiv.textContent = 'ASCII canvas element not found';
    }
    console.error('ASCII canvas element not found');
    return;
  }

  if (!webgpuCanvas) {
    if (errorDiv) {
      errorDiv.textContent = 'WebGPU canvas element not found';
    }
    console.error('WebGPU canvas element not found');
    return;
  }

  if (!errorDiv) {
    console.error('Error div not found');
    return;
  }

  console.log('Canvases found, initializing...');

  // Set webgpu canvas to a visible size
  webgpuCanvas.width = 960;
  webgpuCanvas.height = 960;

  try {
    console.log('Initializing WebGPU...');
    const { device, context, format } = await initWebGPU(webgpuCanvas);
    console.log('WebGPU initialized');
    
    console.log('Creating camera...');
    const camera = new Camera(asciiCanvas);
    camera.attachCanvas(webgpuCanvas);

    const asciiPipeline = createRenderPipeline(device, 'rgba8unorm');
    const normalPipeline = createRenderPipeline(device, format);
    const computePipeline = createComputePipeline(device, asciiPipeline.textureView);
    const textRenderer = createTextRenderer(asciiCanvas);

    console.log('Pipeline created, indexCount:', asciiPipeline.indexCount);
    console.log('Texture size:', asciiPipeline.texture.width, 'x', asciiPipeline.texture.height);
    console.log('Camera position - distance:', camera.distance, 'rotX:', camera.rotationX, 'rotY:', camera.rotationY);

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

    console.log('Depth texture created:', depthTexture.width, 'x', depthTexture.height);

    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 0;

    async function render() {
      const now = performance.now();
      frameCount++;

      if (now - lastTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastTime = now;
        console.log(`FPS: ${fps}`);
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

      if (frameCount % 60 === 0) {
        console.log(`Camera: dist=${camera.distance.toFixed(2)} rotX=${camera.rotationX.toFixed(2)} rotY=${camera.rotationY.toFixed(2)}`);
        console.log(`MVP[0]=${mvp[0].toFixed(2)} MVP[5]=${mvp[5].toFixed(2)} MVP[10]=${mvp[10].toFixed(2)} MVP[14]=${mvp[14].toFixed(2)}`);
      }

      updateUniforms(device, asciiPipeline, mvp, model);
      updateUniforms(device, normalPipeline, mvp, model);

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
        renderPass.setIndexBuffer(asciiPipeline.indexBuffer, 'uint16');
        renderPass.setViewport(0, 0, 120, 80, 0, 1);
        renderPass.setScissorRect(0, 0, 120, 80);

        if (frameCount % 60 === 0) {
          console.log(`Drawing ${asciiPipeline.indexCount} indices, aspect=${aspect.toFixed(2)}`);
        }

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
        renderPass.setIndexBuffer(normalPipeline.indexBuffer, 'uint16');
        renderPass.setViewport(0, 0, 960, 960, 0, 1);
        renderPass.setScissorRect(0, 0, 960, 960);

        if (frameCount % 60 === 0) {
          console.log(`Drawing ${normalPipeline.indexCount} indices in normal mode, aspect=${aspect.toFixed(2)}`);
        }

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
