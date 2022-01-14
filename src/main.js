const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
window.ctx = ctx;
console.log(ctx);
let h = 0;
let particleArr = [];
window.particleArr = particleArr;
class Particle {
    constructor(x, y, size) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.size = size || Math.random() * 3 + 1.5;
        console.log(window.angle);
        this.velocity = window.angle ? Math.cos(window.angle) : Math.random() * 3.5;
    }
    update() {
        this.x += this.getVelocityX();
        this.y += this.getVelocityY();
        if (this.y >= canvas.height) {
            this.y = 0;

            this.x = this.getVelocityY() * -1;
        }
        if (this.x >= canvas.width) {
            this.y = this.getVelocityY() * -1;

            this.x = 0;
        }
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = `hsl(${h},100%,50%)`;
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
const init = () => {
    for (let i = 0; i < 1000; ++i) particleArr.push(new Particle());
};
init();
const animate = () => {
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    h += 1.1;
    particleArr.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
};
animate();

addEventListener("mousemove", (e) => {
    window.angle = Math.atan2(e.clientY - canvas.height / 2, e.clientX - canvas.width / 2);
    console.log(angle);
});
