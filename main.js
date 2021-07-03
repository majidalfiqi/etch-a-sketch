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
//'c' for color
//'e' for eraser
//'r' for rainbow colors
//'l' for lighten
//'d' for darken
let pixelSize = pixel.value; //get pixel size from range input
pixelValue.textContent = pixelSize; //set text to the value

//event listeners
//event functions
let colorEvent = (e) => {
  e.target.style.backgroundColor = currentColor;
};
let eraserEvent = (e) => {
  e.target.style.backgroundColor = currentColor;
};
let rainbowEvent = (e) => {
  e.target.style.backgroundColor = `rgb(${randNum(255)}, ${randNum(255)}, ${randNum(255)})`;
};
let lightenEvent = (e) => {
  let bgc = getComputedStyle(e.target).backgroundColor;
  if (bgc.indexOf("rgba") > -1) {
    bgc = RGBToHSL(bgc, true);
    if (bgc[2] !== 0) {
      if (bgc[2] + 10 >= 100) {
        e.target.style.backgroundColor = `hsla(${bgc[0]}, ${bgc[1]}%, 100%, 1)`;
      } else {
        e.target.style.backgroundColor = `hsla(${bgc[0]}, ${bgc[1]}%, ${bgc[2] + 10}%, 1)`;
      }
    }
  } else {
    bgc = RGBToHSL(bgc, false);
    if (bgc[2] !== 0) {
      if (bgc[2] + 10 >= 100) {
        e.target.style.backgroundColor = `hsla(${bgc[0]}, ${bgc[1]}%, 100%)`;
      } else {
        e.target.style.backgroundColor = `hsl(${bgc[0]}, ${bgc[1]}%, ${bgc[2] + 10}%)`;
      }
    }
  }
};
let darkenEvent = (e) => {
  let bgc = getComputedStyle(e.target).backgroundColor;
  if (bgc.indexOf("rgba") > -1) {
    bgc = RGBToHSL(bgc, true);
    if (bgc[2] !== 0) {
      if (bgc[2] - 10 <= 0) {
        e.target.style.backgroundColor = `hsla(${bgc[0]}, ${bgc[1]}%, 0%, 1)`;
      } else {
        e.target.style.backgroundColor = `hsla(${bgc[0]}, ${bgc[1]}%, ${bgc[2] - 10}%, 1)`;
      }
    }
  } else {
    bgc = RGBToHSL(bgc, false);
    if (bgc[2] !== 0) {
      if (bgc[2] - 10 <= 0) {
        e.target.style.backgroundColor = `hsla(${bgc[0]}, ${bgc[1]}%, 0%)`;
      } else {
        e.target.style.backgroundColor = `hsl(${bgc[0]}, ${bgc[1]}%, ${bgc[2] - 10}%)`;
      }
    }
  }
};
//color related buttons
for (let i in options) {
  options[i].addEventListener("click", (e) => {
    if (options[i].classList.contains("color")) {
      currentColor = colorSelector.value;
      Array.from(canvas.children).forEach((child) => {
        switch (colorMode) {
          case "e":
            child.removeEventListener("mouseenter", eraserEvent);
            break;
          case "r":
            child.removeEventListener("mouseenter", rainbowEvent);
            break;
          case "l":
            child.removeEventListener("mouseenter", lightenEvent);
            break;
          case "d":
            child.removeEventListener("mouseenter", darkenEvent);
            break;
          case "c":
          default:
            break;
        }
        child.addEventListener("mouseenter", colorEvent);
      });
      colorMode = "c";
    } else if (options[i].classList.contains("eraser")) {
      currentColor = "transparent";
      Array.from(canvas.children).forEach((child) => {
        switch (colorMode) {
          case "c":
            child.removeEventListener("mouseenter", colorEvent);
            break;
          case "r":
            child.removeEventListener("mouseenter", rainbowEvent);
            break;
          case "l":
            child.removeEventListener("mouseenter", lightenEvent);
            break;
          case "d":
            child.removeEventListener("mouseenter", darkenEvent);
            break;
          case "e":
          default:
            break;
        }
        child.addEventListener("mouseenter", eraserEvent);
      });
      colorMode = "e";
    } else if (options[i].classList.contains("rainbow")) {
      Array.from(canvas.children).forEach((child) => {
        switch (colorMode) {
          case "c":
            child.removeEventListener("mouseenter", colorEvent);
            break;
          case "e":
            child.removeEventListener("mouseenter", eraserEvent);
            break;
          case "l":
            child.removeEventListener("mouseenter", lightenEvent);
            break;
          case "d":
            child.removeEventListener("mouseenter", darkenEvent);
            break;
          case "r":
          default:
            break;
        }
        child.addEventListener("mouseenter", rainbowEvent);
      });
      colorMode = "r";
    } else if (options[i].classList.contains("lighten")) {
      Array.from(canvas.children).forEach((child) => {
        switch (colorMode) {
          case "c":
            child.removeEventListener("mouseenter", colorEvent);
            break;
          case "e":
            child.removeEventListener("mouseenter", eraserEvent);
            break;
          case "r":
            child.removeEventListener("mouseenter", rainbowEvent);
            break;
          case "d":
            child.removeEventListener("mouseenter", darkenEvent);
            break;
          case "l":
          default:
            break;
        }
        child.addEventListener("mouseenter", lightenEvent);
      });
      colorMode = "l";
    } else if (options[i].classList.contains("darken")) {
      Array.from(canvas.children).forEach((child) => {
        switch (colorMode) {
          case "c":
            child.removeEventListener("mouseenter", colorEvent);
            break;
          case "e":
            child.removeEventListener("mouseenter", eraserEvent);
            break;
          case "r":
            child.removeEventListener("mouseenter", rainbowEvent);
            break;
          case "l":
            child.removeEventListener("mouseenter", lightenEvent);
            break;
          case "d":
          default:
            break;
        }
        child.addEventListener("mouseenter", darkenEvent);
      });
      colorMode = "d";
    }

    options[i].classList.add("pressed");
    for (let j in options) {
      if (!(options[i] === options[j])) options[j].classList.remove("pressed");
    }
  });
}

//color change
colorSelector.addEventListener("change", () => (currentColor = colorSelector.value));

//clear
clear.addEventListener("mousedown", () => clear.classList.add("pressed"));
clear.addEventListener("mouseup", () => {
  clear.classList.remove("pressed");
  Array.from(canvas.children).forEach((child) => {
    child.style.backgroundColor = "transparent";
  });
});

//dark mode
darkmode.addEventListener("click", () => {
  darkmode.classList.toggle("pressed");
  app.classList.toggle("dark-on");
});

//pixel size range
pixel.addEventListener("input", () => {
  pixelSize = pixel.value;
  pixelValue.textContent = pixelSize;
});
pixel.addEventListener("change", () => generateGrid());

//icons for external links
github.addEventListener("mousedown", () => github.classList.add("pressed"));
github.addEventListener("mouseup", () => github.classList.remove("pressed"));
mano.addEventListener("mousedown", () => mano.classList.add("pressed"));
mano.addEventListener("mouseup", () => mano.classList.remove("pressed"));

//logic
function generateGrid() {
  canvas.innerHTML = "";
  let rows = Math.floor(770 / pixelSize);
  let columns = Math.floor(1350 / pixelSize);
  let count = rows * columns;
  canvas.style.gridTemplateColumns = `repeat(${columns}, ${pixelSize}px)`;
  canvas.style.gridTemplateRows = `repeat(${rows}, ${pixelSize}px)`;
  for (count; count > 0; count--) {
    let div = document.createElement("div");
    canvas.appendChild(div);
    switch (colorMode) {
      case "c":
        color.click();
        break;
      case "e":
        eraser.click();
        break;
      case "r":
        rainbow.click();
        break;
      case "l":
        lighten.click();
        break;
      case "d":
        darken.click();
        break;
    }
  }
}

function randNum(num) {
  return Math.floor(Math.random() * num);
}

// from Jon Kantner's article
// https://css-tricks.com/converting-color-spaces-in-javascript/
function RGBToHSL(rgba, isRGBA) {
  let r, g, b, a;
  if (isRGBA) {
    let sep = rgba.indexOf(",") > -1 ? "," : " ";
    rgba = rgba.substr(5).split(")")[0].split(sep);

    // Strip the slash if using space-separated syntax
    if (rgba.indexOf("/") > -1) rgba.splice(3, 1);

    for (let R in rgba) {
      let r = rgba[R];
      if (r.indexOf("%") > -1) {
        let p = r.substr(0, r.length - 1) / 100;

        if (R < 3) {
          rgba[R] = Math.round(p * 255);
        } else {
          rgba[R] = p;
        }
      }
    }

    // Make r, g, and b fractions of 1
    r = rgba[0] / 255;
    g = rgba[1] / 255;
    b = rgba[2] / 255;
    a = rgba[3];
  } else {
    let sep = rgba.indexOf(",") > -1 ? "," : " ";
    rgba = rgba.substr(4).split(")")[0].split(sep);

    for (let R in rgba) {
      let r = rgba[R];
      if (r.indexOf("%") > -1) rgba[R] = Math.round((r.substr(0, r.length - 1) / 100) * 255);
    }

    // Make r, g, and b fractions of 1
    r = rgba[0] / 255;
    g = rgba[1] / 255;
    b = rgba[2] / 255;
  }

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  if (isRGBA) {
    return [h, s, l, parseFloat(a)];
  } else {
    return [h, s, l];
  }
}

generateGrid();
