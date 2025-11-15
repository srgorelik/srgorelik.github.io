function randomAngleNumber() {
    return Math.floor(Math.random() * 360);
}

function formatAngle(num) {
    return num + 'deg';
}


window.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;

    const angle1Num = randomAngleNumber();
    const angle2Num = (angle1Num + 90) % 360; // 90° apart

    root.style.setProperty('--angle1', formatAngle(angle1Num));
    root.style.setProperty('--angle2', formatAngle(angle2Num));

});
