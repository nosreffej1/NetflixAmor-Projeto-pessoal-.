document.addEventListener("DOMContentLoaded", () => {
  const profileScreen = document.getElementById("profile-screen");
  const homeScreen = document.getElementById("home-screen");
  const profileButton = document.getElementById("profile-button");

  const modal = document.getElementById("moment-modal");
  const modalCover = document.getElementById("modal-cover");
  const modalTitle = document.getElementById("modal-title");
  const modalTag = document.getElementById("modal-tag");
  const modalDescription = document.getElementById("modal-description");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  const momentCards = document.querySelectorAll(".moment-card");

  /* 1. TRANSIÇÃO TELA DE PERFIL -> HOME */
  profileButton.addEventListener("click", () => {
    // animação de zoom no perfil
    profileButton.classList.add("profile-card--zoom-out");
    profileScreen.classList.add("screen--fade-out");

    // depois de 700ms, esconde tela de perfil e mostra a home
    setTimeout(() => {
      profileScreen.classList.remove("screen--active");
      profileScreen.classList.add("screen--hidden");

      homeScreen.classList.remove("screen--hidden");
      homeScreen.classList.add("screen--active");

      // scroll para o topo da home
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 700);
  });

  /* 2. ABRIR MODAL AO CLICAR NUM MOMENTO */
  momentCards.forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.dataset.title;
      const tag = card.dataset.tag;
      const short = card.dataset.short;
      const img = card.querySelector("img").src;

      modalCover.src = img;
      modalTitle.textContent = title || "Momento especial";
      modalTag.textContent = tag || "";
      modalDescription.textContent =
        short ||
        "Um pedacinho da nossa história que eu amo lembrar todos os dias.";

      openModal();
    });
  });

  function openModal() {
    modal.classList.remove("modal--hidden");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.classList.add("modal--hidden");
    modal.setAttribute("aria-hidden", "true");
  }

  modalCloseBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal-backdrop")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("modal--hidden")) {
      closeModal();
    }
  });
});
