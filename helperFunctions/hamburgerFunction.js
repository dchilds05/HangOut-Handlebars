
function hamburgerFunction() {
    var x = document.getElementById("hiddenSideNav");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  module.exports = hamburgerFunction;
  