// background effect by Louis Hoebregts, source: 
// https://codepen.io/Mamboleoo/pen/dypZQGo

const paths = document.querySelectorAll('path');
const defs = document.querySelector('defs');
const xmlns = "http://www.w3.org/2000/svg";

paths.forEach((p, i) => {
    const clone = p.cloneNode();
    clone.setAttribute('stroke-dasharray', '');
    const mask = document.createElementNS(xmlns, 'mask');
    mask.setAttribute('id', `id-${i}`);
    mask.appendChild(clone);
    defs.appendChild(mask);
    p.setAttribute('mask', `url(#id-${i})`);
    gsap.set(clone, {
        strokeDasharray: () => clone.getTotalLength(),
        strokeDashoffset: () => clone.getTotalLength()
    });
    gsap.to(clone, {
        duration: 10,
        delay: i * 0.1,
        repeat: -1,
        strokeDashoffset: clone.getTotalLength() * 3,
        ease: 'power1.inOut'
    });
    gsap.to(p, {
        duration: 10,
        repeat: -1,
        strokeDashoffset: clone.getTotalLength() * 0.4,
        ease: 'none'
    });
});
document.querySelector('svg').style.opacity = 1;