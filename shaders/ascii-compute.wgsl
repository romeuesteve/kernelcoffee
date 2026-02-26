struct ComputeInput {
  @builtin(global_invocation_id) global_id: vec3<u32>,
};

@group(0) @binding(0) var inputTex: texture_2d<f32>;
@group(0) @binding(1) var<storage, read_write> outputBuf: array<vec4<f32>>;

const GRID_WIDTH: u32 = 120u;
const GRID_HEIGHT: u32 = 80u;

fn brightness_to_char(brightness: f32) -> f32 {
  if (brightness < 0.1) { return 0.0; }  // '@'
  if (brightness < 0.2) { return 1.0; }  // '%'
  if (brightness < 0.3) { return 2.0; }  // '#'
  if (brightness < 0.4) { return 3.0; }  // '*'
  if (brightness < 0.5) { return 4.0; }  // '+'
  if (brightness < 0.6) { return 5.0; }  // '='
  if (brightness < 0.7) { return 6.0; }  // '-'
  if (brightness < 0.8) { return 7.0; }  // ':'
  if (brightness < 0.9) { return 8.0; }  // '.'
  return 9.0;  // ' '
}

@compute
@workgroup_size(16, 16, 1)
fn computeMain(input: ComputeInput) {
  let x = input.global_id.x;
  let y = input.global_id.y;
  
  if (x >= GRID_WIDTH || y >= GRID_HEIGHT) {
    return;
  }
  
  let tex_dims = textureDimensions(inputTex);
  let cell_width = f32(tex_dims.x) / f32(GRID_WIDTH);
  let cell_height = f32(tex_dims.y) / f32(GRID_HEIGHT);
  
  var color_sum = vec3<f32>(0.0);
  var brightness_sum = 0.0;
  let samples = u32(cell_width * cell_height);
  
  for (var dy = 0u; dy < u32(cell_height); dy++) {
    for (var dx = 0u; dx < u32(cell_width); dx++) {
      let px = u32(f32(x) * cell_width + f32(dx));
      let py = u32(f32(y) * cell_height + f32(dy));
      let color = textureLoad(inputTex, vec2<i32>(i32(px), i32(py)), 0);
      color_sum += color.rgb;
      brightness_sum += dot(color.rgb, vec3<f32>(0.299, 0.587, 0.114));
    }
  }
  
  let avg_color = color_sum / f32(samples);
  let avg_brightness = brightness_sum / f32(samples);
  
  let char_index = brightness_to_char(avg_brightness);
  let index = y * GRID_WIDTH + x;
  
  outputBuf[index] = vec4<f32>(char_index, avg_color.r, avg_color.g, avg_color.b);
}
