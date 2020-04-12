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

export function renderHeader() {
  const token = JSON.parse(localStorage.getItem("token") || "false");
  const user = document.querySelector(".user");
  const guest = document.querySelector(".guest");
  if (token) {
    renderUser();
    changeStatus(user, "show");
    changeStatus(guest, "hide");
  } else {
    changeStatus(user, "hide");
    changeStatus(guest, "show");
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
        changeStatus(username, "show");
        changeStatus(changeInput, "hide");
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
    changeStatus(username, "hide");
    changeInput.value = name;
    changeStatus(changeInput, "show");
    changing = true;
    window.addEventListener("click", hideInput);
  }
}
function validateUsername(login) {
  if (login.value !== "qwerty") {
    changeStatus(login, "addWrong");
    return false;
  }
  changeStatus(login, "removeWrong");
  return true;
}
function validatePasswrod(password) {
  if (+password.value !== 123456) {
    changeStatus(password, "addWrong");
    return false;
  }
  changeStatus(password, "removeWrong");
  return true;
}

function changeStatus(element, type) {
  switch (type) {
    case "hide":
      return element.classList.add("hide");
    case "show":
      return element.classList.remove("hide");
    case "addWrong":
      return element.classList.add("wrong");
    case "removeWrong":
      return element.classList.remove("wrong");
    default:
      return element;
  }
}
