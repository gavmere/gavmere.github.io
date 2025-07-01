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

  setInterval(() => {
    const nextIndex = (currentIndex + 1) % roles.length;
    verticalSpinTransition(nextIndex);
    currentIndex = nextIndex;
  }, 2500);
}); 