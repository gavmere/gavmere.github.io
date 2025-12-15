document.addEventListener('DOMContentLoaded', function() {
  const roleElement = document.getElementById('role-text');
  const roleContainer = document.getElementById('role-container');
  const roles = ['Engineer', 'Analyst', 'Scientist', 'Driven Problem Solver', 'Enthusiast', 'Nerd'];
  let currentIndex = 0;

  roleContainer.style.position = 'relative';
  roleContainer.style.height = roleElement.offsetHeight + 'px';
  roleContainer.style.overflow = 'hidden';
  roleContainer.style.display = 'inline-block';
  roleContainer.style.verticalAlign = 'bottom';

  roleElement.style.display = 'inline-block';
  roleElement.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
  roleElement.style.willChange = 'transform, opacity';

  function verticalSpinTransition(nextIndex) {
    roleElement.style.transform = 'translateY(-100%)';
    roleElement.style.opacity = '0';

    roleElement.addEventListener('transitionend', function handler() {
      roleElement.removeEventListener('transitionend', handler);

      roleElement.textContent = roles[nextIndex];
      roleElement.style.transition = 'none';
      roleElement.style.transform = 'translateY(100%)';
      roleElement.style.opacity = '0';

      roleElement.offsetHeight; 

      roleElement.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
      roleElement.style.transform = 'translateY(0)';
      roleElement.style.opacity = '1';

    }, { once: true });
  }

  roleElement.style.transform = 'translateY(0)';
  roleElement.style.opacity = '1';

  
  let roleRotationInterval = setInterval(() => {
    const nextIndex = (currentIndex + 1) % roles.length;
    verticalSpinTransition(nextIndex);
    currentIndex = nextIndex;
  }, 2500);

  const djRoleElement = document.getElementById('dj-role-text');
  if (djRoleElement) {
    djRoleElement.textContent = 'Producer';
  }

  const profileImage = document.querySelector('.about-image');
  const body = document.body;
  let isDragging = false;
  let startAngle = 0;
  let currentRotation = 0;
  let lastRotation = 0;
  let isTurntableMode = false;
  let autoRotationSpeed = 0;
  let lastMouseMoveTime = 0;
  let lastMouseMoveAngle = 0;
  let autoRotationInterval = null;
  const MAX_ROTATION_SPEED = 8;

  function getAngleFromCenter(event) {
    const rect = profileImage.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
    return angle * (180 / Math.PI);
  }

  function calculateSpinSpeed(currentAngle) {
    const now = Date.now();
    const timeDiff = now - lastMouseMoveTime;
    const angleDiff = currentAngle - lastMouseMoveAngle;
    
    if (timeDiff > 0) {
      const speed = angleDiff / timeDiff;
      lastMouseMoveTime = now;
      lastMouseMoveAngle = currentAngle;
      return speed;
    }
    return 0;
  }

  // BPM pulse control
  const BASE_BPM = 120;
  const MAX_BPM = 140;
  let currentBPM = BASE_BPM;

  function updatePulseBPM(speed) {
    // Map rotation speed to BPM (faster spin = higher BPM)
    const speedFactor = Math.abs(speed) / MAX_ROTATION_SPEED;
    currentBPM = BASE_BPM + (MAX_BPM - BASE_BPM) * speedFactor;
    const pulseDuration = 60 / currentBPM; // Convert BPM to seconds per beat
    profileImage.style.setProperty('--pulse-duration', pulseDuration + 's');
  }

  function activateTurntableMode() {
    isTurntableMode = true;
    body.style.backgroundColor = '#000000';
    body.style.transition = 'background-color 0.3s ease';
    body.classList.add('turntable-mode');
    // Set initial pulse based on spin speed
    updatePulseBPM(autoRotationSpeed);
    if (roleRotationInterval) {
      clearInterval(roleRotationInterval);
      roleRotationInterval = null;
    }
    autoRotationInterval = setInterval(() => {
      currentRotation += autoRotationSpeed;
      profileImage.style.transform = `rotate(${currentRotation}deg)`;
      // Update BPM based on current rotation speed
      updatePulseBPM(autoRotationSpeed);
    }, 16);
  }

  function deactivateTurntableMode() {
    isTurntableMode = false;
    body.style.backgroundColor = '';
    body.style.transition = 'background-color 0.3s ease';
    body.classList.remove('turntable-mode');
    if (!roleRotationInterval) {
      roleElement.style.transition = 'none';
      roleElement.style.transform = 'translateY(0)';
      roleElement.style.opacity = '1';
      roleElement.offsetHeight;
      roleElement.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
      
      roleRotationInterval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % roles.length;
        verticalSpinTransition(nextIndex);
        currentIndex = nextIndex;
      }, 2500);
    }
    if (autoRotationInterval) {
      clearInterval(autoRotationInterval);
      autoRotationInterval = null;
    }
  }

  function handleMouseDown(event) {
    if (isTurntableMode) {
      deactivateTurntableMode();
      return;
    }
    
    isDragging = true;
    startAngle = getAngleFromCenter(event) - lastRotation;
    profileImage.style.cursor = 'grabbing';
    lastMouseMoveTime = Date.now();
    lastMouseMoveAngle = getAngleFromCenter(event);
    event.preventDefault();
  }

  function handleMouseMove(event) {
    if (!isDragging || isTurntableMode) return;
    
    const currentAngle = getAngleFromCenter(event);
    currentRotation = currentAngle - startAngle;
    const spinSpeed = calculateSpinSpeed(currentAngle);
    
    if (Math.abs(spinSpeed) > 0.5) {
      autoRotationSpeed = Math.max(-MAX_ROTATION_SPEED, Math.min(MAX_ROTATION_SPEED, spinSpeed * 2));
      activateTurntableMode();
      return;
    }
    profileImage.style.transform = `rotate(${currentRotation}deg)`;
  }

  function handleMouseUp() {
    if (isDragging && !isTurntableMode) {
      isDragging = false;
      lastRotation = currentRotation;
      profileImage.style.cursor = 'grab';
    }
  }

  profileImage.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);

  profileImage.addEventListener('touchstart', function(event) {
    event.preventDefault();
    const touch = event.touches[0];
    handleMouseDown(touch);
  });

  document.addEventListener('touchmove', function(event) {
    event.preventDefault();
    const touch = event.touches[0];
    handleMouseMove(touch);
  });

  document.addEventListener('touchend', handleMouseUp);

  profileImage.style.cursor = 'grab';
  profileImage.style.transition = 'none';

  const djCanvas = document.getElementById('dj-bg-canvas');
  const ctx = djCanvas.getContext('2d');
  let particles = [];
  let djBgAnimationId = null;
  const PARTICLE_COUNT = 30;
  const PARTICLE_MIN_RADIUS = 8;
  const PARTICLE_MAX_RADIUS = 20;
  const PARTICLE_MIN_SPEED = 0.2;
  const PARTICLE_MAX_SPEED = 0.7;

  function resizeCanvas() {
    djCanvas.width = window.innerWidth;
    djCanvas.height = window.innerHeight;
  }

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = randomBetween(PARTICLE_MIN_RADIUS, PARTICLE_MAX_RADIUS);
      const x = randomBetween(radius, window.innerWidth - radius);
      const y = randomBetween(radius, window.innerHeight - radius);
      const angle = randomBetween(0, 2 * Math.PI);
      const speed = randomBetween(PARTICLE_MIN_SPEED, PARTICLE_MAX_SPEED);
      particles.push({
        x, y, radius,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        alpha: randomBetween(0.5, 1)
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, djCanvas.width, djCanvas.height);
    for (const p of particles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
      ctx.shadowColor = '#4ade80';
      ctx.shadowBlur = 20;
      ctx.fillStyle = '#4ade80';
      ctx.fill();
      ctx.restore();
    }
  }

  function updateParticles() {
    for (const p of particles) {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x - p.radius < 0 || p.x + p.radius > djCanvas.width) p.dx *= -1;
      if (p.y - p.radius < 0 || p.y + p.radius > djCanvas.height) p.dy *= -1;
    }
  }

  function animateDjBg() {
    updateParticles();
    drawParticles();
    djBgAnimationId = requestAnimationFrame(animateDjBg);
  }

  function startDjBg() {
    resizeCanvas();
    createParticles();
    animateDjBg();
    window.addEventListener('resize', resizeCanvas);
  }

  function stopDjBg() {
    cancelAnimationFrame(djBgAnimationId);
    ctx.clearRect(0, 0, djCanvas.width, djCanvas.height);
    window.removeEventListener('resize', resizeCanvas);
  }
  const originalActivateTurntableMode = activateTurntableMode;
  const originalDeactivateTurntableMode = deactivateTurntableMode;
  activateTurntableMode = function() {
    originalActivateTurntableMode();
    startDjBg();
  };
  deactivateTurntableMode = function() {
    originalDeactivateTurntableMode();
    stopDjBg();
  };
}); 