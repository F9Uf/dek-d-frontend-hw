var sliderItem = document.getElementById("slider-item");
var sliderFooter = document.getElementById("slider-footer");
var N = 5


for (let i = 0; i < N; i++) {
  var imgSrc = `./images/image${i+1}.jpg`;
  var newNode = document.createElement("img");
  newNode.src = imgSrc;
  sliderItem.appendChild(newNode)

  var newDot = document.createElement("div");
  newDot.classList.add("dot")
  sliderFooter.appendChild(newDot);
}


let i = 1;
sliderFooter.childNodes[i].classList.add("active");

function toggle (xx) {
  console.log(xx);
  if (i > N - 1) i = 0;
  sliderItem.style.transform = `translateX(-${710 * i}px)`;
  i += 1;
  for(let j = 1; j <= N; j++) {
    if (j === i) {
      sliderFooter.childNodes[i].classList.add("active");
    } else {
      sliderFooter.childNodes[j].classList.remove("active");
    }
  }
}

