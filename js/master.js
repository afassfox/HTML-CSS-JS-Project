// Toggle Menu
let toggleMenuIcon = document.querySelector(".header-area .menu-icon i");
let toggleMenu = document.querySelector(".header-area .menu-icon");
let toggleMenuLinks = document.querySelector(".links");

toggleMenuIcon.onclick = function (e) {
    e.stopPropagation();
    // Add "active-menu" Class for arrow
    toggleMenu.classList.toggle("active-menu");
    // Add "open" Class for Links
    toggleMenuLinks.classList.toggle("open");
};

document.addEventListener("click", (e) => {
    if (e.target !== toggleMenuIcon && e.target !== toggleMenuLinks) {
        if (toggleMenuLinks.classList.contains("open")) {
            toggleMenu.classList.remove("active-menu");
            toggleMenuLinks.classList.remove("open");
        }
    }
});

toggleMenuLinks.onclick = function (e) {
    e.stopPropagation();
};

// Check local storage color option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
    document.documentElement.style.setProperty("--main-color", mainColors);

    //check for active class
    document.querySelectorAll(".colors-list li").forEach((element) => {
        element.classList.remove("active");
        if (element.dataset.color === mainColors) {
            element.classList.add("active");
        }
    });
}
// Select Gear Button
let toggleGear = document.querySelector(".toggle-settings .fa-gear");

// Make Gear spin on hover
toggleGear.addEventListener("mouseover", () => {
    toggleGear.classList.toggle("fa-spin");
});
toggleGear.addEventListener("mouseout", () => {
    toggleGear.classList.toggle("fa-spin");
});

toggleGear.onclick = function () {
    // Toggle Open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");
};

//Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach((li) => {
    li.addEventListener("click", (e) => {
        //Set color on root
        document.documentElement.style.setProperty(
            "--main-color",
            e.target.dataset.color
        );
        //Set color on local storage
        localStorage.setItem("color_option", e.target.dataset.color);
        //remove active class from all childern
        e.target.parentElement
            .querySelectorAll(".active")
            .forEach((element) => {
                element.classList.remove("active");
            });
        // add active class
        e.target.classList.add("active");
    });
});

// Select bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
allBullets.forEach((bullet) => {
    bullet.addEventListener("click", (e) => {
        // Remove active class from all bullets
        allBullets.forEach((b) => {
            b.classList.remove("active");
        });
        // Add active class to clicked bullet
        e.target.classList.add("active");
    });
});

// Select Links
const allLinks = document.querySelectorAll(".links a");

// Scrolling Function
function scrollToSection(elements) {
    elements.forEach((element) => {
        element.addEventListener("click", (e) => {
            e.preventDefault();

            document
                .querySelector(e.target.dataset.section)
                .scrollIntoView({ behavior: "smooth", block: "center" });
        });
    });
}
scrollToSection(allBullets);
scrollToSection(allLinks);

// save Nav Bullets Option in local Storage
let savedNavBulletsOption = localStorage.getItem("bullets_option");
let saveBullets = document.querySelector("#bullets");

if (savedNavBulletsOption !== null) {
    if (savedNavBulletsOption === "block") {
        saveBullets.checked = true;
    } else {
        saveBullets.checked = false;
    }
    // Set Checked attribute from checkbox based on savedNavBulletsOption value in local storage
    if (savedNavBulletsOption === "block") {
        document.querySelector(".nav-bullets").style.display = "block";
    } else {
        document.querySelector(".nav-bullets").style.display = "none";
    }
}
// Toggle Nav Bullets
const navBullets = document
    .querySelector("#bullets")
    .addEventListener("change", (e) => {
        if (e.target.checked) {
            document.querySelector(".nav-bullets").style.display = "block";
            localStorage.setItem("bullets_option", "block");
        } else {
            document.querySelector(".nav-bullets").style.display = "none";
            localStorage.setItem("bullets_option", "none");
        }
    });

//random background option
let backgroundOption = true;

//variable to control interval
let backgroundInterval;

// save background option in local storage
let savedBackgroundOption = localStorage.getItem("background_option");
let saveButton = document.querySelector("#background");

if (savedBackgroundOption !== null) {
    if (savedBackgroundOption === "true") {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
    // Add/Remove Checked attribute from checkbox based on savedBackgroundOption value in local storage
    if (savedBackgroundOption === "true") {
        saveButton.checked = true;
    } else {
        saveButton.checked = false;
    }
}

// Select Landing Page Element
let landingPageElement = document.querySelector(".landing-page");

// Get Array Of Images
let imgArray = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"];

// Change BG IMG URL
landingPageElement.style.backgroundImage = 'url("imgs/img1.jpg")';

// Toggle random background option
const randomBackground = document
    .querySelector("#background")
    .addEventListener("change", (e) => {
        if (e.target.checked) {
            backgroundOption = true;
            randomizeImg();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });

function randomizeImg() {
    if (backgroundOption) {
        backgroundInterval = setInterval(() => {
            //Get Random Number
            let randomNumber = Math.floor(Math.random() * imgArray.length);

            landingPageElement.style.backgroundImage = `url("imgs/${imgArray[randomNumber]}")`;
        }, 5000);
    }
}
randomizeImg();

// Select Skills
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
    // Skills offset Top
    let skillsOffsetTop = ourSkills.offsetTop;
    // console.log(skillsOffsetTop);

    // Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;
    // console.log(skillsOuterHeight);

    // Window Height
    let windowHeight = this.innerHeight;
    // console.log(windowHeight);

    //window Scroll Top
    let windowScrollTop = this.pageYOffset;
    // console.log(windowScrollTop);

    if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
        let allSkills = document.querySelectorAll(
            ".skill-box .skill-progress span"
        );
        allSkills.forEach((skill) => {
            skill.style.width = skill.dataset.progress;
        });
    }
};

//create popup for images
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
    img.addEventListener("click", (e) => {
        //create overlay element
        let overlay = document.createElement("div");

        //overlay class
        overlay.className = "popup-overlay";

        //append overlay to body
        document.body.appendChild(overlay);

        //create the popup
        let popupBox = document.createElement("div");

        // popup class
        popupBox.className = "popup-box";

        // add alt text
        if (img.alt !== null) {
            // creating heading for alt
            let imgHeading = document.createElement("h3");

            //create text for heading
            let imgText = document.createTextNode(img.alt);

            //append text to heading
            imgHeading.appendChild(imgText);

            // append heading to popup box
            popupBox.appendChild(imgHeading);
        }

        // create the image
        let popupImage = document.createElement("img");

        // set image src
        popupImage.src = img.src;

        // add image to popup box
        popupBox.appendChild(popupImage);

        // append popup to body
        document.body.appendChild(popupBox);

        // create close span
        let closeButton = document.createElement("span");

        // create close button X
        let closeButtonX = document.createTextNode("X");

        // append X to Close button
        closeButton.appendChild(closeButtonX);

        // class for close button
        closeButton.className = "close-button";

        //add close button to popup box
        popupBox.appendChild(closeButton);
    });
});

// close popup by clicking on X
document.addEventListener("click", (e) => {
    if (e.target.className === "close-button") {
        // remove popup
        e.target.parentNode.remove();

        // remove overlay
        document.querySelector(".popup-overlay").remove();
    }
});

// close popup by clicking anywhere
document.addEventListener("click", (e) => {
    if (e.target.className === "popup-overlay") {
        document.querySelector(".popup-box").remove();
        document.querySelector(".popup-overlay").remove();
    }
});

// Reset Button
document.querySelector(".reset-settings").onclick = () => {
    localStorage.removeItem("bullets_option");
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");

    window.location.reload();
};

// Timeline scrolling
const timelineScroll = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.5 }
);
document.querySelectorAll(".hidden").forEach((element) => {
    timelineScroll.observe(element);
});
