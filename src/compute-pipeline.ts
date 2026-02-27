import computeShader from '../shaders/ascii-compute.wgsl?raw';

const GRID_WIDTH = 120;
const GRID_HEIGHT = 80;

export interface ComputePipeline {
  pipeline: GPUComputePipeline;
  outputBuffer: GPUBuffer;
  bindGroup: GPUBindGroup;
  workgroups: [number, number, number];
}

export function createComputePipeline(
  device: GPUDevice,
  inputTexture: GPUTextureView
): ComputePipeline {
  const bufferSize = GRID_WIDTH * GRID_HEIGHT * 16;
  
  const outputBuffer = device.createBuffer({
    size: bufferSize,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
  });

  const bindGroupLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.COMPUTE,
        texture: { sampleType: 'unfilterable-float' },
      },
      {
        binding: 1,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: 'storage' },
      },
    ],
  });

  const bindGroup = device.createBindGroup({
    layout: bindGroupLayout,
    entries: [
      { binding: 0, resource: inputTexture },
      { binding: 1, resource: { buffer: outputBuffer } },
    ],
  });

  const pipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [bindGroupLayout],
  });

  const pipeline = device.createComputePipeline({
    layout: pipelineLayout,
    compute: {
      module: device.createShaderModule({ code: computeShader }),
      entryPoint: 'computeMain',
    },
  });

  const workgroupCountX = Math.ceil(GRID_WIDTH / 16);
  const workgroupCountY = Math.ceil(GRID_HEIGHT / 16);

  return {
    pipeline,
    outputBuffer,
    bindGroup,
    workgroups: [workgroupCountX, workgroupCountY, 1],
  };
}

export async function readComputeOutput(
  device: GPUDevice,
  pipeline: ComputePipeline
): Promise<Float32Array> {
  const bufferSize = GRID_WIDTH * GRID_HEIGHT * 16;
  const stagingBuffer = device.createBuffer({
    size: bufferSize,
    usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
  });

  const commandEncoder = device.createCommandEncoder();
  commandEncoder.copyBufferToBuffer(
    pipeline.outputBuffer,
    0,
    stagingBuffer,
    0,
    bufferSize
  );

  device.queue.submit([commandEncoder.finish()]);

  await stagingBuffer.mapAsync(GPUMapMode.READ);
  const data = new Float32Array(stagingBuffer.getMappedRange().slice(0));
  stagingBuffer.unmap();

  return data;
}
