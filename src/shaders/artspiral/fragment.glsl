uniform sampler2D uPerlinTexture;
uniform float uTime;

varying vec2 vUv;

void main()
{
  // Scale and animate
  vec2 smokeUv = vUv;
  // smokeUv.x *= 0.5;
  smokeUv.y *= 0.9;
  smokeUv.y -= uTime * 0.05;

  // Smoke
  vec4 smoke = texture2D(uPerlinTexture, smokeUv);

  // Remap
  // smoke = smoothstep(0.4, 1.0, smoke);

  // Edges
  // smoke = 1.0;
  // smoke *= smoothstep(0.0, 0.1, vUv.x);
  // smoke *= smoothstep(1.0, 0.9, vUv.x);
  // smoke *= smoothstep(0.0, 0.1, vUv.y);
  // smoke *= smoothstep(1.0, 0.4, vUv.y);

  // Final color
  gl_FragColor = vec4(smoke);
  // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}