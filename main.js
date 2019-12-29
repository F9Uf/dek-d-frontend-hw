var sliderItem = document.getElementById("slider-item");
var sliderFooter = document.getElementById("slider-footer");
var prevTab = document.getElementById("prev");

var N = 5 // <======== change image size
var current = 1;

// initial create dom from data images
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

// handle touch slide
var startpos = 0, endpos;
var press = false;

// handle touch slide for mouse pointer
sliderItem.addEventListener("pointerdown", evt => {
  evt.preventDefault();
  if (evt.pointerType === 'mouse') {
    startpos = evt.clientX;
    press = true
  }
})
sliderItem.addEventListener("pointermove", evt => {
  if (press && evt.pointerType === 'mouse') {
    var currentTranslateX = getTranslateX(sliderItem);
    sliderItem.style.transform = `translateX(${currentTranslateX + (evt.pageX - startpos)}px)`;    
  }
})
sliderItem.addEventListener("pointerup", evt => {
  endpos = evt.clientX;
  slideToToggle();
  press = false;
  
})
sliderItem.addEventListener("pointerleave", evt => {
  if (evt.pointerType === 'mouse') {
    endpos = evt.clientX;
    slideToToggle();
    press = false;
  }
  
})

// handle touch slide for mobile pointer
sliderItem.addEventListener("touchstart", evt => {
  startpos = evt.touches[0].clientX;
  press = true;
})
sliderItem.addEventListener("touchmove", evt => {
  if (press) {
    var currentTranslateX = getTranslateX(sliderItem);
    sliderItem.style.transform = `translateX(${currentTranslateX + (evt.touches[0].pageX - startpos)}px)`;    
  }
})
sliderItem.addEventListener("touchend", evt => {
  endpos = evt.changedTouches[0].clientX;
  slideToToggle();
  press = false;
  
})

function slideToToggle () {
  var dir = endpos > startpos ? 'LTR': 'RTL';

  var currentTranslateX = getTranslateX(sliderItem);
  var imageWidth = sliderItem.childNodes[0].width;
  
  if (press) {
    if (dir === 'LTR' && currentTranslateX > -((imageWidth+20)*current-1)) {
      toggle(current-1);    
    } else {
      toggle(current+1);
    }

  }
}

const getTranslateX = el => {
  var style = getComputedStyle(el);
  var matrix = new WebKitCSSMatrix(style.webkitTransform);
  return matrix.m41
}
