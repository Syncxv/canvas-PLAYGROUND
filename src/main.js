const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
window.ctx = ctx;
console.log(ctx);
const SIZE = 4;
let h = 0;
let particleArr = [];
window.particleArr = particleArr;
class Particle {
    constructor(size, hehe) {
        this.x = mouse.x + Math.random() * 30;
        this.y = mouse.y + Math.random() * 30;
        this.size = size || Math.random() * 3 + 1.5;
        this.opaicty = 0.5;
        this.speedX = Math.random() * 10;
        this.speedY = Math.random() * 1 * hehe || 1;
        // this.velocity = window.angle ? Math.cos(window.angle) : Math.random() * 3.5;
    }
    update(x, y) {
        this.opaicty -= 0.009;
        this.size -= 0.01;
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = `hsla(${h},100%,50%, ${this.opaicty})`;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
    getVelocityX() {
        return window.angle ? Math.cos(window.angle) : Math.random() * 3.5;
    }
    getVelocityY() {
        return window.angle ? Math.sin(window.angle) : Math.random() * 3.5;
    }
}
const mouse = {};
addEventListener("mousemove", (e) => {
    window.angle = Math.atan2(e.clientY - canvas.height / 2, e.clientX - canvas.width / 2);
    mouse.x = e.x;
    mouse.y = e.y;
    if (e.buttons !== 0) console.log(e);
});
addEventListener("click", () => {
    [...Array(50)].forEach((s) => particleArr.push(new Particle(SIZE, 5)));
});
let n = 0;
const animate = () => {
    // ctx.globalAlpha = 0.05;
    n++;
    ctx.fillStyle = "rgb(0,0,0, 0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    h += 0.9;
    particleArr.forEach((particle, i) => {
        particle.update();
        particle.draw();
        if (particle.opaicty <= 0 || particle.size <= 0) particleArr.splice(i, 1);
    });
    console.log(particleArr.length);

    if (n % 2) particleArr.push(new Particle(SIZE));
    requestAnimationFrame(animate);
};
animate();
