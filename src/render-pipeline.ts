import { createCubeMesh, createTorusMesh } from './mesh.js';
import renderShader from '../shaders/render.wgsl?raw';

const GRID_WIDTH = 120;
const GRID_HEIGHT = 80;

export interface RenderPipeline {
  pipeline: GPURenderPipeline;
  positionBuffer: GPUBuffer;
  normalBuffer: GPUBuffer;
  uvBuffer: GPUBuffer;
  indexBuffer: GPUBuffer;
  uniformBuffer: GPUBuffer;
  bindGroup: GPUBindGroup;
  indexCount: number;
  texture: GPUTexture;
  textureView: GPUTextureView;
}

export function createRenderPipeline(device: GPUDevice): RenderPipeline {
  const mesh = createTorusMesh(1.2, 0.4, 48, 24);

  const positionBuffer = device.createBuffer({
    size: mesh.positions.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });

  const normalBuffer = device.createBuffer({
    size: mesh.normals.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });

  const uvBuffer = device.createBuffer({
    size: mesh.uvs.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });

  device.queue.writeBuffer(positionBuffer, 0, mesh.positions.buffer);
  device.queue.writeBuffer(normalBuffer, 0, mesh.normals.buffer);
  device.queue.writeBuffer(uvBuffer, 0, mesh.uvs.buffer);

  const indexBuffer = device.createBuffer({
    size: mesh.indices.byteLength,
    usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
  });

  device.queue.writeBuffer(indexBuffer, 0, mesh.indices.buffer);

  const uniformBufferSize = 128 + 64;
  const uniformBuffer = device.createBuffer({
    size: uniformBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  const texture = device.createTexture({
    size: [GRID_WIDTH, GRID_HEIGHT],
    format: 'rgba8unorm',
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING | GPUBufferUsage.COPY_DST,
  });

  const textureView = texture.createView();

  const bindGroupLayout = device.createBindGroupLayout({
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
      buffer: { type: 'uniform' },
    }],
  });

  const bindGroup = device.createBindGroup({
    layout: bindGroupLayout,
    entries: [{
      binding: 0,
      resource: { buffer: uniformBuffer },
    }],
  });

  const pipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [bindGroupLayout],
  });

  const pipeline = device.createRenderPipeline({
    layout: pipelineLayout,
    vertex: {
      module: device.createShaderModule({ code: renderShader }),
      entryPoint: 'vertexMain',
      buffers: [{
        arrayStride: 12,
        attributes: [{ shaderLocation: 0, offset: 0, format: 'float32x3' }],
      }, {
        arrayStride: 12,
        attributes: [{ shaderLocation: 1, offset: 0, format: 'float32x3' }],
      }, {
        arrayStride: 8,
        attributes: [{ shaderLocation: 2, offset: 0, format: 'float32x2' }],
      }],
    },
    fragment: {
      module: device.createShaderModule({ code: renderShader }),
      entryPoint: 'fragmentMain',
      targets: [{
        format: 'rgba8unorm',
      }],
    },
    primitive: {
      topology: 'triangle-list',
      cullMode: 'back',
    },
    depthStencil: {
      format: 'depth24plus',
      depthWriteEnabled: true,
      depthCompare: 'less',
    },
  });

  return {
    pipeline,
    positionBuffer,
    normalBuffer,
    uvBuffer,
    indexBuffer,
    uniformBuffer,
    bindGroup,
    indexCount: mesh.indices.length,
    texture,
    textureView,
  };
}

export function updateUniforms(device: GPUDevice, pipeline: RenderPipeline, mvp: Float32Array, model: Float32Array) {
  device.queue.writeBuffer(pipeline.uniformBuffer, 0, mvp.buffer);
  device.queue.writeBuffer(pipeline.uniformBuffer, 64, model.buffer);
}
