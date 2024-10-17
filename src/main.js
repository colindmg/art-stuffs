// import { GUI } from "lil-gui";
import gsap from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import artpieceFragmentShader from "./shaders/artpiece/fragment.glsl";
import artpieceVertexShader from "./shaders/artpiece/vertex.glsl";
import "./style.css";
import { artPiecesTextures } from "./textures";

// GESTION DE LA SCENE THREE.JS

/**
 * Base
 */
// Debug
// const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf6faf9);

// Chargement des textures
let currentSetIndex = 0;
const images = artPiecesTextures[currentSetIndex];

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
camera.position.z = 6;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
ReadableStreamDefaultController.antialias = true;

/**
 * Geometry et Material
 */
// Geometry (utilisé par tous les planes)
const planeGeometry = new THREE.PlaneGeometry(1, 1, 32, 32);

// Material de base
const baseMaterial = new THREE.ShaderMaterial({
  // depthWrite: false,
  // wireframe: true,
  side: THREE.DoubleSide,
  transparent: true,
  vertexShader: artpieceVertexShader,
  fragmentShader: artpieceFragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uTexture: { value: null },
    uExpansion: { value: 0 },
  },
});

/**
 * Création des planes et du cube
 */
const planes = [];
const cubeGroup = new THREE.Group();

const cubeSize = 1;
// const spacingFactor = 0.075;
const spacingFactor = 0;

for (let i = 0; i < images.length; i++) {
  // Clone le material de base pour chaque plane
  const planeMaterial = baseMaterial.clone();
  planeMaterial.uniforms.uTexture.value = images[i].texture; // Associe la texture

  // Crée le mesh pour chaque plane
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);

  // Positionne les 6 planes pour former un cube
  switch (i) {
    case 0: // Front face
      plane.position.set(0, 0, cubeSize / 2 + spacingFactor);
      break;
    case 1: // Back face
      plane.position.set(0, 0, -cubeSize / 2 - spacingFactor);
      plane.rotation.y = Math.PI;
      break;
    case 2: // Top face
      plane.position.set(0, cubeSize / 2 + spacingFactor, 0);
      plane.rotation.x = -Math.PI / 2;
      break;
    case 3: // Bottom face
      plane.position.set(0, -cubeSize / 2 - spacingFactor, 0);
      plane.rotation.x = Math.PI / 2;
      break;
    case 4: // Right face
      plane.position.set(cubeSize / 2 + spacingFactor, 0, 0);
      plane.rotation.y = Math.PI / 2;
      break;
    case 5: // Left face
      plane.position.set(-cubeSize / 2 - spacingFactor, 0, 0);
      plane.rotation.y = -Math.PI / 2;
      break;
  }

  // Ajoute le plane au groupe et au tableau
  cubeGroup.add(plane);
  planes.push(plane);
}

// Ajoute le groupe à la scène
scene.add(cubeGroup);

/**
 * Post-processing
 */
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
const afterimagePass = new AfterimagePass();
afterimagePass.uniforms.damp.value = 0.94;
const outputPass = new OutputPass();

composer.addPass(renderPass);
composer.addPass(afterimagePass);
composer.addPass(outputPass);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Met à jour l'uniforme du temps pour chaque plane
  planes.forEach((plane) => {
    plane.material.uniforms.uTime.value = elapsedTime;
  });

  // Animation de rotation du cube
  cubeGroup.rotation.y = Math.sin(elapsedTime / 4) * Math.PI;
  cubeGroup.rotation.x = Math.sin(elapsedTime / 3) * Math.PI;
  cubeGroup.rotation.z = Math.sin(elapsedTime / 3.4) * Math.PI;

  // Render
  // renderer.render(scene, camera);

  // Post-processing
  composer.render();

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

// ---------------------------------------

// GESTION DE L'ANIMATION DES TEXTURES
// Fonction pour changer les textures des plans
function advanceTextures() {
  currentSetIndex = (currentSetIndex + 1) % artPiecesTextures.length;
  const newTextures = artPiecesTextures[currentSetIndex];
  for (let i = 0; i < planes.length; i++) {
    setTimeout(() => {
      planes[i].material.uniforms.uTexture.value = newTextures[i].texture;
    }, 200 + i * 50);
  }
}

// Fonction pour animer uExpansion et changer les textures
function animateAndChangeTextures() {
  const uniforms = planes.map((plane) => plane.material.uniforms.uExpansion);

  const tl = gsap.timeline();

  // Anime uExpansion de 0 à 0.5
  tl.to(uniforms, {
    value: 0.4,
    duration: 1,
    ease: "power2.inOut",
    stagger: 0.05,
    onComplete: advanceTextures,
  });

  // Anime uExpansion de 0.5 à 0
  tl.to(uniforms, {
    value: 0,
    duration: 1,
    stagger: 0.05,
    ease: "power2.inOut",
  });
}

// Démarre l'animation initiale
animateAndChangeTextures();

// Configure l'intervalle pour répéter l'animation toutes les 5 secondes
setInterval(animateAndChangeTextures, 5000);
