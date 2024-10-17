uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

#include ../includes/rotate2D.glsl

void main() 
{
  vec3 newPosition = position;

  // Twist
  float twistPerlin = texture(
    uPerlinTexture, 
    vec2(0.5, uv.y * 0.2 - uTime)
  ).r;
  float angle = newPosition.y + uTime * 0.6;
  newPosition.xz = rotate2D(newPosition.xz, angle);

  // Final position
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

  // Pass UV to fragment shader
  vUv = uv;
}