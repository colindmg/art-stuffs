import gsap from "gsap";

const linksContainer = document.querySelector(".links");
const links = linksContainer.querySelectorAll("a");
const title = document.querySelector(".title");

gsap.from(title, {
  filter: "blur(10px)",
  opacity: 0,
  duration: 1,
});

links.forEach((link, index) => {
  gsap.from(link, {
    y: -32 * index,
    filter: "blur(10px)",
    opacity: 0,
    duration: 1,
    delay: 0.3 + index * 0.05,
    ease: "power1.inOut",
  });
});
