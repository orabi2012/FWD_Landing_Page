/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

let Counter = 0;

let myNavBar = document.getElementsByTagName("nav")[0];

const myUl = document.createElement("ul");
const myBtnAdd = document.createElement("button");
const myBtnRemove = document.createElement("button");


const mymain = document.getElementsByTagName('main')[0];


/**
 * End Global Variables
 * Start Helper Functions
 *
 */
// add button to nab menu will used to add sections and navBar buttons
function addButon() {
  myBtnAdd.innerHTML = `Add Section  (${Counter} of 10 )`;

  myBtnAdd.classList.add("button", "buttonAdd");

  myNavBar.appendChild(myBtnAdd);

  myBtnRemove.innerHTML = `Remove section ${Counter}`;

  myBtnRemove.classList.add("button", "buttonRemove");

  myNavBar.appendChild(myBtnRemove);
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

function addNavBarBtn(index) {
  const aLink = document.createElement("a");
  aLink.id = `alink_${index}`;
  aLink.innerHTML = `Sec #${index}`;
  aLink.href = `#section_${index}`;
  aLink.className = "menu__link";

  const myLi = document.createElement("li");
  myLi.id = `li_${index}`;

  myLi.appendChild(aLink);
  myUl.appendChild(myLi);

  myNavBar.appendChild(myUl);
}



function addSection(index) {

  const mySection = document.createElement('section');

  const myDiv= document.createElement("div");
  
  mySection.id = `section_${index}`;
  myDiv.style.class ="landing__container"
  
  
  const myHeading = document.createElement("h2");
  myHeading.innerHTML= `Section No ${index}`;
  
    const myParag1 = document.createElement('p');
    const myParag2 = document.createElement('p');


    const myImg = document.createElement('img');

    myImg.src = `/img/${index}.png`

    myParag1.innerHTML = ` this section created dynamically using Js Code learned with Udacity `
    myParag2.innerHTML = ` just another pragraph at section ${index} `
  
myDiv.appendChild(myHeading);
myDiv.appendChild(myParag1);
myDiv.appendChild(myParag2);
mySection.appendChild(myDiv)
mySection.appendChild(myImg)

mymain.appendChild(mySection)


    
    
  }


function removeNavBarBtn() {
  //let elementToRemove = document.getElementById(`li_${Counter}`)
  if (Counter > 0) {
    let elementToRemove = document.getElementById(`li_${Counter}`);
    elementToRemove.remove();
    let sectionToRemove = document.getElementById(`section_${Counter}`);
    sectionToRemove.remove();


    Counter -= 1;
  }
}

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// at page load events
window.addEventListener("DOMContentLoaded", (event) => {
  addButon();

  console.log("add button");
  myBtnRemove.style.visibility = "hidden";
  myBtnAdd.style.visibility = "visible";
});

myBtnAdd.addEventListener("click", function () {
  if (Counter === 0 || Counter < 10) {
    Counter += 1;
    addNavBarBtn(Counter);

    addSection(Counter) ;
    myBtnAdd.innerHTML = `Add Section  (${Counter} of 10 )`;
    myBtnRemove.innerHTML = `Remove section ${Counter}`;

    CheckCounter();
  }
});

function CheckCounter() {
  if (Counter === 0) {
    myBtnAdd.style.visibility = "visible";
    myBtnRemove.style.visibility = "hidden";
  } else if (Counter < 10) {
    myBtnAdd.style.visibility = "visible";
    myBtnRemove.style.visibility = "visible";
  } else if (Counter >= 10) {
    myBtnAdd.style.visibility = "hidden";
    myBtnRemove.style.visibility = "visible";
  }
}

myBtnRemove.addEventListener("click", function () {
  //console.log(checkCounter ())
  // Counter += 1;

  removeNavBarBtn();

  myBtnAdd.innerHTML = `Add  (${Counter} of 10 )`;
  myBtnRemove.innerHTML = `Remove section ${Counter}`;

  console.log(Counter);

  CheckCounter();
});

// Build menu

// Scroll to section on link click

// Set sections as active
