// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll progress bar
function updateScrollProgress() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.querySelector(".scroll-progress").style.width = scrollPercent + "%";
}

window.addEventListener("scroll", updateScrollProgress);

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset;

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    header.style.transform = "translateY(-100%)";
  } else {
    header.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop;
});

// Project details toggle
function toggleDetails(button) {
  const details = button.nextElementSibling;
  const isActive = details.classList.contains("active");

  if (isActive) {
    details.classList.remove("active");
    button.textContent = "자세히 보기";
  } else {
    details.classList.add("active");
    button.textContent = "접기";
  }
}

// Mobile menu toggle
function createMobileMenu() {
  const nav = document.querySelector("nav");
  const navList = nav.querySelector("ul");

  const hamburger = document.createElement("button");
  hamburger.className = "hamburger";
  hamburger.innerHTML = "☰";
  hamburger.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--primary-color);
    `;

  nav.insertBefore(hamburger, navList);

  hamburger.addEventListener("click", () => {
    navList.classList.toggle("mobile-active");
  });

  const mobileStyles = document.createElement("style");
  mobileStyles.textContent = `
        @media (max-width: 768px) {
            .hamburger {
                display: block !important;
            }
            
            nav ul {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                flex-direction: column;
                padding: 20px;
                border-radius: 0 0 20px 20px;
                box-shadow: var(--shadow);
                transform: translateY(-20px);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            nav ul.mobile-active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            nav ul li {
                margin: 10px 0;
            }
        }
    `;
  document.head.appendChild(mobileStyles);
}

createMobileMenu();

// Skill tags hover effect
document.querySelectorAll(".skill-tag").forEach((tag) => {
  tag.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05) translateY(-2px)";
  });

  tag.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1) translateY(0px)";
  });
});

// Contact items hover effect
document.querySelectorAll(".contact-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px) scale(1.02)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0px) scale(1)";
  });
});

// Loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

const loadingStyles = document.createElement("style");
loadingStyles.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--background-color);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: '';
        width: 50px;
        height: 50px;
        border: 3px solid var(--border-color);
        border-top: 3px solid var(--accent-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;
document.head.appendChild(loadingStyles);

// Project card tilt effect (desktop only)
if (window.innerWidth > 1024) {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });
}

// Smooth scrolling enhancement for better performance
document.documentElement.style.scrollBehavior = "smooth";

// Add active class to current navigation item
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section[id]");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll("nav a").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Add CSS for active navigation
const activeNavStyles = document.createElement("style");
activeNavStyles.textContent = `
    nav a.active {
        color: var(--accent-color) !important;
    }
    
    nav a.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(activeNavStyles);

// Preload critical resources
const preloadLink = document.createElement("link");
preloadLink.rel = "preload";
preloadLink.as = "style";
preloadLink.href = "css/style.css";
document.head.appendChild(preloadLink);
