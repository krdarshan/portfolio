// ===== THEME MANAGEMENT =====
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem("theme") || "dark"
    this.init()
  }

  init() {
    this.setTheme(this.theme)
    this.bindEvents()
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
    this.theme = theme
    this.updateThemeIcon()
  }

  toggleTheme() {
    const newTheme = this.theme === "dark" ? "light" : "dark"
    this.setTheme(newTheme)
  }

  updateThemeIcon() {
    const icon = document.querySelector("#themeToggle i")
    if (icon) {
      icon.className = this.theme === "dark" ? "fas fa-sun" : "fas fa-moon"
    }
  }

  bindEvents() {
    const themeToggle = document.getElementById("themeToggle")
    if (themeToggle) {
      themeToggle.addEventListener("click", () => this.toggleTheme())
    }
  }
}

// ===== NAVIGATION =====
class Navigation {
  constructor() {
    this.init()
  }

  init() {
    this.bindEvents()
    this.setActiveLink()
  }

  bindEvents() {
    // Mobile menu toggle
    const hamburger = document.getElementById("hamburger")
    const navbar = document.getElementById("navbar")

    if (hamburger && navbar) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        navbar.classList.toggle("active")
      })
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href")
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }

        // Close mobile menu
        if (navbar && navbar.classList.contains("active")) {
          navbar.classList.remove("active")
          hamburger.classList.remove("active")
        }
      })
    })

    // Update active link on scroll
    window.addEventListener("scroll", () => this.setActiveLink())
  }

  setActiveLink() {
    const sections = document.querySelectorAll(".section, .hero")
    const navLinks = document.querySelectorAll(".nav-link")

    let currentSection = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active")
      }
    })
  }
}

// ===== PROJECT FILTERING =====
class ProjectFilter {
  constructor() {
    this.init()
  }

  init() {
    this.bindEvents()
  }

  bindEvents() {
    const filterBtns = document.querySelectorAll(".filter-btn")
    const projectCards = document.querySelectorAll(".project-card")

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter")

        // Update active button
        filterBtns.forEach((b) => b.classList.remove("active"))
        btn.classList.add("active")

        // Filter projects
        projectCards.forEach((card) => {
          const categories = card.getAttribute("data-category")

          if (filter === "all" || categories.includes(filter)) {
            card.style.display = "block"
          } else {
            card.style.display = "none"
          }
        })
      })
    })
  }
}

// ===== FORM HANDLING =====
class FormHandler {
  constructor() {
    this.init()
  }

  init() {
    this.bindEvents()
  }

  bindEvents() {
    const contactForm = document.getElementById("contactForm")

    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        this.handleSubmit(e)
      })
    }
  }

  handleSubmit(e) {
    const submitBtn = e.target.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent

    submitBtn.textContent = "Sending..."
    submitBtn.disabled = true

    // Reset after form submission
    setTimeout(() => {
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }, 2000)
  }
}

// ===== SCROLL EFFECTS =====
class ScrollEffects {
  constructor() {
    this.init()
  }

  init() {
    this.bindScrollEvents()
  }

  bindScrollEvents() {
    window.addEventListener("scroll", () => {
      this.handleScroll()
    })
  }

  handleScroll() {
    const scrollY = window.scrollY
    const backToTop = document.getElementById("backToTop")

    // Back to top button
    if (backToTop) {
      if (scrollY > 500) {
        backToTop.classList.add("show")
      } else {
        backToTop.classList.remove("show")
      }
    }
  }
}

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  new ThemeManager()
  new Navigation()
  new ProjectFilter()
  new FormHandler()
  new ScrollEffects()

  // Back to top button
  const backToTop = document.getElementById("backToTop")
  if (backToTop) {
    backToTop.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const navbar = document.getElementById("navbar")
      const hamburger = document.getElementById("hamburger")

      if (navbar && navbar.classList.contains("active")) {
        navbar.classList.remove("active")
        hamburger.classList.remove("active")
      }
    }
  })
})
