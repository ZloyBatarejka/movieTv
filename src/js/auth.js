window.addEventListener("load", render);
function render() {
  const loginBtn = document.querySelector("#enter");
  const login = document.querySelector("#input-login");
  const password = document.querySelector("#input-password");
  const logOut = document.querySelector("#logout");
  loginBtn.addEventListener("click", () => {
    if (auth(login, password)) {
      loginBtn.dataset.dismiss = "modal";
      renderHeader();
    }
  });
  logOut.addEventListener("click", event => {
    localStorage.setItem("token", false);
    renderHeader();
  });
}

function auth(login, password) {
  let passValidate = +password.value === 123456;
  let loginValidate = login.value === "qwerty";
  if (!loginValidate) {
    login.classList.add("wrong");
    login.value = "";
    return false;
  }
  if (loginValidate && !passValidate) {
    password.classList.add("wrong");
    password.value = "";
    return false;
  }
  localStorage.setItem("token", true);
  return true;
}

export function renderHeader() {
  const token = JSON.parse(localStorage.getItem("token") || "false");
  if (token) {
    renderUser();
    document.querySelector(".user").classList.remove("hide");
    document.querySelector(".guest").classList.add("hide");
  } else {
    document.querySelector(".user").classList.add("hide");
    document.querySelector(".guest").classList.remove("hide");
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
    window.removeEventListener("click", hideInput);
    const username = document.querySelector("#username");
    const changeInput = document.querySelector("#username-change");
    if (!event.target.dataset.change) {
      if (changing) {
        username.classList.remove("hide");
        changeInput.classList.add("hide");
        localStorage.setItem("user", changeInput.value);
        changing = false;
        renderUser();
      }
    }
  }
  function startChange(event) {
    username.removeEventListener("click", startChange);
    console.log("u");
    event.stopPropagation();
    username.classList.add("hide");
    changeInput.value = name;
    changeInput.classList.remove("hide");
    changing = true;
    window.addEventListener("click", hideInput);
  }
}
