// script.js - Avinash Pednekar Portfolio Script

// 1. Toast Notification Helper
function showToast(message, isSuccess = true) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");
  const toastIcon = document.getElementById("toast-icon");

  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;

  if (toastIcon) {
    if (isSuccess) {
      toastIcon.className = "fas fa-check-circle text-emerald-400 dark:text-emerald-600 text-lg";
    } else {
      toastIcon.className = "fas fa-exclamation-circle text-rose-400 dark:text-rose-600 text-lg";
    }
  }

  toast.classList.remove("hidden");
  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.remove("opacity-0", "translate-y-4");
    toast.classList.add("opacity-100", "translate-y-0");
  });

  setTimeout(() => {
    toast.classList.remove("opacity-100", "translate-y-0");
    toast.classList.add("opacity-0", "translate-y-4");
    setTimeout(() => toast.classList.add("hidden"), 300);
  }, 3500);
}

// 2. Theme Toggle (Fresh Light Default + Dark Mode Option)
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const html = document.documentElement;
  const themeIcons = [
    document.getElementById("theme-icon"),
    document.getElementById("theme-icon-mobile")
  ];

  function updateIcons(isDark) {
    themeIcons.forEach((icon) => {
      if (!icon) return;
      if (isDark) {
        icon.className = "fas fa-sun text-amber-400 text-base";
      } else {
        icon.className = "fas fa-moon text-slate-600 text-base";
      }
    });
  }

  // Set initial theme - default to Light theme unless explicitly saved as 'dark'
  if (savedTheme === "dark") {
    html.classList.add("dark");
    updateIcons(true);
  } else {
    html.classList.remove("dark");
    updateIcons(false);
  }

  function toggleTheme() {
    const isDark = html.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateIcons(isDark);
    showToast(isDark ? "🌙 Switched to Dark Theme" : "☀️ Switched to Fresh Light Theme", true);
  }

  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeToggleMobileBtn = document.getElementById("theme-toggle-mobile");

  if (themeToggleBtn) themeToggleBtn.addEventListener("click", toggleTheme);
  if (themeToggleMobileBtn) themeToggleMobileBtn.addEventListener("click", toggleTheme);
}

// 3. Contact Form Submission (Formspree Integration)
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById("submit-btn");
    const btnText = document.getElementById("btn-text");
    const btnLoader = document.getElementById("btn-loader");

    // Loading State
    submitBtn.disabled = true;
    if (btnText) btnText.textContent = "Sending...";
    if (btnLoader) btnLoader.classList.remove("hidden");

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        showToast("✨ Message sent successfully! I will reply soon.", true);
        contactForm.reset();
      } else {
        const data = await response.json();
        if (data && data.errors) {
          const errMsg = data.errors.map((err) => err.message).join(", ");
          showToast(`❌ Error: ${errMsg}`, false);
        } else {
          showToast("❌ Failed to send message. Please try again.", false);
        }
      }
    } catch (error) {
      showToast("⚠️ Network issue. Please email avinashpednekar431@gmail.com directly.", false);
    } finally {
      // Reset Button State
      submitBtn.disabled = false;
      if (btnText) btnText.textContent = "Send Message";
      if (btnLoader) btnLoader.classList.add("hidden");
    }
  });
}

// 4. Copy Email to Clipboard
function initCopyEmail() {
  const copyBtn = document.getElementById("copy-email-btn");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", () => {
    const email = "avinashpednekar431@gmail.com";
    navigator.clipboard
      .writeText(email)
      .then(() => {
        showToast("📋 Email copied to clipboard: " + email, true);
      })
      .catch(() => {
        showToast("📋 Contact: " + email, true);
      });
  });
}

// 5. Mobile Navigation & Scroll Reveal
function initNavAndScroll() {
  // Mobile Hamburger Toggle
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // Close menu when a link is clicked
    const links = mobileMenu.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // Header elevation on scroll
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("shadow-md");
    } else {
      header.classList.remove("shadow-md");
    }
  });

  // Intersection Observer for Smooth Scroll Reveal
  const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll(".reveal-item");
  revealElements.forEach((el) => revealObserver.observe(el));
}

// 6. Typed.js Hero Animation
function initTypedText() {
  const typingTarget = document.getElementById("hero-typing-text");
  if (typingTarget && typeof Typed !== "undefined") {
    new Typed("#hero-typing-text", {
      strings: [
        "Full-Stack Applications.",
        "Java & Spring Boot Backends.",
        "Scalable RESTful Systems.",
        "AI-Integrated Solutions.",
      ],
      typeSpeed: 60,
      backSpeed: 35,
      backDelay: 1800,
      loop: true,
      smartBackspace: true,
      cursorChar: "|",
    });
  }
}

// 7. Project Category Filtering
function initProjectFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const categories = (card.getAttribute("data-category") || "").split(",");
        if (filter === "all" || categories.includes(filter)) {
          card.style.display = "flex";
          card.style.opacity = "1";
        } else {
          card.style.display = "none";
          card.style.opacity = "0";
        }
      });
    });
  });
}

// 8. Project Details Modal Dialogs
function initProjectModals() {
  const detailBtns = document.querySelectorAll(".view-details-btn");
  const closeBtns = document.querySelectorAll(".modal-close-btn");
  const modals = document.querySelectorAll(".project-modal");

  function openModal(projectId) {
    const targetModal = document.getElementById(`project-modal-${projectId}`);
    if (!targetModal) return;

    targetModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  detailBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const projectId = btn.getAttribute("data-project");
      openModal(projectId);
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const modal = e.target.closest(".project-modal");
      closeModal(modal);
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // ESC key listener to close active modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".project-modal.active");
      if (activeModal) {
        closeModal(activeModal);
      }
    }
  });
}

// 9. Current Year Auto-Update
function initYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// Initialize everything on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initContactForm();
  initCopyEmail();
  initNavAndScroll();
  initTypedText();
  initProjectFilter();
  initProjectModals();
  initYear();
});