// ===== MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = hamburger.querySelector('.menu-icon');
const closeIcon = hamburger.querySelector('.close-icon');

hamburger.addEventListener('click', function () {
  const isOpen = mobileMenu.classList.toggle('open');
  menuIcon.style.display = isOpen ? 'none' : 'block';
  closeIcon.style.display = isOpen ? 'block' : 'none';
  hamburger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-link').forEach(function (link) {
  link.addEventListener('click', function () {
    mobileMenu.classList.remove('open');
    menuIcon.style.display = 'block';
    closeIcon.style.display = 'none';
  });
});


// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    // Close all others
    document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
      openItem.classList.remove('open');
    });

    // Toggle current
    if (!isOpen) {
      item.classList.add('open');
    }
  });
});


// ===== CONTACT FORM — WEB3FORMS =====
// Replace YOUR_ACCESS_KEY in index.html with your Web3Forms access key.
// Get one free at https://web3forms.com (emails sent to info@caralux.net).

const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('.form-submit-btn');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = 'Envoi en cours...';
  submitBtn.disabled = true;

  const formData = new FormData(contactForm);

  fetch(WEB3FORMS_URL, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.success) {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'flex';
      } else {
        throw new Error(data.message || 'Erreur serveur');
      }
    })
    .catch(function () {
      alert('Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.');
    })
    .finally(function () {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    });
});


// ===== DUPLICATE TRACK CHILDREN FOR SEAMLESS LOOP =====
document.querySelectorAll('.marquee-track, .brands-track').forEach(function (track) {
  var children = track.children;
  var len = children.length;
  for (var i = 0; i < len; i++) {
    track.appendChild(children[i].cloneNode(true));
  }
});


// ===== LIGHTBOX for realisation images =====
var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightbox-img');

// Use event delegation on marquee rows for lightbox (works with cloned elements)
document.querySelectorAll('.marquee-row').forEach(function (row) {
  row.addEventListener('click', function (e) {
    var img = e.target.closest('.marquee-img');
    if (img) {
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
});

lightbox.addEventListener('click', function (e) {
  if (e.target !== lightboxImg) {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
});


// ===== SMOOTH SCROLL for anchor links (fallback for older browsers) =====
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
