document.addEventListener("DOMContentLoaded", function () {
  // ======= Scroll Active Links =======
  const sections = document.querySelectorAll("section"); // Cambiado de .section a section para mayor compatibilidad
  const navLinks = document.querySelectorAll(".fbs__net-navbar .scroll-link");

  function removeActiveClasses() {
    if (navLinks) {
      navLinks.forEach((link) => link.classList.remove("active"));
    }
  }

  function addActiveClass(currentSectionId) {
    const activeLink = document.querySelector(`.fbs__net-navbar .scroll-link[href="#${currentSectionId}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  function getCurrentSection() {
    let currentSection = null;
    let minDistance = Infinity;
    if (sections) {
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - window.innerHeight / 4);
        if (distance < minDistance && rect.top < window.innerHeight) {
          minDistance = distance;
          currentSection = section.getAttribute("id");
        }
      });
    }
    return currentSection;
  }

  function updateActiveLink() {
    const currentSectionId = getCurrentSection();
    if (currentSectionId) {
      removeActiveClasses();
      addActiveClass(currentSectionId);
    }
  }

  window.addEventListener("scroll", updateActiveLink);

  // ======= Isotope Portfolio =======
  const portfolioGrid = document.querySelector('#portfolio-grid');
  if (portfolioGrid) {
    var iso = new Isotope("#portfolio-grid", {
      itemSelector: ".portfolio-item",
      layoutMode: "masonry",
    });

    if (iso) {
      iso.on("layoutComplete", updateActiveLink);
      imagesLoaded("#portfolio-grid", function () {
        iso.layout();
        updateActiveLink();
      });
    }

    var filterButtons = document.querySelectorAll(".filter-button");
    if (filterButtons) {
      filterButtons.forEach(function (button) {
        button.addEventListener("click", function (e) {
          e.preventDefault();
          var filterValue = button.getAttribute("data-filter");
          iso.arrange({ filter: filterValue });
          filterButtons.forEach((btn) => btn.classList.remove("active"));
          button.classList.add("active");
          updateActiveLink();
        });
      });
    }
  }

  // ======= Llamada a Inits =======
  logoMarqueeInit();
  navbarInit();
  swiperInit();
  glightboxInit();
  bsOffCanvasInit();
  backToTopInit();
  inlineSvgInit();
  aosInit();
  pureCounterInit();
  countdownInit();

  // ======= FIXED: Manejo de Scroll Links =======
  document.querySelectorAll('.scroll-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Cerrar Offcanvas de Bootstrap de forma segura
          const offcanvasElement = document.getElementById('mobileMenu');
          if (offcanvasElement) {
            const instance = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
            instance.hide();
          }

          // Scroll Suave
          const headerOffset = 90;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  });

  // ======= FIXED: Hamburger Check =======
  const hb = document.querySelector(".navbar-toggler"); // Cambiado de .hamburger a .navbar-toggler
  if (hb) {
    hb.addEventListener("click", () => {
      hb.classList.toggle("active");
    });
  }
});

// --- Funciones de Inicialización ---

const navbarScrollInit = () => {
  var navbar = document.querySelector(".fbs__net-navbar");
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (navbar) {
    scrollTop > 50 ? navbar.classList.add("active") : navbar.classList.remove("active");
  }
};
window.addEventListener("scroll", navbarScrollInit);

const navbarInit = () => {
  document.querySelectorAll('.dropdown-toggle[href="#"]').forEach(el => {
    el.addEventListener("click", (e) => e.stopPropagation());
  });
};

const logoMarqueeInit = () => {
  const wrapper = document.querySelector(".logo-wrapper");
  if (!wrapper || !window.gsap) return;
  // ... (Tu lógica de GSAP actual se mantiene igual)
};

const swiperInit = () => {
  if (document.querySelector(".testimonialSwiper")) {
    new Swiper(".testimonialSwiper", { slidesPerView: 1, speed: 700, spaceBetween: 30, loop: true, navigation: { nextEl: ".custom-button-next", prevEl: ".custom-button-prev" } });
  }
};

const glightboxInit = () => { if (window.GLightbox) GLightbox({ touchNavigation: true, loop: true }); };

const bsOffCanvasInit = () => {
  var offcanvasElement = document.getElementById("mobileMenu");
  if (offcanvasElement) {
    offcanvasElement.addEventListener("show.bs.offcanvas", () => document.body.classList.add("offcanvas-active"));
    offcanvasElement.addEventListener("hidden.bs.offcanvas", () => document.body.classList.remove("offcanvas-active"));
  }
};

const backToTopInit = () => {
  const btn = document.getElementById("back-to-top");
  if (btn) {
    window.addEventListener("scroll", () => window.scrollY > 170 ? btn.classList.add("show") : btn.classList.remove("show"));
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }
};

const inlineSvgInit = () => { /* Tu lógica de fetch SVG actual */ };
const aosInit = () => { if (window.AOS) AOS.init({ duration: 800, once: true }); };
const pureCounterInit = () => { if (window.PureCounter) new PureCounter(); };
const countdownInit = () => { /* Tu lógica de countdown actual */ };