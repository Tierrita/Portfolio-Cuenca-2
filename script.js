/* =========================================================
   FONDO IA (VANTA.NET)
   ========================================================= */
window.addEventListener("DOMContentLoaded", () => {
  VANTA.NET({
    el: "#background",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x00ffff,
    backgroundColor: 0x000000,
    points: 12.00,
    maxDistance: 22.00,
    spacing: 18.00
  });
});

/* =========================================================
   NAVEGACIÓN ENTRE SECCIONES (SPA)
   - Oculta todas las secciones y muestra solo la elegida.
   - Opcional: marcamos el botón activo con .active-btn
   ========================================================= */
function showSection(id) {
  // oculta todas
  document.querySelectorAll("section").forEach(sec => {
    sec.classList.remove("active");
    sec.classList.add("hidden");
  });

  // muestra la target
  const target = document.getElementById(id);
  if (target) {
    target.classList.remove("hidden");
    target.classList.add("active");
  }

  // resalta botón activo (by text match)
  document.querySelectorAll("nav button").forEach(btn => btn.classList.remove("active-btn"));
  // (si querés un match más robusto, podés usar data-section en los botones)
}

/* =========================================================
   SKILLS: ANIMACIÓN DE BARRAS + CONTADOR
   - Se activa al entrar en viewport (IntersectionObserver)
   ========================================================= */
const skillsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const bar = entry.target;
    const target = parseInt(bar.getAttribute("data-level"), 10) || 0;

    // contador dinámico
    let current = 0;
    const counter = document.createElement("span");
    counter.classList.add("skill-counter");
    bar.appendChild(counter);

    const animate = () => {
      if (current <= target) {
        bar.style.width = current + "%";
        counter.textContent = current + "%";
        current++;
        requestAnimationFrame(animate);
      }
    };
    animate();

    // dejar de observar esa barra
    skillsObserver.unobserve(bar);
  });
}, { threshold: 0.6 });

// observar todas las barras
document.querySelectorAll(".skill-level").forEach(bar => skillsObserver.observe(bar));

/* =========================================================
   PROYECTOS: TABS DINÁMICAS
   - Cambia contenido y botón activo sin recargar
   ========================================================= */
function showProject(id) {
  // contenido
  document.querySelectorAll(".project-description").forEach(d => d.classList.remove("active"));
  const panel = document.getElementById(id);
  if (panel) panel.classList.add("active");

  // botones
  document.querySelectorAll(".project-btn").forEach(b => b.classList.remove("active"));
  // event.target funciona por inline onclick; si prefieres robustez:
  // buscamos el botón cuyo onclick incluye el id
  const btn = [...document.querySelectorAll(".project-btn")]
    .find(x => x.getAttribute("onclick")?.includes(`'${id}'`));
  if (btn) btn.classList.add("active");
}
