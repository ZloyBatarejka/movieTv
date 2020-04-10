import { modalToggler } from "./modal";

window.addEventListener("load", () => {
  render();
});

function render() {
  const loginBtn = document.querySelector("#enter");
  const login = document.querySelector("#input-login");
  const password = document.querySelector("#input-password");
  const logOut = document.querySelector("#logout");
  loginBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (auth(login, password)) {
      renderHeader();
    }
  });
  logOut.addEventListener("click", () => {
    localStorage.setItem("token", false);
    renderHeader();
  });
}

function auth(login, password) {
  if (validateUsername(login)) {
    if (validatePasswrod(password)) {
      localStorage.setItem("token", true);
      modalToggler();
      return true;
    }
  }
}
function validateUsername(login) {
  if (login.value !== "qwerty") {
    addWrong(login);
    return false;
  }
  removeWrong(login);
  return true;
}
function validatePasswrod(password) {
  if (+password.value !== 123456) {
    addWrong(password);
    return false;
  }
  removeWrong(password);
  return true;
}

export function renderHeader() {
  const token = JSON.parse(localStorage.getItem("token") || "false");
  const user = document.querySelector(".user");
  const guest = document.querySelector(".guest");
  if (token) {
    renderUser();
    show(user);
    hide(guest);
  } else {
    hide(user);
    show(guest);
  }
}
function renderUser() {
  const username = document.querySelector("#username");
  const changeInput = document.querySelector("#username-change");
  let changing = false;
  const name = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : "qwerty";
  username.textContent = name;
  username.addEventListener("click", startChange);

  function hideInput(event) {
    const username = document.querySelector("#username");
    const changeInput = document.querySelector("#username-change");
    if (!event.target.dataset.change) {
      if (changing) {
        show(username);
        hide(changeInput);
        localStorage.setItem("user", changeInput.value);
        changing = false;
        renderUser();
        window.removeEventListener("click", hideInput);
      }
    }
  }

  function startChange(event) {
    username.removeEventListener("click", startChange);
    event.stopPropagation();
    hide(username);
    changeInput.value = name;
    show(changeInput);
    changing = true;
    window.addEventListener("click", hideInput);
  }
}

function hide(element) {
  element.classList.add("hide");
}
function show(element) {
  element.classList.remove("hide");
}
function addWrong(element) {
  element.classList.add("wrong");
}
function removeWrong(element) {
  element.classList.remove("wrong");
}
