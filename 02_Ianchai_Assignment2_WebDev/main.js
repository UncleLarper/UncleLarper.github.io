//navigation bar stuff//

const navibar = document.querySelector("#navibar");
const box = document.querySelectorAll(".box");
const click = new Audio("audio/click.MP3");



function scrollNav() {
    navibar.classList.toggle("show", scrollY > 900);
}

function scrollBox() {
    box.forEach(function(poof) {
        if (scrollY > 600) {
            poof.classList.add("active");
        }
    });
}

window.addEventListener("scroll", scrollNav); //helps refresh and check if it scroll past
window.addEventListener("scroll", scrollBox);

scrollNav();
scrollBox();

const page1 = document.querySelectorAll(".ind");
const page2 = document.querySelectorAll(".tech");
const page3 = document.querySelectorAll(".gen");
const page4 = document.querySelectorAll(".draw");
const allpages = document.querySelectorAll(".page");
function hideall(){ //function to hide all pages
	for(let onepage of allpages){ //go through all subtopic pages
		onepage.style.display="none"; //hide it
	}
}

function show(pgno){ //function to show selected page no
hideall();

let onepage=document.querySelector("#page"+pgno);
onepage.style.display="block"; //show the page
reveal();
}



/*Im using anonymous function to detect click then show page*/

page1.forEach (function(button) {
	button.addEventListener("click", function(){
	show(1)});
	
});
page2.forEach (function(button) {
	button.addEventListener("click", function(){
	show(2)});
	
});
page3.forEach (function(button) {
	button.addEventListener("click", function(){
	show(3)});
	
});
page4.forEach (function(button) {
	button.addEventListener("click", function(){
	show(4)});
	
});


/*page 2 stuff*/

const reveals = document.querySelectorAll(".reveal");
function reveal() {
    reveals.forEach(function(item, index) { /* applies for each .reveeal class */
		
		let first,last;
		
		if (window.innerWidth > 800) {
			first = 900 + index * 200; /*I gotta hardcode to guess the Y of each reveal class*/
			last = first + 550;
		}
		else{
			first = 150 + index * 500; /*for responsive*/
			last = first + 1500;
		}
		
		if (scrollY > first && scrollY < last) {
			item.classList.add("active");
		}
		else{
			item.classList.remove("active");
		}

    });
}

window.addEventListener("scroll", reveal);

show(1);

/*quiz*/
const proc = document.querySelector("#proc");
const qtns = document.querySelector("#qtns");
const startQz = document.querySelector("#startQz");
const btnSubmit = document.querySelector("#btnSubmit");
const scorebox = document.querySelector("#scorebox");

/*hides the quiz beforhand*/
qtns.style.display = "none";
btnSubmit.style.display = "none";
scorebox.style.display = "none"; 

startQz.addEventListener("click", function() {
	proc.style.display = "none"; /* this will hide the process to prevent cheating hehe*/
	
	qtns.style.display = "block";
	btnSubmit.style.display = "block";
	scorebox.style.display = "block"; 
	startQz.style.display = "none";
});
	

btnSubmit.addEventListener("click", checkQuiz);


const questions = [
    "From this website, without referring back up there, what is the first process",
    "What is the purpose of line art?",
	"When should you begin colouring your artwork?",
	"Why is shading important?",
	"Which of these is mentioned as a colour harmony?",
	"According to the website, what is a good way for beginners to practise?",
	"A beginner wants to understand the shape of an object before drawing it. Which process should they focus on?",
	"True or False: You should start shading before adding colours."
	
];

const choices = [
    ["Shading", "Coloring", "Visualise", "Line art"],
    ["To add shadows", "To choose colours", "To create clean outlines before colouring", "To resize the canvas"],
	["Before sketching", "Before line art", "After completing the line art", "After shading"],
	["To give the artwork depth and make it look more alive", "To make the drawing transparent", "To erase mistakes", "To make colours brighter"],
	["Rainbow", "Neon", "Triadic", "Metallic"],
	["Only draw from memory", "Never use references", "Practise regularly and study reference images", "Use only one brush"],
	["Colouring", "Visualising", "Shading", "Exporting"],
	["True", "False"]
];

const answers = [
    "Visualise",
    "To create clean outlines before colouring",
	"After completing the line art",
	"To give the artwork depth and make it look more alive",
	"Triadic",
	"Practise regularly and study reference images",
	"Visualising",
	"False"
	
];

let html = "";

for (let i = 0; i < questions.length; i++) {

    html += "<p>" + (i + 1) + ". " + questions[i] + "</p>";

    for (let j = 0; j < choices[i].length; j++) {

        html += "<input type='radio' name='q" + i + "' value='" + choices[i][j] + "'>";
        html += choices[i][j] + "<br>";
    }

    html += "<br>";
};

qtns.innerHTML = html;

function checkQuiz() {
    let score = 0;
    for (let i = 0; i < answers.length; i++) {
        let selected = document.querySelector('input[name="q' + i + '"]:checked');

        if (selected && selected.value == answers[i]) {
            score++;
        }
    }
	scorebox.innerHTML = "Your score is " + score + "/" + answers.length;
	 
	 /*shows process again but hide quiz until user retry*/
	proc.style.display = "block";
	startQz.style.display = "block";
	qtns.style.display = "none";
	btnSubmit.style.display = "none";
	startQz.innerHTML = "Retry Quiz";
	quizdsc.innerHTML = "Click on Retry Quiz to try again"
	startQuiz.style.display = "block";
};

/*page 3 stuff*/

const cards = document.querySelectorAll(".Cards");

cards.forEach(function(card) {
    card.addEventListener("click", function() {
        cards.forEach(function(oneCard) {
            oneCard.classList.remove("active");
        });
        card.classList.add("active");
		;/* this makes sure it only open one card at a time so it doesnt squeeze that row*/
    });
});

/*page 4 canvas stuff*/

const canvass = document.querySelector("#canvass");
const color = document.querySelector("#color");
const eraseall = document.querySelector("#eraseall");
const brush1 = new Audio("audio/brush1.MP3");
const brush2 = new Audio("audio/brush2.MP3");

for(let i=0;i<100*100;i++){

    let pixel = document.createElement("div");
    pixel.className = "pixel";

    canvass.appendChild(pixel);
}

/* erasing */
let erasing = false;
document.querySelector("#erase").onclick = function(){
    erasing = true;
	brush1.play();
};

let currentColor = color.value;

color.addEventListener("input", function () {
    currentColor = color.value;
	erasing = false;
	brush2.play();
});



/*click or drag to draw*/

let drawing = false;

canvass.addEventListener("pointerdown", function(){ /* using pointer so mobile user can use too */
    drawing = true;
	
	brush1.play();
});

canvass.addEventListener("pointerup", function(){
    drawing = false;

	brush2.play();
});


canvass.addEventListener("pointermove", function(evt){

    if (!drawing) return;
    const pixel = document.elementFromPoint(evt.clientX, evt.clientY); /* had to ask AI to help with this part */
    console.log(pixel);

    if (pixel && pixel.classList.contains("pixel")){

        if(erasing)
            pixel.style.background = "white";
        else
            pixel.style.background = currentColor;
    }

});

eraseall.addEventListener("click", function(){
    const pixels = document.querySelectorAll(".pixel");

    pixels.forEach(function(pixel){
        pixel.style.backgroundColor = "white";
    });
});

/*click sound*/
document.addEventListener("mouseup", function(stop){
	if (drawing || erasing) {
		click.pause();
	}
	else
		click.play();
});

/* for mobile scroll lock */

const lockBtn = document.querySelector("#lock");
let locked = false;

lockBtn.addEventListener("click", function(){

    locked = !locked;

    if(locked){
        document.body.classList.add("locked");
        lockBtn.innerHTML = "Unlock scroll"; /* This Unlock the scroll feature */
    }
    else{
        document.body.classList.remove("locked");
        lockBtn.innerHTML = "Lock Scroll"; /* This locks it */
    }

});