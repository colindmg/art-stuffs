import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import arttunnelFragmentShader from "./shaders/arttunnel/fragment.glsl";
import arttunnelVertexShader from "./shaders/arttunnel/vertex.glsl";
import "./style.css";

// GESTION DE LA SCENE THREE.JS

/**
 * Base
 */
// Debug

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf6faf9);

// Loaders
const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();

const texture = textureLoader.load("/textures/texture.webp");
texture.wrapT = THREE.RepeatWrapping;
texture.wrapS = THREE.RepeatWrapping;

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  25,
  sizes.width / sizes.height,
  0.1,
  20
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 8;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Post-processing
 */
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
const afterimagePass = new AfterimagePass();
const outputPass = new OutputPass();

composer.addPass(renderPass);
composer.addPass(afterimagePass);
composer.addPass(outputPass);

// Activate/Deactivate post-processing
let postProcessingActive = true;
const onOffButton = document.getElementById("bloom");

onOffButton.addEventListener("click", () => {
  postProcessingActive = !postProcessingActive;

  if (postProcessingActive) {
    onOffButton.innerText = "Effect ON";
    onOffButton.style.opacity = 1;
  } else {
    onOffButton.innerText = "Effect OFF";
    onOffButton.style.opacity = 0.5;
  }
});

/**
 * Image spiral
 */

// Geometry
const spiralGeometry = new THREE.PlaneGeometry(1, 1, 16, 64);
spiralGeometry.scale(1.5, 6, 1.5);

const tunnelGeometry = new THREE.CylinderGeometry(
  5,
  2.5,
  50,
  40,
  64,
  true,
  0,
  Math.PI * 2
);
tunnelGeometry.scale(0.4, 0.4, 0.4);
tunnelGeometry.rotateX(Math.PI / 2);

// Material
const tunnelMaterial = new THREE.ShaderMaterial({
  // wireframe: true,
  depthWrite: false,
  side: THREE.DoubleSide,
  transparent: true,
  vertexShader: arttunnelVertexShader,
  fragmentShader: arttunnelFragmentShader,
  uniforms: {
    uTime: new THREE.Uniform(0),
    uPerlinTexture: new THREE.Uniform(texture),
  },
});

// Mesh
const tunnel = new THREE.Mesh(tunnelGeometry, tunnelMaterial);
scene.add(tunnel);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update tunnel
  tunnel.material.uniforms.uTime.value = elapsedTime;

  // Render
  renderer.render(scene, camera);

  // Post-processing
  if (postProcessingActive) {
    composer.render();
  }

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
