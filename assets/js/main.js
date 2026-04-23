// Shared JS (all pages)
document.addEventListener("DOMContentLoaded", () => {
  // Set year in footer (if present)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Highlight active nav link based on current page file name
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(a => {
    const target = a.getAttribute("href");
    if (!target) return;
    const normalized = target.replace("./", "");
    if (normalized === path) a.classList.add("active");
  });

  // Contact form: mailto (works on GitHub Pages without backend)
  const form = document.getElementById("contactForm");
  if (!form) return;

  const successMsg = document.getElementById("successMsg");
  const errorMsg = document.getElementById("errorMsg");

  // TODO: change to your real mailbox:
  const TO_EMAIL = "info@unboxedadvisory.nl";
  const SUBJECT_PREFIX = "Website contact";

  const show = (el) => { if (el) el.style.display = "block"; };
  const hide = (el) => { if (el) el.style.display = "none"; };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    hide(successMsg); hide(errorMsg);

    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    if (!name || !email || !message || !email.includes("@")) {
      show(errorMsg);
      return;
    }

    const subject = `${SUBJECT_PREFIX}: ${name}`;
    const body =
`Naam: ${name}
E-mail: ${email}

Bericht:
${message}
`;

    const mailto = `mailto:${encodeURIComponent(TO_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    try {
      window.location.href = mailto;
      show(successMsg);
      form.reset();
    } catch (err) {
      show(errorMsg);
    }
  });
});
