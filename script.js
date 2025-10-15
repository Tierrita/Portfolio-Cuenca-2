// 🎯 Animar barras de Skills al entrar en la sección
function animateSkills() {
  const skills = document.querySelectorAll('.skill-level');
  skills.forEach(skill => {
    const level = skill.getAttribute('data-level');
    skill.style.width = level + "%";
    skill.classList.add("skill-loaded");
  });
}

// 🧭 Modificar showSection para incluir la animación
function showSection(sectionId) {
  document.querySelectorAll("main section").forEach(sec => {
    sec.classList.add("hidden");
  });

  const section = document.getElementById(sectionId);
  section.classList.remove("hidden");

  // Si es la sección Skills, dispara la animación
  if (sectionId === "skills") {
    setTimeout(animateSkills, 300);
  }
}


// Fondo animado
VANTA.NET({
  el: "#background",
  mouseControls: true,
  touchControls: true,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0x00ffff,
  backgroundColor: 0x000000,
  points: 12.0,
  maxDistance: 25.0,
  spacing: 18.0,
});

// Mostrar una sección y ocultar las demás
function showSection(id) {
  const sections = document.querySelectorAll("section");
  sections.forEach((sec) => {
    sec.classList.remove("active");
    sec.style.display = "none";
  });

  const selected = document.getElementById(id);
  selected.style.display = "block";
  selected.classList.add("active");
  selected.scrollIntoView({ behavior: "smooth" });
}

