/* =========================================================
   VANTA.NET - Fondo IA Futurista
   =========================================================
   - Se inicializa tras la carga completa del documento.
   - Mejora de compatibilidad móvil y evita errores de render.
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
   - Gestiona la navegación entre secciones sin recargar la página.
   - Mantiene un solo documento HTML optimizado para SEO.
========================================================= */
function showSection(id) {
  // Muestra solo la sección activa
  document.querySelectorAll("main section").forEach(sec =>
    sec.classList.toggle("active", sec.id === id)
  );

  // Resalta el botón activo del menú
  document.querySelectorAll("nav button").forEach(btn => {
    const matches = btn.getAttribute("onclick")?.includes(`'${id}'`);
    btn.classList.toggle("active-btn", matches);
  });
}

/* =========================================================
   Animación de Skills
   =========================================================
   - Activa cuando las barras entran en el viewport.
   - Usa requestAnimationFrame con interpolación temporal.
   - Optimizada para evitar consumo excesivo de CPU.
========================================================= */
const skillsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const bar = entry.target;
    const target = parseInt(bar.dataset.level, 10);
    let start = null;

    // Crea contador dinámico
    const counter = document.createElement("span");
    counter.classList.add("skill-counter");
    bar.appendChild(counter);

    // Función de animación suave basada en tiempo
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / 1000, 1); // duración 1s
      const value = Math.floor(target * progress);
      bar.style.width = value + "%";
      counter.textContent = value + "%";
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
    skillsObserver.unobserve(bar);
  });
}, { threshold: 0.5 });

// Inicia la observación de todas las barras
document.querySelectorAll(".skill-level").forEach(bar => skillsObserver.observe(bar));

/* =========================================================
   Proyectos - Tabs Dinámicas
   =========================================================
   - Cambia el contenido visible del bloque de proyectos.
   - Mejora accesibilidad al mantener botones y texto sincronizados.
========================================================= */
function showProject(id) {
  // Cambia la descripción activa
  document.querySelectorAll(".project-description").forEach(p =>
    p.classList.toggle("active", p.id === id)
  );

  // Resalta el botón activo
  document.querySelectorAll(".project-btn").forEach(btn => {
    const matches = btn.getAttribute("onclick")?.includes(`'${id}'`);
    btn.classList.toggle("active", matches);
  });
}
