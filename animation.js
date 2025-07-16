(function() {
  // Create and inject CSS for expanding circle overlay animation
  const style = document.createElement('style');
  style.textContent = `
    .circle-expand-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: transparent;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }
    .circle {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50px;
      height: 50px;
      background-color: black;
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      animation-fill-mode: forwards;
    }
    @keyframes expandCircle {
      0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 1;
      }
      100% {
        transform: translate(-50%, -50%) scale(50);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);

  document.addEventListener('DOMContentLoaded', function() {
    const mxLink = document.getElementById('mx-link');
    if (!mxLink) return;

    // Create overlay div and circle div
    const overlay = document.createElement('div');
    overlay.className = 'circle-expand-overlay';
    const circle = document.createElement('div');
    circle.className = 'circle';
    overlay.appendChild(circle);

    mxLink.addEventListener('click', function(event) {
      event.preventDefault();
      const href = mxLink.getAttribute('href');
      if (!href) return;

      // Append overlay to body
      document.body.appendChild(overlay);

      // Trigger circle expand animation
      circle.style.animation = 'expandCircle 0.7s ease forwards';

      // Redirect after animation ends
      circle.addEventListener('animationend', function() {
        window.location.href = href;
      });
    });
  });
})();
