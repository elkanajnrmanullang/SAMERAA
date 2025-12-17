gsap.registerPlugin(ScrollTrigger);

function initSameraAnimations() {
  const isAboutPage = document.body.classList.contains("about-page-body");

  if (isAboutPage) {
    gsap.to("#heroText", {
      opacity: 1,
      x: 0,
      duration: 1.2,
      ease: "power4.out",
    });

    gsap.to("#heroImg", {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "power2.out",
      delay: 0.3,
    });

    gsap.to("#heroImg img", {
      scrollTrigger: {
        trigger: ".hero-split",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: 100,
    });

    document.querySelectorAll(".reveal").forEach((el) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      });
    });
  } else {
    if (document.querySelector("#bg-layer")) {
      gsap.to("#bg-layer", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    gsap.from("#hero-title", {
      opacity: 0,
      y: 80,
      duration: 1.5,
      ease: "power3.out",
    });

    gsap.fromTo(
      "#logo-badge",
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        delay: 0.5,
        ease: "back.out(1.7)",
        clearProps: "all",
      }
    );

    const orbitItems = document.querySelectorAll(".orbit-item");
    if (orbitItems.length > 0) {
      const radius =
        window.innerWidth > 1024 ? 410 : window.innerWidth > 768 ? 340 : 190;

      orbitItems.forEach((item, index) => {
        const angle = (index / orbitItems.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        gsap.set(item, { x: x, y: y });
      });

      gsap.to("#orbit-wrapper", {
        rotation: 360,
        duration: 50,
        repeat: -1,
        ease: "none",
        onUpdate: function () {
          const currentRot = gsap.getProperty("#orbit-wrapper", "rotation");
          gsap.set(".orbit-item", { rotation: -currentRot });
        },
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      observer.observe(el);
    });
  }
}

// Inisialisasi saat DOM sepenuhnya dimuat
document.addEventListener("DOMContentLoaded", initSameraAnimations);
