document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('spaceCanvas');
    const ctx = canvas.getContext('2d');

    const timeDisplay = document.getElementById("time");
    const altitudeDisplay = document.getElementById("altitude");
    const distanceDisplay = document.getElementById("distance");

    const playBtn = document.getElementById("playBtn");
    const resetBtn = document.getElementById("resetBtn");

    let startTime;
    let running = false;
    let animationFrameId;

    // Planetary bodies
    const earth = { x: 0, y: 0, r: 60 };
    const moon = { x: 0, y: 0, r: 30 };
    let rocket, cubesat, stage, frame;

    function initialize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        earth.x = canvas.width / 3;
        earth.y = canvas.height - 150;
        moon.x = canvas.width - 200;
        moon.y = canvas.height / 2;

        rocket = { x: earth.x, y: canvas.height - 50, launched: false };
        cubesat = {
            x: earth.x + 120,
            y: earth.y,
            orbiting: false,
            orbitAngle: 0,
            orbitCount: 0,
            released: false,
            goingToMoon: false
        };

        stage = 'launch';
        frame = 0;
        startTime = Date.now();
        running = false;

        updateTelemetry();
        drawScene();
    }

    window.addEventListener('resize', initialize);

    function drawEarth() {
        ctx.beginPath();
        ctx.arc(earth.x, earth.y, earth.r, 0, Math.PI * 2);
        ctx.fillStyle = '#1e90ff';
        ctx.fill();
    }

    function drawMoon() {
        ctx.beginPath();
        ctx.arc(moon.x, moon.y, moon.r, 0, Math.PI * 2);
        ctx.fillStyle = '#ccc';
        ctx.fill();
    }

    function drawRocket() {
        ctx.fillStyle = '#fff';
        ctx.fillRect(rocket.x - 5, rocket.y - 30, 10, 30);
        ctx.beginPath();
        ctx.moveTo(rocket.x - 10, rocket.y - 30);
        ctx.lineTo(rocket.x + 10, rocket.y - 30);
        ctx.lineTo(rocket.x, rocket.y - 45);
        ctx.fillStyle = '#ff3333';
        ctx.fill();
    }

    function drawCubesat() {
        ctx.fillStyle = '#00ffcc';
        ctx.fillRect(cubesat.x - 5, cubesat.y - 5, 10, 10);
    }

    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawEarth();
        drawMoon();
        drawRocket();
        drawCubesat();
    }

    function updateTelemetry() {
        const elapsed = running ? ((Date.now() - startTime) / 1000).toFixed(1) : 0;
        timeDisplay.textContent = elapsed;

        const altitude = Math.max(0, canvas.height - rocket.y) * (1000 / canvas.height);
        altitudeDisplay.textContent = altitude.toFixed(1);

        const dx = cubesat.x - earth.x;
        const dy = cubesat.y - earth.y;
        const distance = Math.sqrt(dx * dx + dy * dy) * (1000 / canvas.height);
        distanceDisplay.textContent = distance.toFixed(1);

        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.fillText(`Stage: ${stage}`, 10, 20);
        ctx.fillText(`Orbits: ${cubesat.orbitCount}`, 10, 40);
    }

    function animate() {
        if (!running) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawEarth();
        drawMoon();

        if (stage === 'launch') {
            drawRocket();
            rocket.y -= 1;
            if (rocket.y < canvas.height / 3) stage = 'deploy';
        } 
        else if (stage === 'deploy') {
            drawRocket();
            cubesat.x = rocket.x;
            cubesat.y = rocket.y + 12;
            drawCubesat();
            rocket.y -= 1;
            frame++;
            if (frame > 50) stage = 'orbit';
        } 
        else if (stage === 'orbit') {
            drawRocket();
            cubesat.orbiting = true;
            cubesat.orbitAngle += 0.05;
            cubesat.x = earth.x + Math.cos(cubesat.orbitAngle) * 120;
            cubesat.y = earth.y + Math.sin(cubesat.orbitAngle) * 120;
            drawCubesat();

            if (cubesat.orbitAngle > Math.PI * 2) {
                cubesat.orbitAngle = 0;
                cubesat.orbitCount++;
                if (cubesat.orbitCount >= 10) stage = 'toMoon';
            }
        } 
        else if (stage === 'toMoon') {
            cubesat.goingToMoon = true;
            const dx = moon.x - cubesat.x;
            const dy = moon.y - cubesat.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 5) {
                cubesat.x += dx / 60;
                cubesat.y += dy / 60;
            }
            drawCubesat();
        }

        updateTelemetry();
        animationFrameId = requestAnimationFrame(animate);
    }

    // 🔘 Play button
    playBtn.addEventListener('click', () => {
        if (!running) {
            running = true;
            startTime = Date.now();
            animate();
        }
    });

    // 🔄 Reset button
    resetBtn.addEventListener('click', () => {
        cancelAnimationFrame(animationFrameId);
        initialize();
    });

    initialize();
});
