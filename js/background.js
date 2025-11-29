// adapted from CodePen by Louis Hoebregts: 
// https://codepen.io/Mamboleoo/pen/dypZQGo

const paths = document.querySelectorAll('path');
const defs = document.querySelector('defs');
const xmlns = "http://www.w3.org/2000/svg";

// lower GSAP tick rate on touch / small devices to reduce CPU usage
const isLowPowerOrMobile = window.matchMedia('(pointer: coarse), (max-width: 820px)').matches;
gsap.ticker.fps(isLowPowerOrMobile ? 20 : 100);
gsap.ticker.lagSmoothing(0);

paths.forEach((p, i) => {
    const clone = p.cloneNode();
    clone.setAttribute('stroke-dasharray', '');
    const mask = document.createElementNS(xmlns, 'mask');
    mask.setAttribute('id', `id-${i}`);
    mask.appendChild(clone);
    defs.appendChild(mask);
    p.setAttribute('mask', `url(#id-${i})`);

    // compute length once
    const L = clone.getTotalLength();

    // set up initial dash state
    gsap.set(clone, {
        strokeDasharray: L,
        strokeDashoffset: L
    });

    // shorter, smoother settings for mobile
    const dur = isLowPowerOrMobile ? 8 : 10;
    const delayStep = isLowPowerOrMobile ? 0.05 : 0.1;

    gsap.to(clone, {
        duration: dur,
        delay: i * delayStep,
        repeat: -1,
        strokeDashoffset: L * 3,
        ease: 'none'
    });
    gsap.to(p, {
        duration: dur,
        repeat: -1,
        strokeDashoffset: L * 0.4,
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