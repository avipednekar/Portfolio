function showToast(message, success = true) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");

  toastMessage.textContent = message;

  toast.className = `fixed bottom-6 right-6 px-6 py-4 rounded-lg shadow-lg border transition-opacity duration-500 ${
    success ? "bg-green-600 border-green-400" : "bg-red-600 border-red-400"
  } text-white`;

  toast.classList.remove("hidden");
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.classList.add("hidden"), 500);
  }, 3000);
}

document
  .getElementById("contact-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const btn = document.getElementById("submit-btn");
    const btnText = document.getElementById("btn-text");
    const btnLoader = document.getElementById("btn-loader");

    // Show loader, hide text
    btn.disabled = true;
    btnText.textContent = "Sending...";
    btnLoader.classList.remove("hidden");

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    try {
      const response = await fetch("http://localhost:5000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        showToast("✅ Message sent successfully!", true);
        document.getElementById("contact-form").reset();
      } else {
        showToast("❌ Failed to send message.", false);
      }
    } catch (error) {
      showToast("⚠️ Something went wrong. Try again later.", false);
    } finally {
      // Reset button
      btn.disabled = false;
      btnText.textContent = "Send Message";
      btnLoader.classList.add("hidden");
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  // --- Mobile Menu Interactivity ---
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Close mobile menu when a link is clicked
  const mobileLinks = mobileMenu.getElementsByTagName("a");
  for (let link of mobileLinks) {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  }

  // --- Header Style on Scroll ---
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add(
        "bg-neutral-900/90",
        "backdrop-blur-sm",
        "shadow-lg"
      );
    } else {
      header.classList.remove(
        "bg-neutral-900/90",
        "backdrop-blur-sm",
        "shadow-lg"
      );
    }
  });

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll(".reveal");
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    for (let i = 0; i < revealElements.length; i++) {
      const elementTop = revealElements[i].getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        revealElements[i].classList.add("active");
      }
    }
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Initial check

  // --- Typed.js Hero Animation ---
  if (document.getElementById("hero-typing-text")) {
    new Typed("#hero-typing-text", {
      strings: ["Developer.", "UI/UX Designer.", "Problem Solver."],
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 1500,
      loop: true,
      smartBackspace: true,
      cursorChar: "_",
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      projectCards.forEach((card) => {
        if (filterValue === "all") {
          card.style.display = "block";
        } else {
          const categories = card.getAttribute("data-category").split(",");
          if (categories.includes(filterValue)) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        }
      });
    });
  });

  // Project modal functionality
  const viewDetailsButtons = document.querySelectorAll(".view-details");
  const projectModals = document.querySelectorAll(".project-modal");
  const closeModalButtons = document.querySelectorAll(".close-modal");

  viewDetailsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const projectId = button.getAttribute("data-project");
      const modal = document.getElementById(`project-modal-${projectId}`);
      if (modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".project-modal");
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  });

  // Close modal when clicking outside
  projectModals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  });
});