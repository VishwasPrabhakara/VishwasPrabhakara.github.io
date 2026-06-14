const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".project-card");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((button) => button.classList.remove("active"));
    filter.classList.add("active");
    const selected = filter.dataset.filter;

    cards.forEach((card) => {
      const tags = card.dataset.tags.split(" ");
      card.hidden = selected !== "all" && !tags.includes(selected);
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const glow = document.querySelector(".cursor-glow");
if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
}
