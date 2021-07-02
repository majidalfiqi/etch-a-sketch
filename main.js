import "./style.css";
import "./reset.css";

//query selectors
const app = document.querySelector(".app");
const color = document.querySelector(".color");
const colorSelector = document.querySelector("#color");
const rainbow = document.querySelector(".rainbow");
const lighten = document.querySelector(".lighten");
const darken = document.querySelector(".darken");
const eraser = document.querySelector(".eraser");
const clear = document.querySelector(".clear");
const darkmode = document.querySelector(".darkmode");
const pixel = document.querySelector("#pixel");
const pixelValue = document.querySelector(".pixel span");
const mano = document.querySelector(".mano");
const github = document.querySelector(".github");
const canvas = document.querySelector(".canvas");

//initializations
const options = [color, rainbow, lighten, darken, eraser]; //only one should be selected at a time
let currentColor = colorSelector.value; //drawing color
let colorMode = "c";
//'c' for color and eraser color set to bg color
//'r' for rainbow colors
//'l' for lighten
//'d' for darken
let pixelSize = pixel.value; //get pixel size from range input
pixelValue.textContent = pixelSize; //set text to the value

//event listeners
//color related buttons
for (let i in options) {
  options[i].addEventListener("click", (e) => {
    if (options[i].classList.contains("color")) {
      colorMode = "c";
      currentColor = colorSelector.value;
    } else if (options[i].classList.contains("eraser")) {
      colorMode = "c";
      currentColor = getComputedStyle(canvas).backgroundColor;
    } else if (options[i].classList.contains("rainbow")) colorMode = "r";
    else if (options[i].classList.contains("lighten")) colorMode = "l";
    else if (options[i].classList.contains("darken")) colorMode = "d";

    options[i].classList.add("pressed");
    for (let j in options) {
      if (!(options[i] === options[j])) options[j].classList.remove("pressed");
    }
  });
}
colorSelector.addEventListener("change", () => (currentColor = colorSelector.value));

//clear
clear.addEventListener("mousedown", () => clear.classList.add("pressed"));
clear.addEventListener("mouseup", () => {
  clear.classList.remove("pressed");
});

//dark mode
darkmode.addEventListener("mousedown", () => darkmode.classList.add("pressed"));
darkmode.addEventListener("mouseup", () => {
  darkmode.classList.remove("pressed");
  app.classList.toggle("dark-on");
});

//pixel size range
pixel.addEventListener("input", () => {
  pixelSize = pixel.value;
  pixelValue.textContent = pixelSize;
});

//icons for external links
github.addEventListener("mousedown", () => github.classList.add("pressed"));
github.addEventListener("mouseup", () => github.classList.remove("pressed"));
mano.addEventListener("mousedown", () => mano.classList.add("pressed"));
mano.addEventListener("mouseup", () => mano.classList.remove("pressed"));

//logic
