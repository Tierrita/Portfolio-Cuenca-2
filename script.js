/* =========================================================
   VANTA.NET - Fondo IA Futurista
   =========================================================
   - Se inicializa tras la carga completa del documento.
   - Compatible con móviles y evita errores de render.
========================================================= */
window.onload = () => {
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
};

/* =========================================================
   SPA (Single Page Application)
   =========================================================
   - Muestra solo una sección a la vez sin recargar la página.
   - Marca el botón activo del menú.
========================================================= */
function showSection(id) {
  // Mostrar solo la sección activa
  document.querySelectorAll("main section").forEach(sec =>
    sec.classList.toggle("active", sec.id === id)
  );

  // Resaltar botón activo
  document.querySelectorAll("nav button").forEach(btn => {
    const matches = btn.getAttribute("onclick")?.includes(`'${id}'`);
    btn.classList.toggle("active-btn", matches);
  });
}

/* =========================================================
   SKILLS - Animación de barras de progreso
   =========================================================
   - Se activa cuando la barra entra en el viewport.
   - Solo anima el ancho (no genera contador textual).
========================================================= */
const skillsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return; // Solo cuando la barra es visible

    const bar = entry.target;
    const target = parseInt(bar.dataset.level, 10);
    let start = null;

    // Animación suave de llenado
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / 1000, 1); // duración 1s
      const value = Math.floor(target * progress);
      bar.style.width = value + "%";
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
    skillsObserver.unobserve(bar);
  });
}, { threshold: 0.5 });

// Observar todas las barras al cargar
document.querySelectorAll(".skill-level").forEach(bar => skillsObserver.observe(bar));

/* =========================================================
   PROYECTOS - Tabs dinámicas
   =========================================================
   - Cambia el contenido activo sin recargar.
   - Mantiene la coherencia visual entre botón y texto.
========================================================= */
function showProject(id) {
  // Mostrar la descripción correspondiente
  document.querySelectorAll(".project-description").forEach(p =>
    p.classList.toggle("active", p.id === id)
  );

  // Marcar el botón correspondiente
  document.querySelectorAll(".project-btn").forEach(btn => {
    const matches = btn.getAttribute("onclick")?.includes(`'${id}'`);
    btn.classList.toggle("active", matches);
  });
}
