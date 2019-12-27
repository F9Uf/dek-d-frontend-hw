var sliderItem = document.getElementById("slider-item");
var sliderFooter = document.getElementById("slider-footer");
var prevTab = document.getElementById("prev");

var N = 5
var current = 1;

for (let i = 0; i < N; i++) {
  var imgSrc = `./images/image${i+1}.jpg`;
  var newNode = document.createElement("img");
  newNode.src = imgSrc;
  sliderItem.appendChild(newNode)

  var newDot = document.createElement("div");
  newDot.classList.add("dot")
  newDot.addEventListener("click", () => {
    return toggle(i+1)
  });
  sliderFooter.appendChild(newDot);
}

sliderFooter.childNodes[current].classList.add("active");

function toggle (index) {
  if (index > N ) index = 1;
  if (index < 1) index = N;
  console.log(index);
  sliderItem.style.transform = `translateX(-${710 * (index - 1)}px)`;
  current = index;
  for(let j = 1; j <= N; j++) {
    if (j === current) {
      sliderFooter.childNodes[current].classList.add("active");
    } else {
      sliderFooter.childNodes[j].classList.remove("active");
    }
  }
  return true;
}

