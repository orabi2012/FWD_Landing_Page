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

let activeSectionTag = 0 ;

let myNavBar = document.getElementsByTagName("nav")[0];

let myHeader = document.getElementsByTagName("header")[0];

const myUl = document.createElement("ul");
const myBtnAdd = document.createElement("button");
const myBtnRemove = document.createElement("button");

const mymain = document.getElementsByTagName("main")[0];

let isScrolling;

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


function addSection(index) {
  const mySection = document.createElement("section");

  const myDiv = document.createElement("div");

  mySection.id = `section_${index}`;

  mySection.setAttribute('Tag' , index)
  myDiv.style.class = "landing__container";

  const myHeading = document.createElement("h2");
  myHeading.innerHTML = `Section No ${index}`;

  const myParag1 = document.createElement("p");
  const myParag2 = document.createElement("p");

  const myImg = document.createElement("img");

  myImg.src = `./img/${index}.png`;

  myParag1.innerHTML = ` this section created dynamically using Js Code learned with Udacity `;
  myParag2.innerHTML = ` just another pragraph at section ${index} `;

  myDiv.appendChild(myHeading);
  myDiv.appendChild(myParag1);
  myDiv.appendChild(myParag2);
  mySection.appendChild(myDiv);
  mySection.appendChild(myImg);

  mymain.appendChild(mySection);


  
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

function setActiveLink(index) {


  //console.log(`index = ${index}`)

  const allLinks = document.querySelectorAll("a");
  //console.log(allLinks);

  for (let i = 0; i <= allLinks.length-1 ; i++) {

    allLinks[i].classList.remove("activeList");


    if ( index === i+1 ){

       console.log(`allLinks = ${index}`)
      allLinks[i].classList.add("activeList");

    }
  }


  

  
}





// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event
function smoothScroll(secId){
  //console.log(`#section_${secId}`);
  document.querySelector(`#section_${secId}`).scrollIntoView({
      behavior: 'smooth'
  });
}
/**
 * End Main Functions
 * Begin Events
 *
 */

// at page load events
window.addEventListener("DOMContentLoaded", (event) => {
  addButon();

//  console.log ("add button");
  myBtnRemove.style.visibility = "hidden";
  myBtnAdd.style.visibility = "visible";
});

myBtnAdd.addEventListener("click", function () {
  if (Counter === 0 || Counter < 10) {
    Counter += 1;
    addNavBarBtn(Counter);

    addSection(Counter);
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

  // console.log(Counter);

  CheckCounter();
});

// Build menu



function addNavBarBtn(index) {
  const aLink = document.createElement("a");
  aLink.id = `alink_${index}`;
  aLink.innerHTML = `Sec #${index}`;
  aLink.href = `#section_${index}`;
  aLink.className = "menu__link";

  aLink.setAttribute('Tag' , index)

  const myLi = document.createElement("li");
  myLi.id = `li_${index}`;

  myLi.appendChild(aLink);
  myUl.appendChild(myLi);

  myNavBar.appendChild(myUl);

  // Scroll to section on link click
  

  aLink.addEventListener("click", function ( event) {

    event.preventDefault();

    console.log("addEventListener my index = " + index);
    setActiveLink(index);
    setActiveSection(index);

    smoothScroll(index) ;
  });
}


// Set sections as active
function setActiveSection(index) {
  

  const allSections = document.querySelectorAll("section");
  //console.log(allLinks);

  for (let i = 0; i <= allSections.length-1 ; i++) {

    allSections[i].classList.remove("activeList");


    if ( index === i+1 ){

       console.log(`allSections = ${index}`)
       allSections[i].classList.add("activeList");

    }
  }

  
}



window.addEventListener ('scroll' , function () {


  window.clearTimeout( isScrolling );

  myHeader.style.display = "block";


  isScrolling = setTimeout(function() {

		// Run the callback
		console.log( 'Scrolling has stopped.' );

    myHeader.style.display = "none";



	}, 2000);


  let allSections = this.document.querySelectorAll('section');


  //console.log(allSections)
  allSections.forEach (function (section , i ){

const sectionBound = section.getBoundingClientRect()



section.classList.remove("activeList");




if( sectionBound.top >= 0 && sectionBound.top < (200)  ){

  const sTag = section.getAttribute('Tag')

//console.log (`index = ${i}`)
//console.log(`sectionTop = ${sectionBound.top} -Bottom  ${sectionBound.bottom}  index = ${i }` )

// console.log(section.getAttribute('id'))
section.classList.add("activeList");

activeSectionTag = sTag;

console.log( `activeSectionTag ${activeSectionTag}`);

// console.log(`activeSectionTag = ${activeSectionTag}`)

// setActiveLink(activeSectionTag)

const links = document.querySelectorAll('a');

links.forEach( function( link , i){

link.classList.remove("activeList") ;

if(link.getAttribute("Tag") === section.getAttribute("Tag")){

link.classList.add("activeList") ;

}

}  )



  //activeLink.classList.add("activeList");



  //setActiveLink(i +1)
  //setActiveSection (i +1)

}else{
  section.classList.remove("activeList");

}

  })

  
}
    
, false)




