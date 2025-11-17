/* =========================================================
   VANTA.NET - Fondo IA Futurista
   ========================================================= */
window.onload = () => {
  // Inicializar Vanta.js
  if (typeof VANTA !== 'undefined') {
    VANTA.NET({
      el: "#background",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x00ffff,
      backgroundColor: 0x000000,
      points: 12,
      maxDistance: 22,
      spacing: 18,
    });
  }

  // Mostrar sección Home por defecto
  showSection('home');
};

/* =========================================================
   SPA (Single Page Application)
   ========================================================= */
function showSection(id) {
  // Ocultar todas las secciones
  document.querySelectorAll("main section").forEach(sec => {
    sec.classList.remove("active");
    sec.classList.add("hidden");
  });

  // Mostrar la sección seleccionada
  const targetSection = document.getElementById(id);
  if (targetSection) {
    targetSection.classList.remove("hidden");
    targetSection.classList.add("active");
  }

  // Actualizar botones del menú
  document.querySelectorAll("nav button").forEach(btn => {
    const matches = btn.getAttribute("onclick")?.includes(`'${id}'`);
    btn.classList.toggle("active-btn", matches);
  });

  // Scroll suave al top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* =========================================================
   SKILLS - Animación de barras de progreso
   ========================================================= */
const skillsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const bar = entry.target;
    const target = parseInt(bar.dataset.level, 10);

    // Animar el ancho de la barra
    setTimeout(() => {
      bar.style.width = target + "%";
    }, 100);

    skillsObserver.unobserve(bar);
  });
}, { threshold: 0.5 });

// Observar todas las barras cuando se carga el DOM
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll(".skill-level").forEach(bar => {
    skillsObserver.observe(bar);
  });
});

/* =========================================================
   PROYECTOS - Tabs dinámicas
   ========================================================= */
function showProject(id) {
  // Ocultar todas las descripciones
  document.querySelectorAll(".project-description").forEach(p => {
    p.classList.remove("active");
  });

  // Mostrar la descripción seleccionada
  const targetProject = document.getElementById(id);
  if (targetProject) {
    targetProject.classList.add("active");
  }

  // Actualizar botones
  document.querySelectorAll(".project-btn").forEach(btn => {
    const matches = btn.getAttribute("onclick")?.includes(`'${id}'`);
    btn.classList.toggle("active", matches);
  });
}

/* =========================================================
   FORMULARIO DE CONTACTO
   ========================================================= */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    // Validación básica
    if (!formData.name || !formData.email || !formData.message) {
      showFormStatus('Por favor completa todos los campos', 'error');
      return;
    }

    if (!validateEmail(formData.email)) {
      showFormStatus('Por favor ingresa un email válido', 'error');
      return;
    }

    // Mostrar mensaje de envío
    showFormStatus('Enviando mensaje...', 'info');

    // Simular envío (aquí irías a integrar EmailJS o tu backend)
    setTimeout(() => {
      // EmailJS configuration (descomenta cuando tengas las credenciales)
      /*
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
        .then(() => {
          showFormStatus('¡Mensaje enviado! Te responderé pronto ⚡', 'success');
          contactForm.reset();
        })
        .catch((error) => {
          showFormStatus('Error al enviar. Intenta por email directo.', 'error');
          console.error('EmailJS error:', error);
        });
      */

      // Por ahora, simulamos éxito y redirigimos al mailto
      const mailtoLink = `mailto:francocuenca150@gmail.com?subject=Contacto desde Portfolio - ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AEmail de contacto: ${formData.email}`;
      window.location.href = mailtoLink;
      
      showFormStatus('Abriendo tu cliente de email... ⚡', 'success');
      contactForm.reset();
    }, 500);
  });
}

function showFormStatus(message, type) {
  if (formStatus) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/* =========================================================
   TYPEWRITER EFFECT (Opcional para el H1)
   ========================================================= */
function typewriterEffect(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Descomentar para activar efecto typewriter en el título
/*
document.addEventListener('DOMContentLoaded', () => {
  const titleElement = document.getElementById('typewriter');
  if (titleElement) {
    const originalText = titleElement.textContent;
    typewriterEffect(titleElement, originalText, 80);
  }
});
*/

/* =========================================================
   SMOOTH SCROLL PARA ENLACES INTERNOS
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  // Ya está implementado con scroll-behavior: smooth en CSS
  // Esta función es un fallback para navegadores antiguos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});

/* =========================================================
   LAZY LOADING PARA IMÁGENES
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
});

/* =========================================================
   DETECTAR SCROLL Y AGREGAR CLASE AL HEADER
   ========================================================= */
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

/* =========================================================
   ANALYTICS (Google Analytics o similar)
   ========================================================= */
// Descomentar y configurar cuando tengas GA instalado
/*
function trackEvent(category, action, label) {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }
}

// Ejemplo de uso:
document.querySelectorAll('.project-link').forEach(link => {
  link.addEventListener('click', () => {
    trackEvent('Projects', 'click', link.href);
  });
});
*/

/* =========================================================
   METRICAS ANIMADAS CON CONTEO
   ========================================================= */
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }
  
  updateCounter();
}

// Observar métricas y animar cuando sean visibles
const metricsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numberElement = entry.target.querySelector('.metric-number');
      if (numberElement && !numberElement.dataset.animated) {
        const text = numberElement.textContent;
        const target = parseInt(text.replace(/\D/g, ''));
        const prefix = text.includes('+') ? '+' : '';
        
        numberElement.dataset.animated = 'true';
        animateCounter(numberElement, target, 1500);
        
        // Agregar el prefijo después de la animación
        setTimeout(() => {
          numberElement.textContent = prefix + numberElement.textContent;
        }, 1500);
      }
      metricsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.metric-item').forEach(item => {
    metricsObserver.observe(item);
  });
});

console.log('🚀 Portfolio Franco Cuenca - Desarrollado con passion & código ⚡');
