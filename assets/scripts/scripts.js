/*Sticky header
*****************************************************/
var header = document.querySelector('header');
if (window.scrollY > 50) {
  header.classList.add("sticky");
}

window.addEventListener('scroll', function () {
  header.classList.toggle("sticky", window.scrollY > 50);
});

/*Menu mobile
*************************************************/
const menuMobile = document.querySelector(".menuMobile");
menuMobile.addEventListener("click", ()=> {
  menuMobile.classList.toggle("active");
  document.querySelector("header nav").classList.toggle("active");
})

const btnCloseMenu = document.querySelector(".btn-closeMenu");
btnCloseMenu.addEventListener("click", ()=> {
  menuMobile.classList.remove("active");
  document.querySelector("header nav").classList.remove("active");
})


/*Update copy automatically
**************************************************/
document.querySelector(".year-copy").innerText = new Date().getFullYear();

/*Progress Bar scroll
**********************************************/
var progressBar = document.querySelector("#progress-bar span");
var totalHeight = document.body.scrollHeight - window.innerHeight;

window.addEventListener("scroll", function() {
  var currentHeight = window.pageYOffset;
  var progress = currentHeight / totalHeight * 100;
  progressBar.style.width = progress + "%";
});

/*AOS Init
*******************************************************/
AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: true, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

/*ADD ACTIVE CURRENT SECTION
**************************************************/
function setNavigation() {
  let current_location = location.pathname.split('/')[1];
  if (current_location === "") return;
  let menu_items = document.querySelector("header nav").getElementsByTagName("a");

  for (let i = 0; i < menu_items.length; i++) {
    if (menu_items[i].getAttribute("href").indexOf(current_location) !== -1) {
      menu_items[i].className = "active";
    }
  }
}

setNavigation();