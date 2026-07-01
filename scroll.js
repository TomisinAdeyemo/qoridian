document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(`
    section,
    .hero-content,
    .site-header,
    .footer-cta-block,
    .section-container,
    .meta-text
  `);
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px"
    }
  );

  animatedElements.forEach((el, index) => {
    el.classList.add("scroll-reveal");

    // stagger effect
    el.style.transitionDelay = `${index * 80}ms`;

    observer.observe(el);
  });
});
