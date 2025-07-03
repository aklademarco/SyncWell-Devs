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

// Dark Mode Toggle
const darkModeToggle = document.createElement("button");
darkModeToggle.className = "dark-mode-toggle";
darkModeToggle.innerHTML = "🌙";
document.body.appendChild(darkModeToggle);

if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  darkModeToggle.innerHTML = "☀️";
}

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const enabled = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", enabled ? "enabled" : "disabled");
  darkModeToggle.innerHTML = enabled ? "☀️" : "🌙";
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

// Contact Form Submission
const form = document.getElementById("booking-form");
if (form) {
  console.log("Booking form found and event listener attached");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log("Form submitted");

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    console.log("Form data:", data);

    try {
      console.log("Sending request to Supabase function...");
      const res = await fetch(
        "https://shkugyiuobfastxuqrme.functions.supabase.co/submit-booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoa3VneWl1b2JmYXN0eHVxcm1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NDgwMjAsImV4cCI6MjA2NzAyNDAyMH0.8uOjbg8PFnkJUhcc4p35Gavctarg35WtO1OXrREvdHA" 
          },
          body: JSON.stringify(data),
        }
      );
      

      console.log("Response status:", res.status);
      const result = await res.json();
      console.log("Response result:", result);

      if (res.ok) {
        showPrompt("success", "Booking submitted successfully!");
        this.reset();
      } else {
        showPrompt("error", result.error || "Submission failed");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      showPrompt("error", err.message || "Network error");
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
  prompt.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 text-white ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  }`;
  prompt.innerHTML = `<p>${message}</p>`;
  document.body.appendChild(prompt);
  setTimeout(() => {
    prompt.remove();
  }, 5000);
}
