// background effect by Louis Hoebregts, source: 
// https://codepen.io/Mamboleoo/pen/dypZQGo

const paths = document.querySelectorAll('path');
const defs = document.querySelector('defs');
const xmlns = "http://www.w3.org/2000/svg";

// lower GSAP tick rate on touch / small devices to reduce CPU usage
const isLowPowerOrMobile = window.matchMedia('(pointer: coarse), (max-width: 820px)').matches;
gsap.ticker.fps(isLowPowerOrMobile ? 30 : 60);
gsap.ticker.lagSmoothing(0);


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

// fix mobile 100vh issue (address bar): set --vh to 1% of the actual viewport height
function setVh() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
setVh();
window.addEventListener('resize', setVh);