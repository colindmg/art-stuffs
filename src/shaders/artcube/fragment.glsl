uniform sampler2D uTexture;
uniform float uTime;

varying vec2 vUv;

void main()
{
  // Texture
  vec4 texture = texture2D(uTexture, vUv);


  // Final color
  gl_FragColor = vec4(texture);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}