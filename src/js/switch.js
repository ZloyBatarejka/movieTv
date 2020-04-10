const switcher = {
  tv: tvOn,
  movie: movieOn,
};

window.addEventListener("load", () => {
  const switches = document.querySelectorAll("[data-switch]");
  const movies = document.querySelectorAll(".movie");
  const tv = document.querySelector(".tv");
  switches.forEach((item) => {
    item.addEventListener("click", () => {
      switches.forEach((item) => {
        item.classList.remove("active");
      });
      item.classList.add("active");
      switcher[item.dataset.switch](tv, movies);
    });
  });
});

function tvOn(tv, movies) {
  toggleMovies(movies, true);
  tv.classList.remove("hide");
  toggleFooter();
}
function movieOn(tv, movies) {
  toggleMovies(movies, false);
  tv.classList.add("hide");
  toggleFooter();
}
function toggleFooter() {
  const footer = document.querySelector("#footer");
  footer.classList.toggle("toBottom");
}
function toggleMovies(arr, flag) {
  if (flag) {
    arr.forEach((item) => {
      item.classList.add("hide");
    });
    return;
  }
  arr.forEach((item) => {
    item.classList.remove("hide");
  });
  return;
}
