// This is a single-line JavaScript comment

/*
This is a
multi-line
JavaScript comment
*/

function flipFunction() {
    var testtextElement = document.getElementById("testtext");
    var testpicElement = document.getElementById("testpic");
  
    if (testtextElement.innerHTML === "Phase 1") {
      testtextElement.innerHTML = "Phase 2";
      testpicElement.src = "https://raw.githubusercontent.com/Timmy1404/Timmy1404.github.io/main/docs/assets/img/red.png";
    } else {
      testtextElement.innerHTML = "Phase 1";
      testpicElement.src = "https://raw.githubusercontent.com/Timmy1404/Timmy1404.github.io/main/docs/assets/img/green.png";
    }
  }
