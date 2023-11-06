import gsap from 'gsap'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

let { cos, sin } = Math
let center = {
  x: canvas.width / 2,
  y: canvas.height / 2
}
let angle = 0;
// Event Listeners
addEventListener('mousemove', (event) => {
  gsap.to(mouse, {
    x: event.clientX - canvas.width / 2, 
    y: event.clientY - canvas.height / 2
  })

  angle =  Math.atan2(mouse.y, mouse.x);
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
  init()
})

// Objects
class Particle {
  constructor(x, y, radius, color, distanceFromCenter) {
    this.x = x 
    this.y = y 
    this.radius = radius
    this.color = color
    this.distanceFromCenter = distanceFromCenter
  }

  draw() {
    c.beginPath();
    c.globalAlpha = this.alpha;
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update(timer) {
    this.draw();
    this.x = center.x + sin(timer * this.distanceFromCenter) * 2.5 + this.distanceFromCenter * cos(angle)
    this.y = center.y + cos(timer * this.distanceFromCenter) * 2.5 + this.distanceFromCenter * sin(angle)
  }

}

// Implementation
let particles;

function init() {
  particles = [];
  let particlesCount = 320
  let initialR = 20
  let hueIncrement = 360 / particlesCount;
  for (let i = 0; i < particlesCount; i++) {
    const x = canvas.width / 2 + i * cos(Math.PI);
    const y = (canvas.height / 2) + i * sin(-Math.PI);
    const color = `hsl(${hueIncrement * i}, 80%, 50%)`
    const radius = initialR * Math.random() + 0.05 
    particles.push(new Particle(x, y, radius, color, i))
  }
}
// Animation Loop
let timer = 0.01
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'rgba(0, 0, 0, 0.025)'
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update(timer)
 })
 timer += 0.001
}

init()
animate()
