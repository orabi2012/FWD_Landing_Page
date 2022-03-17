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

// variable as index for section and nav-link
let _counter = 0;

// variable as index for ACTIVE section and nav-link
let activeSectionTag = 0;

//variable to know if user is scrolling
let isKeepScrolling;

//get nav in variable
let myNavBar = document.getElementsByTagName("nav")[0];

//get header (buttons + nav bar )
let myHeader = document.getElementsByTagName("header")[0];

//Create ul (unordered List For NavBar )
const myUnorderdList = document.createElement("ul");

//Create Button to add new section and corresponding link
const myBtnAdd = document.createElement("button");
//Create Button to Remove Last section and corresponding link
const myBtnRemove = document.createElement("button");

//get main area (sections )
const mymain = document.getElementsByTagName("main")[0];

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
// Function add buttons (myBtnAdd + myBtnRemove) to Header will used to add / remove sections and navBar buttons
function addButtons() {
  //myBtnAdd
  myBtnAdd.innerHTML = `Add Section  (${_counter} of 10 )`;

  myBtnAdd.classList.add("button", "buttonAdd");

  myNavBar.appendChild(myBtnAdd);

  //myBtnRemove
  myBtnRemove.innerHTML = `Remove section ${_counter}`;

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

  //const myDiv = document.createElement("div");

  mySection.id = `section_${index}`;

  mySection.setAttribute("Tag", index);

  {
  }
  mySection.innerHTML = `
  <div class="landing__container">
    <h2>Section ${index}</h2>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
    <img src="./img/${index}.png" alt="FWD" >
    <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
  </div>
  `;

  mymain.appendChild(mySection);
}

//remove last section and corresponding link
function removeSection_link() {
  //let elementToRemove = document.getElementById(`li_${_counter}`)
  if (_counter > 0) {
    let elementToRemove = document.getElementById(`li_${_counter}`);
    elementToRemove.remove();
    let sectionToRemove = document.getElementById(`section_${_counter}`);
    sectionToRemove.remove();

    _counter -= 1;
  }
}
//set active nav
function setActiveLink(index) {
  //console.log(`index = ${index}`)

  const allLinks = document.querySelectorAll("a");
  //console.log(allLinks);

  for (let i = 0; i <= allLinks.length - 1; i++) {
    allLinks[i].classList.remove("activeList");

    if (index === i + 1) {
      console.log(`allLinks = ${index}`);
      allLinks[i].classList.add("activeList");
    }
  }
}





// Scroll to anchor ID using scrollTO event


window.addEventListener(
  "scroll",
  function () {
    window.clearTimeout(isKeepScrolling);

    myHeader.style.display = "block";

    isKeepScrolling = setTimeout(function () {
      // Run the callback
      console.log("Scrolling has stopped.");

      myHeader.style.display = "none";
    }, 5000);

    let allSections = this.document.querySelectorAll("section");

    //console.log(allSections)
    allSections.forEach(function (section, i) {
      const sectionBound = section.getBoundingClientRect();

      section.classList.remove("activeList");

      // Add class 'active' to section when near top of viewport

      if (sectionBound.top >= 0 && sectionBound.top < 300) {
        const sTag = section.getAttribute("Tag");

        section.classList.add("activeList");

        activeSectionTag = sTag;

        console.log(`activeSectionTag ${activeSectionTag}`);

        const links = document.querySelectorAll("a");

        links.forEach(function (link, i) {
          link.classList.remove("activeList");

          if (link.getAttribute("Tag") === section.getAttribute("Tag")) {
            link.classList.add("activeList");
          }
        });
      } else {
        section.classList.remove("activeList");
      }
    });
  },

  false
);


function smoothScroll(secId) {
  let s = document.querySelector(`#section_${secId}`);

  s.scrollIntoView({
    behavior: "smooth",
  });
}
/**
 * End Main Functions
 * Begin Events
 *
 */


myBtnAdd.addEventListener("click", function () {
  if (_counter === 0 || _counter < 10) {
    _counter += 1;
    addNavBarBtn(_counter);

    addSection(_counter);
    myBtnAdd.innerHTML = `Add Section  (${_counter} of 10 )`;
    myBtnRemove.innerHTML = `Remove section ${_counter}`;

    Check_counter();
  }
});

function Check_counter() {
  if (_counter === 0) {
    myBtnAdd.style.visibility = "visible";
    myBtnRemove.style.visibility = "hidden";
  } else if (_counter < 10) {
    myBtnAdd.style.visibility = "visible";
    myBtnRemove.style.visibility = "visible";
  } else if (_counter >= 10) {
    myBtnAdd.style.visibility = "hidden";
    myBtnRemove.style.visibility = "visible";
  }
}

myBtnRemove.addEventListener("click", function () {
  removeSection_link();

  myBtnAdd.innerHTML = `Add  (${_counter} of 10 )`;
  myBtnRemove.innerHTML = `Remove section ${_counter}`;

  Check_counter();
});

// Build menu

function addNavBarBtn(index) {
  const aLink = document.createElement("a");
  aLink.id = `alink_${index}`;
  aLink.innerHTML = `Sec #${index}`;
  aLink.href = `#section_${index}`;
  aLink.className = "menu__link";

  aLink.setAttribute("Tag", index);

  const myLi = document.createElement("li");
  myLi.id = `li_${index}`;

  myLi.appendChild(aLink);
  myUnorderdList.appendChild(myLi);

  myNavBar.appendChild(myUnorderdList);

  // Scroll to section on link click

  aLink.addEventListener("click", function (event) {
    event.preventDefault();

    console.log("addEventListener my index = " + index);
    setActiveLink(index);
    setActiveSection(index);

    smoothScroll(index);
  });
}

// Set sections as active
function setActiveSection(index) {
  const allSections = document.querySelectorAll("section");
  //console.log(allLinks);

  for (let i = 0; i <= allSections.length - 1; i++) {
    allSections[i].classList.remove("activeList");

    if (index === i + 1) {
      console.log(`allSections = ${index}`);
      allSections[i].classList.add("activeList");
    }
  }
}


// at page load events
window.addEventListener("DOMContentLoaded", (event) => {
  addButtons();

//  console.log ("add button");
  myBtnRemove.style.visibility = "hidden";
  myBtnAdd.style.visibility = "visible";
});


//show-hide header with user click anywhere
window.addEventListener(
  "click",
  function () {
    window.clearTimeout(isKeepScrolling);

    myHeader.style.display = "block";

    isKeepScrolling = setTimeout(function () {
     
      console.log("click has stopped.");

      myHeader.style.display = "none";
    }, 5000);

  
  },

  false
);




