// Progress Bar
const progressBar = document.createElement("div");
progressBar.className = "progress-bar";
document.body.appendChild(progressBar);
globalThis.addEventListener("scroll", () => {
  const windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (globalThis.scrollY / windowHeight) * 100;
  progressBar.style.width = `${scrolled}%`;
});

// Floating Contact Button
const floatingContact = document.createElement("button");
floatingContact.className = "floating-contact";
floatingContact.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
    Let's Chat
`;
document.body.appendChild(floatingContact);

floatingContact.addEventListener("click", () => {
  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
});

// Dark Mode Toggle (Fixed - using in-memory storage instead of localStorage)
const darkModeToggle = document.createElement("button");
darkModeToggle.className = "dark-mode-toggle";
darkModeToggle.innerHTML = "🌙";
document.body.appendChild(darkModeToggle);

// Use in-memory variable instead of localStorage
let isDarkMode = false;

// Check if localStorage is available, use it if possible, otherwise use memory
let darkModePreference = "disabled";
try {
  if (typeof Storage !== "undefined" && localStorage) {
    darkModePreference = localStorage.getItem("darkMode") || "disabled";
  }
} catch (e) {
  console.log("localStorage not available, using memory storage");
}

if (darkModePreference === "enabled") {
  document.body.classList.add("dark-mode");
  darkModeToggle.innerHTML = "☀️";
  isDarkMode = true;
}

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  isDarkMode = document.body.classList.contains("dark-mode");

  // Try to save to localStorage if available
  try {
    if (typeof Storage !== "undefined" && localStorage) {
      localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
    }
  } catch (e) {
    console.log(
      "Cannot save to localStorage, preference will be lost on refresh"
    );
  }

  darkModeToggle.innerHTML = isDarkMode ? "☀️" : "🌙";
});

// Typing Effect
const heroText = document.querySelector(".hero-text");
if (heroText) {
  const text = heroText.textContent;
  heroText.textContent = "";
  heroText.classList.add("typing-text");

  let i = 0;
  (function typeWriter() {
    if (i < text.length) {
      heroText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  })();
}

// Scroll Animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }
);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// Mobile Menu
const mobileMenuButton = document.querySelector(".mobile-menu-button");
const mobileMenu = document.createElement("div");
mobileMenu.className =
  "mobile-menu hidden md:hidden fixed inset-0 bg-white z-40 pt-16";
mobileMenu.innerHTML = `
    <div class="px-4 py-2">
        <div class="flex flex-col space-y-4">
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="#faq">FAQ</a>
        </div>
    </div>
`;
document.body.appendChild(mobileMenu);

mobileMenuButton?.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !mobileMenuButton?.contains(e.target)) {
    mobileMenu.classList.add("hidden");
  }
});

// Smooth Scrolling
const offset = 80;
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const id = anchor.getAttribute("href");
    const target = document.querySelector(id);
    if (target) {
      mobileMenu.classList.add("hidden");
      globalThis.scrollTo({
        top: target.offsetTop - offset,
        behavior: "smooth",
      });
    }
  });
});

// Nav Highlight
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a, .mobile-menu a");

globalThis.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (globalThis.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("text-royal-blue");
    link.classList.add("text-gray-800");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.remove("text-gray-800");
      link.classList.add("text-royal-blue");
    }
  });
});

// Contact Form Submission (Fixed with better error handling and fallback)
const form = document.getElementById("booking-form");
if (form) {
  // --- Supabase client setup ---
  const supabaseUrl = 'https://shkugyiuobfastxuqrme.supabase.co/'; // <-- Replace with your Supabase project URL
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoa3VneWl1b2JmYXN0eHVxcm1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NDgwMjAsImV4cCI6MjA2NzAyNDAyMH0.8uOjbg8PFnkJUhcc4p35Gavctarg35WtO1OXrREvdHA'; // <-- Replace with your Supabase anon key
  const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById('booking-name').value;
    const email = document.getElementById('booking-email').value;
    const phone = document.getElementById('booking-phone').value;
    const website_type = document.getElementById('website-type').value;
    const budget = document.getElementById('budget').value;
    const deadline = document.getElementById('deadline').value;
    const details = document.getElementById('details').value;

    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton ? submitButton.textContent : "";
    if (submitButton) {
      submitButton.textContent = "Submitting...";
      submitButton.disabled = true;
    }

    try {
      // Insert booking directly into Supabase
      const { error } = await supabase
        .from('project_bookings')
        .insert([{ name, email, phone, website_type, budget, deadline, details }]);

      if (error) {
        showPrompt("error", error.message || "Submission failed");
      } else {
        showPrompt("success", "Booking submitted successfully!");
        this.reset();
      }
    } catch (err) {
      showPrompt("error", "An error occurred. Please try again later.");
    } finally {
      if (submitButton) {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    }
  });
} else {
  console.error("Booking form with id 'booking-form' not found!");
}

// Scroll-to-top Button
const scrollToTop = document.createElement("button");
scrollToTop.className =
  "fixed bottom-4 right-4 bg-royal-blue text-white p-3 rounded-full shadow-lg opacity-0 transition-opacity duration-300";
scrollToTop.innerHTML = `
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
    </svg>
`;
document.body.appendChild(scrollToTop);

globalThis.addEventListener("scroll", () => {
  scrollToTop.classList.toggle("opacity-0", globalThis.scrollY <= 300);
  scrollToTop.classList.toggle("opacity-100", globalThis.scrollY > 300);
});

scrollToTop.addEventListener("click", () => {
  globalThis.scrollTo({ top: 0, behavior: "smooth" });
});

function showPrompt(type, message) {
  const prompt = document.createElement("div");
  prompt.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 text-white max-w-sm ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  }`;
  prompt.innerHTML = `
    <div class="flex items-center justify-between">
      <p class="mr-2">${message}</p>
      <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-gray-200">×</button>
    </div>
  `;
  document.body.appendChild(prompt);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (prompt.parentElement) {
      prompt.remove();
    }
  }, 5000);
}

// contact form with hCaptcha 
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('syncwell-contact');
  if (contactForm) {
      contactForm.addEventListener('submit', async function(e) {
          e.preventDefault();
          const submitButton = contactForm.querySelector('button[type="submit"]');
          const originalButtonText = submitButton.innerHTML;
          submitButton.innerHTML = '...Processing...';
          submitButton.disabled = true;
          try {
              const formData = new FormData(contactForm);
              const response = await fetch(contactForm.action, {
                  method: 'POST',
                  body: formData
              });
              const result = await response.json();
              if (result.success) {
                  showPrompt('success', 'Form submitted successfully! We will get back to you soon.');
                  contactForm.reset();
              } else {
                  showPrompt('error', result.message || 'Something went wrong. Please try again later.');
              }
          } catch (error) {
              showPrompt('error', 'Something went wrong. Please try again later.');
              console.error('Contact form submission error:', error);
          } finally {
              submitButton.innerHTML = originalButtonText;
              submitButton.disabled = false;
          }
      });
  }
});