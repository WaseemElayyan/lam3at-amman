/**
 * إعدادات سهلة التعديل: غيّر الرقم والخدمات والأسعار والمناطق من هنا فقط.
 * رقم واتساب التالي تجريبي للعرض فقط وليس رقماً فعلياً للمشروع.
 */
const CONFIG = {
  whatsappNumber: "96279999999", // ضع رقمك الفعلي هنا
  city: "عمّان، الأردن",
  hours: "من 9 صباحًا حتى 11 مساءً",
  areas: ["الجبيهة", "خلدا", "تلاع العلي", "الصويفية"],
  services: [
    {
      id: "exterior",
      name: "غسيل خارجي",
      price: "5.00 دنانير",
      description: "غسيل خارجي سريع للهيكل والزجاج والإطارات، يعيد لمعان السيارة في موقعك.",
      image: "images/service-exterior.jpg",
      alt: "غسيل خارجي لسيارة لامعة بضغط الماء",
    },
    {
      id: "inside-out",
      name: "غسيل داخلي وخارجي",
      price: "10.00 دنانير",
      description: "تنظيف المقصورة مع الغسيل الخارجي: مقاعد، لوحة القيادة، سجاد، وهيكل لامع.",
      image: "images/service-interior.jpg",
      alt: "تنظيف داخلي احترافي لمقصورة السيارة",
    },
    {
      id: "full",
      name: "تنظيف شامل",
      price: "20.00 دينارًا",
      description: "عناية كاملة من الداخل والخارج مع اهتمام بالتفاصيل للحصول على مظهر كأنها جديدة.",
      image: "images/service-full.jpg",
      alt: "تنظيف شامل لسيارة لامعة بعد العناية الكاملة",
    },
  ],
};

function buildWhatsAppUrl(serviceName) {
  const message = `مرحباً، أرغب بالحجز من لمعة عمّان. الخدمة المطلوبة: ${serviceName}`;
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function renderServices() {
  const wrap = document.getElementById("service-cards");
  if (!wrap) return;

  wrap.innerHTML = CONFIG.services
    .map(
      (service) => `
      <article class="card">
        <img src="${service.image}" alt="${service.alt}" width="640" height="480" />
        <div class="card-body">
          <h3>${service.name}</h3>
          <p class="price">${service.price}</p>
          <p>${service.description}</p>
          <a class="btn btn-ghost" href="${buildWhatsAppUrl(service.name)}" target="_blank" rel="noopener noreferrer">
            احجز ${service.name}
          </a>
        </div>
      </article>
    `
    )
    .join("");
}

function renderAreas() {
  const list = document.getElementById("area-list");
  if (!list) return;
  list.innerHTML = CONFIG.areas.map((area) => `<li>${area}</li>`).join("");
}

function wireWhatsAppButtons() {
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    const service = link.getAttribute("data-service") || "حجز عام";
    link.href = buildWhatsAppUrl(service);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

function showWhatsAppNumber() {
  const el = document.getElementById("whatsapp-display");
  if (el) {
    el.textContent = `+${CONFIG.whatsappNumber} — رقم تجريبي للعرض فقط`;
  }
}

function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "إغلاق قائمة التنقل" : "فتح قائمة التنقل");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "فتح قائمة التنقل");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderServices();
  renderAreas();
  wireWhatsAppButtons();
  showWhatsAppNumber();
  setupNav();
});
