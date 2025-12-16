gsap.registerPlugin(ScrollTrigger);

// --- 1. Animasi Parallax Hero Section (Homepage) ---
function initParallax() {
  // Animasi Parallax Latar Belakang (bergerak lambat)
  gsap.to("#bg-layer", {
    y: -200,
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
    },
  });

  // Animasi Ilustrasi Produk (bergerak sedikit lebih cepat)
  gsap.to("#product-illustration", {
    y: -350,
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });

  // Animasi teks saat masuk halaman
  gsap.from(".animate-fade-in-up", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out",
  });
}

// --- 2. Animasi Scroll Umum (Fade In & Scale In) ---
function initScrollAnimations() {
  // Fade In & Slide Up
  document.querySelectorAll(".trigger-fade-in").forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // Animasi Scale In (untuk Tombol/CTA)
  document.querySelectorAll(".trigger-scale-in").forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      scale: 0.2,
      duration: 1,
      ease: "elastic.out(1, 0.5)",
      scrollTrigger: {
        trigger: element,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
  });
}

// --- 3. Animasi Pinning & Step-by-Step (About Page) ---
function initAboutPinAnimation() {
  if (document.getElementById("hidrogel-intro")) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hidrogel-intro",
        pin: true,
        start: "top top",
        end: "+=300%",
        scrub: 1,
      },
    });

    tl.to("#intro-box", { opacity: 1, duration: 1 })
      .to("#definition", { opacity: 1, y: 0, duration: 1 })
      .to("#function", { opacity: 1, y: 0, duration: 1 }, "-=0.5");

    // Animasi step-by-step untuk Keunggulan (Section advantages)
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#advantages",
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      })
      .to("#adv-1", {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      })
      .to(
        "#adv-2",
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.4"
      )
      .to(
        "#adv-3",
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.4"
      );
  }
}

// --- 4. Animasi Parallax Ilustrasi (Content Page) ---
function initContentParallax() {
  document
    .querySelectorAll(".trigger-parallax-illustration")
    .forEach((element) => {
      const speed = parseFloat(element.dataset.speed) || 0;

      gsap.to(element, {
        y: speed,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    });
}

// --- 5. Animasi Slide Masuk Khusus (Content Page) ---
function initSpecificScrollAnimations() {
  // Slide dari Kanan
  document.querySelectorAll(".trigger-fade-in-right").forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      x: 100,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });
  // Slide dari Kiri
  document.querySelectorAll(".trigger-fade-in-left").forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      x: -100,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });
  // Slide dari Atas
  document.querySelectorAll(".trigger-slide-in-top").forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  });
}

// --- 6. Transisi Antar Halaman (Konsep) ---
// Catatan: Ini hanya mengaplikasikan animasi pada halaman 'keluar' (main content)
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    if (this.getAttribute("href").endsWith(".html")) {
      e.preventDefault();
      const destination = this.href;

      gsap.to("main", {
        y: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          window.location.href = destination;
        },
      });
    }
  });
});

// --- Panggil semua fungsi animasi saat dokumen siap ---
document.addEventListener("DOMContentLoaded", function () {
  initParallax();
  initScrollAnimations();
  initSpecificScrollAnimations();
  initContentParallax();
  initAboutPinAnimation();
});
