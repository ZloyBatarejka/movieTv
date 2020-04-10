const login = document.querySelector("#login");
const overlay = document.querySelector(".overlay");

login.addEventListener("click", modalToggler);
overlay.addEventListener("click", overlayListener);

export function modalToggler() {
  const modal = document.querySelector(".modal");
  modal.classList.toggle("hide");
  document.body.classList.toggle("height");
}

function overlayListener(event) {
  if (event.target.dataset.exit) {
    modalToggler();
  }
}
