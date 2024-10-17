uniform float uTime;
uniform sampler2D uTexture;
uniform float uExpansion;

varying vec2 vUv;

#include ../includes/rotate2D.glsl

void main() 
{

  vec3 newPosition = position;

  // Déplacement dans la direction des normals
  float distanceToCenter = 1.0 - distance(vec2(0.5), uv);
  distanceToCenter = smoothstep(0.0, 0.8, distanceToCenter);
  newPosition += normal * uExpansion * distanceToCenter;

  // Calcul final de la position
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);

  // Passe les UV au fragment shader
  vUv = uv;
}