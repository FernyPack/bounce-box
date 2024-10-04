const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// Window Size
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000); //Black BG
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 0.5);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red Color Start
const box = new THREE.Mesh(geometry, material);
scene.add(box);

camera.position.z = 6;

// Movement
let speedX = 0.03;
let speedY = 0.01;
let bounceCount = 0;

// Function to change color randomly
function changeColor() {
    material.color.set(Math.random() * 0xffffff); // Set a random color
}

// Animation
function animate() {
    requestAnimationFrame(animate);

    // Move the box on the X-axis
    box.position.x += speedX;
    box.position.y += speedY;

    // Boundary collisions (Left and Right : Up and Down)
    if (box.position.x > 7.6 || box.position.x < -7.6) {
        speedX = -speedX; // Reverse direction (X - axis) when hitting a boundary
        changeColor(); // Change color on bounce
        bounceCount++;

        // Reduce the size of the box every bounce
        if (bounceCount <= 8) {
            box.scale.x *= 0.9; 
            box.scale.y *= 0.9;
            box.scale.z *= 0.9;
        }
    }
    if (box.position.y > 4 || box.position.y < -4) {
        speedY = -speedY; // Reverse direction (Y - axis) when hitting a boundary
        changeColor();
        bounceCount++;

        
        if (bounceCount <= 8) {
            box.scale.x *= 0.9; 
            box.scale.y *= 0.9;
            box.scale.z *= 0.9;
        }
    }

    // Stop the animation after 8 bounces
    if (bounceCount > 8) {
        box.visible = false; // Make the box invisible
    }

    // Render the scene
    renderer.render(scene, camera);
}

// Animation
animate();

// Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});