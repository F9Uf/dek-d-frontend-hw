var sliderItem = document.getElementById("slider-item");
var sliderFooter = document.getElementById("slider-footer");
var prevTab = document.getElementById("prev");

var N = 5
var current = 1;

// initial create dom from data images
for (let i = 0; i < N; i++) {
  var imgSrc = `./images/image${i+1}.jpg`;
  var newNode = document.createElement("img");
  newNode.src = imgSrc;
  newNode.draggable = true;
  sliderItem.appendChild(newNode)

  var newDot = document.createElement("div");
  newDot.classList.add("dot")
  newDot.addEventListener("click", () => {
    return toggle(i+1)
  });
  sliderFooter.appendChild(newDot);
}

// init first dot is actived
sliderFooter.childNodes[current].classList.add("active");

// toggle to change slide from `index` parameter 
function toggle (index) {
  if (index > N ) index = 1;
  if (index < 1) index = N;
  var imageWidth = sliderItem.childNodes[index-1].width;
  
  // slide to next image
  sliderItem.style.transform = `translateX(-${(imageWidth + 20) * (index - 1)}px)`;
  current = index;
  // change dot active
  for(let j = 1; j <= N; j++) {
    if (j === current) {
      sliderFooter.childNodes[current].classList.add("active");
    } else {
      sliderFooter.childNodes[j].classList.remove("active");
    }
  }
  return true;
}

// handle resize window for beautiful responsive
window.onresize = _ => toggle(current);