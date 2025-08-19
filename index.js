const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
  hamburger.setAttribute('aria-expanded', !expanded);
  navLinks.classList.toggle('active');
});

// Modal open/close functionality
const contactLink = document.querySelector('.nav-link[href="#contact"]');
const modal = document.getElementById('contactModal');
const modalCloseBtn = modal.querySelector('.modal-close');

function openModal() {
  modal.setAttribute('aria-hidden', 'false');
  modal.style.display = 'flex';
  modal.focus();
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  modal.style.display = 'none';
}

contactLink.addEventListener('click', (e) => {
  e.preventDefault();
  openModal();
});

modalCloseBtn.addEventListener('click', () => {
  closeModal();
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Optional: trap focus inside modal for accessibility
modal.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const isSpanish = window.location.pathname.includes('/español/');
  
  const formData = new FormData(contactForm);
  const action = contactForm.getAttribute('action');
  
  fetch(action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      Swal.fire({
        title: isSpanish ? "¡Gracias por contactarnos!" : "Thank you for contacting us!!",
        text: isSpanish ? "Su mensaje ha sido enviado con éxito." : "Your message has been sent successfully.",
        icon: "success",
        draggable: true
      }).then(() => {
        window.location.reload();
      });
    } else {
      Swal.fire({
        icon: "error",
        title: isSpanish ? "Vaya..." : "Oops...",
        text: isSpanish ? "Algo salió mal." : "Something went wrong!",
        footer: isSpanish ? "Por favor, inténtelo de nuevo más tarde." : "Please try again later."
      });
    }
  }).catch(error => {
    alert(isSpanish ? 'Error al enviar el formulario. Por favor, inténtelo de nuevo.' : 'Error sending the form. Please try again.');
  });
});


function onEntry(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}
var observer = new IntersectionObserver(onEntry, { threshold: 0.18 });
document.querySelectorAll('.anim-on-scroll').forEach(el => {
  observer.observe(el);
});




// --- Ventajas Popup global ---
document.addEventListener('DOMContentLoaded', function() {
  const ventajasBtn = document.getElementById('ventajasBtn');
  const ventajasPopup = document.getElementById('ventajasPopup');
  const desventajasBtn = document.getElementById('desventajasBtn');
  const desventajasPopup = document.getElementById('desventajasPopup');
  let isMobile = window.matchMedia('(max-width: 600px)').matches;

  function showPopup(popup) {
    popup.classList.add('active');
    popup.focus();
  }
  function hidePopup(popup) {
    popup.classList.remove('active');
  }

  function setPopupListeners(btn, popup) {
    // Limpia listeners previos
    if (!btn || !popup) return;
    btn.replaceWith(btn.cloneNode(true));
    const realBtn = document.getElementById(btn.id);
    if (isMobile) {
      realBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (popup.classList.contains('active')) {
          hidePopup(popup);
        } else {
          // Mover el popup debajo del botón
          const rect = realBtn.getBoundingClientRect();
          popup.style.position = 'absolute';
          popup.style.left = rect.left + rect.width/2 + 'px';
          popup.style.top = (rect.bottom + window.scrollY + 12) + 'px';
          popup.style.transform = 'translateX(-50%) translateY(0) scale(1)';
          popup.style.zIndex = 1002;
          showPopup(popup);
        }
      });
      document.addEventListener('click', function docClick(e) {
        if (!popup.contains(e.target) && e.target !== realBtn) {
          hidePopup(popup);
        }
      }, { once: true });
    } else {
      realBtn.addEventListener('mouseenter', function() {
        popup.style.position = 'fixed';
        popup.style.left = '50%';
        popup.style.top = '50%';
        popup.style.transform = 'translate(-50%, -50%) scale(1)';
        popup.style.zIndex = 9999;
        showPopup(popup);
      });
      realBtn.addEventListener('focus', function() {
        popup.style.position = 'fixed';
        popup.style.left = '50%';
        popup.style.top = '50%';
        popup.style.transform = 'translate(-50%, -50%) scale(1)';
        popup.style.zIndex = 9999;
        showPopup(popup);
      });
      realBtn.addEventListener('mouseleave', function() { hidePopup(popup); });
      popup.addEventListener('mouseenter', function() { showPopup(popup); });
      popup.addEventListener('mouseleave', function() { hidePopup(popup); });
    }
  }

  setPopupListeners(ventajasBtn, ventajasPopup);
  setPopupListeners(desventajasBtn, desventajasPopup);
  window.addEventListener('resize', function() {
    isMobile = window.matchMedia('(max-width: 600px)').matches;
    hidePopup(ventajasPopup);
    hidePopup(desventajasPopup);
    setPopupListeners(ventajasBtn, ventajasPopup);
    setPopupListeners(desventajasBtn, desventajasPopup);
  });
});