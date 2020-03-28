window.onload = function() {
  const fakeRemember = document.querySelector(".remember-fake");
  const remember = this.document.querySelector(".remember-checkbox");
  remember.addEventListener("click", () => {
    if (remember.checked) {
      fakeRemember.innerHTML = "&#10003";
      return;
    }
    fakeRemember.innerHTML = "";
  });
};
