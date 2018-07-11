let navbar = document.querySelector("#nav-bar");
let collapse = document.querySelector("#collapse");

collapse.addEventListener("click", function collapseHeader() {
  navbar.classList.toggle("hide");
  collapse.classList.toggle("fa-plus");
  collapse.classList.toggle("fa-minus-square");
});
