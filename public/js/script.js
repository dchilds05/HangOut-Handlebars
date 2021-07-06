document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("hangout JS imported successfully!");
  },
  false
);

var burgerButton = document.getElementById("clickBurger");
var sideBar = document.getElementById("hiddenNav");
burgerButton.addEventListener("click", () => {
    console.log("clicked burger");
    if (sideBar.style.display === "block") {
      sideBar.style.display = "none";
    } else {
    sideBar.style.display = "block";
    }
})