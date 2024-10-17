import * as THREE from "three";

// Textures loading
const textureLoader = new THREE.TextureLoader();

const osjdhdhhdvdvdv = textureLoader.load("textures/osjdhdhhdvdvdv.webp");
osjdhdhhdvdvdv.wrapS = THREE.RepeatWrapping;
osjdhdhhdvdvdv.wrapT = THREE.RepeatWrapping;

const fringz = textureLoader.load("textures/7Fringz.webp");
fringz.wrapS = THREE.RepeatWrapping;
fringz.wrapT = THREE.RepeatWrapping;

const iskream = textureLoader.load("textures/iskream5.webp");
iskream.wrapS = THREE.RepeatWrapping;
iskream.wrapT = THREE.RepeatWrapping;

const senssylee = textureLoader.load("textures/senssylee.webp");
senssylee.wrapS = THREE.RepeatWrapping;
senssylee.wrapT = THREE.RepeatWrapping;

const rokleam = textureLoader.load("textures/rokleam.webp");
rokleam.wrapS = THREE.RepeatWrapping;
rokleam.wrapT = THREE.RepeatWrapping;

const idol = textureLoader.load("textures/idol2.webp");
idol.wrapS = THREE.RepeatWrapping;
idol.wrapT = THREE.RepeatWrapping;

const saleGosse = textureLoader.load("textures/S4leGosse.webp");
saleGosse.wrapS = THREE.RepeatWrapping;
saleGosse.wrapT = THREE.RepeatWrapping;

const jeyytm = textureLoader.load("textures/jeyytm.webp");
jeyytm.wrapS = THREE.RepeatWrapping;
jeyytm.wrapT = THREE.RepeatWrapping;

const teocomyn = textureLoader.load("textures/teocomyn.webp");
teocomyn.wrapS = THREE.RepeatWrapping;
teocomyn.wrapT = THREE.RepeatWrapping;

const baastart = textureLoader.load("textures/baastart_.webp");
baastart.wrapS = THREE.RepeatWrapping;
baastart.wrapT = THREE.RepeatWrapping;

// Artists list
const artistList = [
  {
    name: "omg???",
    twitterAccount: "@osjdhdhhdvdvdv",
    texture: osjdhdhhdvdvdv,
  },
  {
    name: "Fringz",
    twitterAccount: "@7Fringz",
    texture: fringz,
  },
  {
    name: "ISKREAM",
    twitterAccount: "@iskream5",
    texture: iskream,
  },
  {
    name: "Senssy Lee",
    twitterAccount: "@senssylee",
    texture: senssylee,
  },
  {
    name: "LEAM!",
    twitterAccount: "@rokleam",
    texture: rokleam,
  },
  {
    name: "idol",
    twitterAccount: "@idol2__",
    texture: idol,
  },
  {
    name: "Sale Gosse",
    twitterAccount: "@S4leGosse",
    texture: saleGosse,
  },
  {
    name: "jey",
    twitterAccount: "@JeyyTM",
    texture: jeyytm,
  },
  {
    name: "T4C2",
    twitterAccount: "@teocomyn",
    texture: teocomyn,
  },
  {
    name: "BAASTART",
    twitterAccount: "@baastart_",
    texture: baastart,
  },
];

export default artistList;
