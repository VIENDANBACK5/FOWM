const tl = gsap.timeline({
  paused: true
});

let path = document.querySelector("path");
let spanBefore = document.querySelector("#hamburger .line-2");

// Cài đặt ban đầu
gsap.set(spanBefore, { background: "#000" });
gsap.set(".menu", { visibility: "hidden" });

// Hàm hiển thị menu
function revealMenu() {
  revealMenuItems();

  const hamburger = document.getElementById("hamburger");
  const toggleBtn = document.getElementById("toggle-btn");

  toggleBtn.onclick = () => {
    hamburger.classList.toggle("active");
    tl.reversed(!tl.reversed());
  };
}
revealMenu();

function revealMenuItems() {
  const start = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
  const end = "M0, 1005S175, 995, 500, 995s500, 5, 500, 5V0H0Z";

  const power2 = "power2.inout";
  const power4 = "power4.inout";

  tl.to("#hamburger", 1.25, {
    marginTop: "-5px",
    x: -40,
    y: 40,
    ease: power4
  });
  tl.to(
    "#hamburger .line",
    1,
    {
      background: "#fff",
      ease: power2
    },
    "<"
  );
  tl.to(
    spanBefore,
    1,
    {
      background: "#fff",
      ease: power2
    },
    "<"
  );

  tl.to(
    ".btn .btn-outline",
    1.25,
    {
      x: -40,
      y: 40,
      width: "140px",
      height: "140px",
      border: "1px solid #e2e2dc",
      ease: power4
    },
    "<"
  );
  tl.to(
    path,
    0.8,
    {
      attr: { d: start },
      ease: power2
    },
    "<"
  ).to(
    path,
    0.8,
    {
      attr: { d: end },
      ease: power2
    },
    "-=0.5"
  );

  tl.to(
    ".menu",
    1,
    {
      visibility: "visible"
    },
    "-=0.5"
  );

  tl.to(
    ".menu-item>a",
    1,
    {
      top: 0,
      ease: "power3.out",
      stagger: {
        amount: 0.5
      }
    },
    "-=1"
  ).reverse();
}

const toggleBtn = document.getElementById("toggle-btn");
const hamburger = document.getElementById("hamburger");
const menu = document.querySelector(".menu");

toggleBtn.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menu.classList.toggle("open");
});
