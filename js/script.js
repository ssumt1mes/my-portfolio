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

// Create modal for project details
function createModal() {
  const modal = document.createElement("div");
  modal.className = "project-modal";
  modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title"></h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-description"></div>
                    <div class="modal-tech"></div>
                    <div class="modal-details"></div>
                    <div class="modal-screenshots"></div>
                </div>
                <div class="modal-footer">
                    <div class="modal-links"></div>
                </div>
            </div>
        </div>
    `;

  document.body.appendChild(modal);

  // Modal styles
  const modalStyles = document.createElement("style");
  modalStyles.textContent = `
        .project-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
            display: none;
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .project-modal.active {
            display: flex;
            opacity: 1;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .modal-content {
            background: var(--card-background);
            border-radius: 20px;
            max-width: 800px;
            max-height: 90vh;
            width: 100%;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            transform: scale(0.7);
            transition: transform 0.3s ease;
        }
        
        .project-modal.active .modal-content {
            transform: scale(1);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 30px 30px 20px 30px;
            border-bottom: 1px solid var(--border-color);
        }
        
        .modal-title {
            font-size: 1.8rem;
            color: var(--primary-color);
            margin: 0;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            color: var(--secondary-color);
            cursor: pointer;
            padding: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            background: var(--light-gray);
            color: var(--primary-color);
        }
        
        .modal-body {
            padding: 30px;
        }
        
        .modal-description {
            font-size: 1.1rem;
            color: var(--secondary-color);
            line-height: 1.6;
            margin-bottom: 25px;
        }
        
        .modal-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 30px;
        }
        
        .modal-tech .tech-tag {
            padding: 6px 12px;
            background: rgba(0, 122, 255, 0.1);
            color: var(--accent-color);
            border-radius: 15px;
            font-size: 0.9rem;
            font-weight: 500;
        }
        
        .modal-details {
            margin-bottom: 30px;
        }
        
        .modal-details h4 {
            color: var(--primary-color);
            margin-bottom: 15px;
            font-size: 1.3rem;
        }
        
        .modal-details ul {
            list-style: none;
            padding-left: 0;
            margin-bottom: 25px;
        }
        
        .modal-details li {
            position: relative;
            padding-left: 20px;
            margin-bottom: 10px;
            color: var(--secondary-color);
            line-height: 1.5;
        }
        
        .modal-details li:before {
            content: '•';
            color: var(--accent-color);
            position: absolute;
            left: 0;
            font-weight: bold;
        }
        
        .modal-screenshots {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        
        .modal-screenshot {
            width: 100%;
            height: 150px;
            background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--secondary-color);
            font-size: 0.9rem;
            border: 1px solid var(--border-color);
            transition: all 0.3s ease;
        }
        
        .modal-screenshot:hover {
            background: linear-gradient(135deg, #e0e0e0 0%, #d0d0d0 100%);
        }
        
        .modal-footer {
            padding: 20px 30px 30px 30px;
            border-top: 1px solid var(--border-color);
        }
        
        .modal-links {
            display: flex;
            gap: 15px;
            justify-content: center;
        }
        
        .modal-link {
            padding: 12px 24px;
            background: var(--accent-color);
            color: white;
            text-decoration: none;
            border-radius: 25px;
            font-weight: 600;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }
        
        .modal-link:hover {
            background: #0056b3;
            transform: translateY(-2px);
        }
        
        .modal-link.secondary {
            background: var(--light-gray);
            color: var(--primary-color);
            border: 1px solid var(--border-color);
        }
        
        .modal-link.secondary:hover {
            background: var(--border-color);
        }
        
        @media (max-width: 768px) {
            .modal-content {
                max-height: 95vh;
                margin: 0;
                border-radius: 15px;
            }
            
            .modal-header {
                padding: 20px 20px 15px 20px;
            }
            
            .modal-title {
                font-size: 1.5rem;
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .modal-footer {
                padding: 15px 20px 20px 20px;
            }
            
            .modal-links {
                flex-direction: column;
            }
            
            .modal-screenshots {
                grid-template-columns: 1fr;
            }
        }
    `;
  document.head.appendChild(modalStyles);

  return modal;
}

// Project details modal function
function toggleDetails(button) {
  const projectCard = button.closest(".project-card");
  const projectTitle = projectCard.querySelector("h3").textContent;
  const projectDescription = projectCard.querySelector("p").textContent;
  const techTags = projectCard.querySelectorAll(".tech-tag");
  const projectLinks = projectCard.querySelectorAll(".project-link");
  const detailsContent = projectCard.querySelector(".project-details-content");

  let modal = document.querySelector(".project-modal");
  if (!modal) {
    modal = createModal();
  }

  // Populate modal content
  modal.querySelector(".modal-title").textContent = projectTitle;
  modal.querySelector(".modal-description").textContent = projectDescription;

  // Add tech tags
  const modalTech = modal.querySelector(".modal-tech");
  modalTech.innerHTML = "";
  techTags.forEach((tag) => {
    const modalTag = document.createElement("span");
    modalTag.className = "tech-tag";
    modalTag.textContent = tag.textContent;
    modalTech.appendChild(modalTag);
  });

  // Add detailed content
  const modalDetails = modal.querySelector(".modal-details");
  if (detailsContent) {
    modalDetails.innerHTML = detailsContent.innerHTML;
  }

  // Add screenshots
  const modalScreenshots = modal.querySelector(".modal-screenshots");
  const screenshots = detailsContent
    ? detailsContent.querySelectorAll(".screenshot")
    : [];
  modalScreenshots.innerHTML = "";
  screenshots.forEach((screenshot) => {
    const modalScreenshot = document.createElement("div");
    modalScreenshot.className = "modal-screenshot";
    modalScreenshot.textContent = screenshot.textContent;
    modalScreenshots.appendChild(modalScreenshot);
  });

  // Add links
  const modalLinks = modal.querySelector(".modal-links");
  modalLinks.innerHTML = "";
  projectLinks.forEach((link, index) => {
    const modalLink = document.createElement("a");
    modalLink.href = link.href;
    modalLink.className = index === 0 ? "modal-link" : "modal-link secondary";
    modalLink.textContent = link.textContent;
    modalLink.target = "_blank";
    modalLinks.appendChild(modalLink);
  });

  // Show modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Close modal functionality
  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  modal.querySelector(".modal-close").onclick = closeModal;
  modal.querySelector(".modal-overlay").onclick = (e) => {
    if (e.target === modal.querySelector(".modal-overlay")) {
      closeModal();
    }
  };

  // Close with Escape key
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      closeModal();
      document.removeEventListener("keydown", handleEscape);
    }
  };
  document.addEventListener("keydown", handleEscape);
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

// Subtle hover effects for project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-8px) scale(1.02)";
    this.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.15)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0px) scale(1)";
    this.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.08)";
  });
});

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

// Smooth scrolling enhancement
document.documentElement.style.scrollBehavior = "smooth";

// Add active class to current navigation item
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section[id]");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
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
