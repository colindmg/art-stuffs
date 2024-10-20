import gsap from "gsap";
import * as THREE from "three";

const loadingBarElement = document.querySelector(".loading-bar");
const loadingOverlay = document.querySelector(".loading-overlay");

const loadingManager = new THREE.LoadingManager(
  // Loaded
  () => {
    console.log("loaded");

    gsap.delayedCall(0.5, () => {
      gsap.to(loadingOverlay, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          loadingOverlay.style.display = "none";
        },
      });
    });
  },
  // Progress
  (item, loaded, total) => {
    const progressRatio = loaded / total;
    console.log(progressRatio);
    loadingBarElement.style.transform = `scaleX(${progressRatio})`;
  }
);

const textureLoader = new THREE.TextureLoader(loadingManager);

const artCubeTextures = [
  [
    {
      texture: textureLoader.load("/textures/test1.webp"),
    },
    {
      texture: textureLoader.load("/textures/test2.webp"),
    },
    {
      texture: textureLoader.load("/textures/test3.webp"),
    },
    {
      texture: textureLoader.load("/textures/test4.webp"),
    },
    {
      texture: textureLoader.load("/textures/test5.webp"),
    },
    {
      texture: textureLoader.load("/textures/test6.webp"),
    },
  ],
  [
    {
      texture: textureLoader.load("/textures/test7.webp"),
    },
    {
      texture: textureLoader.load("/textures/test8.webp"),
    },
    {
      texture: textureLoader.load("/textures/test9.webp"),
    },
    {
      texture: textureLoader.load("/textures/test10.webp"),
    },
    {
      texture: textureLoader.load("/textures/test11.webp"),
    },
    {
      texture: textureLoader.load("/textures/test12.webp"),
    },
  ],
  [
    {
      texture: textureLoader.load("/textures/test13.webp"),
    },
    {
      texture: textureLoader.load("/textures/test14.webp"),
    },
    {
      texture: textureLoader.load("/textures/test15.webp"),
    },
    {
      texture: textureLoader.load("/textures/test16.webp"),
    },
    {
      texture: textureLoader.load("/textures/test17.webp"),
    },
    {
      texture: textureLoader.load("/textures/test18.webp"),
    },
  ],
  [
    {
      texture: textureLoader.load("/textures/test19.webp"),
    },
    {
      texture: textureLoader.load("/textures/test20.webp"),
    },
    {
      texture: textureLoader.load("/textures/test21.webp"),
    },
    {
      texture: textureLoader.load("/textures/test22.webp"),
    },
    {
      texture: textureLoader.load("/textures/test23.webp"),
    },
    {
      texture: textureLoader.load("/textures/test24.webp"),
    },
  ],
  [
    {
      texture: textureLoader.load("/textures/test25.webp"),
    },
    {
      texture: textureLoader.load("/textures/test26.webp"),
    },
    {
      texture: textureLoader.load("/textures/test27.webp"),
    },
    {
      texture: textureLoader.load("/textures/test28.webp"),
    },
    {
      texture: textureLoader.load("/textures/test29.webp"),
    },
    {
      texture: textureLoader.load("/textures/test30.webp"),
    },
  ],
];

artCubeTextures.forEach((list) => {
  list.forEach((image) => {
    image.texture.encoding = THREE.sRGBEncoding;
  });
});

export { artCubeTextures };
