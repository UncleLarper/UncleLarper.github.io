//navigation bar stuff//

const navibar = document.querySelector("#navibar");
const box = document.querySelectorAll(".box");
const click = new Audio("audio/click.MP3");
const navs = document.querySelectorAll(".navi1, .navi2");



function scrollNav() {
    navibar.classList.toggle("show", window.scrollY > 900);
}

function scrollBox() {
    box.forEach(function(poof) {
        if (window.scrollY > 600) {
            poof.classList.add("active");
        }
    });
}

window.addEventListener("scroll", scrollNav); //helps refresh and check if it scroll past
window.addEventListener("scroll", scrollBox);

scrollNav();
scrollBox();

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


navs.forEach(function(nav){

    nav.addEventListener("click", function(opn){

        if (opn.target.classList.contains("ind")) show(1);
        else if (opn.target.classList.contains("tech")) show(2);
        else if (opn.target.classList.contains("gen")) show(3);
        else if (opn.target.classList.contains("draw")) show(4);

    });

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
		
		if (window.scrollY > first && window.scrollY < last) {
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
const quizForm = document.querySelector("#quizForm");
const quizdsc = document.querySelector("#quizdsc");


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
	quizForm.reset();
});



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
}

qtns.innerHTML = html;

function checkQuiz() {
	const formData = new FormData(quizForm);
    let score = 0;
    for (let i = 0; i < answers.length; i++) {
        let selected = formData.get("q" + i);

        if (selected == answers[i]) {
            score++;
        }
    }
	/*remove class first */
	scorebox.classList.remove("correct");
	scorebox.classList.remove("wrong");
	
	/* add class according to score */
	if (score == answers.length) {
		scorebox.classList.add("correct");
	}
	else {
		scorebox.classList.add("wrong");
	}
	scorebox.innerHTML = "Your score is " + score + "/" + answers.length;
	 
	 /*shows process again but hide quiz until user retry*/
	proc.style.display = "block";
	startQz.style.display = "block";
	qtns.style.display = "none";
	btnSubmit.style.display = "none";
	startQz.innerHTML = "Retry Quiz";
	quizdsc.innerHTML = "Click on Retry Quiz to try again";
	startQz.style.display = "block";
}

quizForm.addEventListener("click", function(sub) {

    if (sub.target.id == "btnSubmit") {
        checkQuiz();
    }

});

/*page 3 stuff*/

const cards = document.querySelectorAll(".Cards");

cards.forEach(function(card) {
    card.addEventListener("click", function() {
        cards.forEach(function(oneCard) {
            oneCard.classList.remove("active");
        });
        card.classList.add("active");
		/* this makes sure it only open one card at a time so it doesnt squeeze that row*/
    });
});

/*page 4 canvas stuff*/

const color = document.querySelectorAll(".color");
const erase = document.querySelectorAll(".erase");
const eraseall = document.querySelectorAll(".eraseall");
const brush1 = new Audio("audio/brush1.MP3");
const brush2 = new Audio("audio/brush2.MP3");

function createCanvas(canvas, rows, cols, pixelSize){
    canvas.style.gridTemplateColumns = "repeat(" + cols + ", " + pixelSize + "px)";
    canvas.style.gridTemplateRows = "repeat(" + rows + ", " + pixelSize + "px)";

    for(let i = 0; i < rows * cols; i++){

        let pixel = document.createElement("div");

        pixel.className = "pixel";
        pixel.style.width = pixelSize + "px";
        pixel.style.height = pixelSize + "px";

        canvas.appendChild(pixel);
    }
}

const canvas1 = document.querySelector("#canvass");
const canvas2 = document.querySelector("#canvasss");
createCanvas(canvas1, 100,100, 5);
createCanvas(canvas2, 10,10, 50);

function resizeCanvas() { /* for the phone responsiveness thing*/

    canvas1.innerHTML = "";
    canvas2.innerHTML = "";

    if (window.innerWidth <= 800) {
        createCanvas(canvas1, 100, 100, 2.2);
        createCanvas(canvas2, 10, 10, 20);
    } else {
        createCanvas(canvas1, 100, 100, 5);
        createCanvas(canvas2, 10, 10, 50);
    }
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);



/* erasing */

let erasing = false;
let currentColor = color[0].value;

erase.forEach(function(erase){
	erase.addEventListener("click", function () {
		erasing = true;

		brush1.currentTime = 0;
		brush1.play();
	});
});

/* color */
color.forEach(function(color){
	color.addEventListener("input", function () {
		currentColor = color.value;
		erasing = false;

		brush2.currentTime = 0;
		brush2.play();
	});
});
	



/*click or drag to draw*/

function enabledraw(canvas) {
	let drawing = false;

	canvas.addEventListener("pointerdown", function(){ /* using pointer so mobile user can use too */
		drawing = true;
		
		brush1.play();
	});

	canvas.addEventListener("pointerup", function(){
		drawing = false;

		brush2.play();
	});


	canvas.addEventListener("pointermove", function(evt){

		if (!drawing) return;
		const pixel = document.elementFromPoint(evt.clientX, evt.clientY); /* had to ask AI to help with this part */
		console.log(pixel);

		if (pixel && pixel.classList.contains("pixel")){

			if(erasing) {
				pixel.style.background = "white";
				pixel.dataset.color = "#ffffff";
			}
			else {
				pixel.style.background = currentColor;
				pixel.dataset.color = currentColor; /* the pixels will remember the exact hexcode, i gotta use AI for this one */
			}
		}

	});
}

enabledraw(canvas1);
enabledraw(canvas2);

console.log(canvas1);
console.log(canvas2);

/* erase all */

function eraseCanvas(canvas){

    const pixels = canvas.querySelectorAll(".pixel");

    pixels.forEach(function(pixel){
        pixel.style.backgroundColor = "white";
    });

}

/* game */

const gameimg = document.querySelector("#gameimg");
const timerText = document.querySelector("#timer");
const level = document.querySelector("#level");
const startgame = document.querySelector("#startgame");
const gametexts = document.querySelector("#gametexts");


let currentLevel = 0;
let timeLeft = 150;
let timer;

function changeImg() {
	
	if(currentLevel == 0){
		gameimg.style.backgroundPosition = "0% 0%";
    }
	
	else if(currentLevel == 1){
        gameimg.style.backgroundPosition = "100% 0%";
    }
	
	else if(currentLevel == 2){
        gameimg.style.backgroundPosition = "0% 100%";
    }
	
	else if(currentLevel == 3){
        gameimg.style.backgroundPosition = "100% 100%";
    }
}
	

startgame.addEventListener("click", function(){
	let pos = 0;
    const move = setInterval(function() { /* does an animation (just to do the js animation req) */
		pos++;
		gameimg.style.left = pos + "px";

		if (pos == 10) {
			clearInterval(move);
		}

    }, 20); /* runs function every 20mili seconds */
	
    currentLevel = 0;
    loadLevel();
	gameimg.style.display = "block";
	gametexts.innerHTML = "START!";
	startgame.innerHTML = "Restart";
});

function loadLevel(){
    eraseCanvas(canvas2);
    changeImg();

    level.innerHTML =
        "Level " + (currentLevel + 1) + " / 4";
    startTimer();

}

eraseall.forEach(function(eraseall, index) {
    eraseall.addEventListener("click", function() {
        if (index == 0)
            eraseCanvas(canvas1);
        else
            eraseCanvas(canvas2);
    });

});

function startTimer(){
    clearInterval(timer);
    timeLeft = 150;
    timerText.innerHTML =
        "Time: " + timeLeft;

    timer = setInterval(function(){
        timeLeft--;
        timerText.innerHTML =
            "Time: " + timeLeft;

        if(timeLeft <= 0){
            clearInterval(timer);
			gametexts.innerHTML = "Time's Up! Try Again";

            loadLevel();
		
        }

    },1000);

}

function nextLevel(){
    clearInterval(timer);
    currentLevel++;

    if(currentLevel >= 4){
        gametexts.innerHTML = "Congragulations! you have finished the game!";
        currentLevel = 0;

    }
    else{
        loadLevel();
    }

}

/* Checking of each grid and tiles in the canvas (jesus christ) */

const cnvanswer = [
/*first level*/
[ "#009dff", "#009dff", "#009dff", "#009dff", "#009dff", "#009dff", "#009dff", "#009dff", "#009dff", "#009dff",
  "#009dff", "#009dff", "#009dff", "#009dff", "#167703", "#167703", "#009dff", "#009dff", "#009dff", "#009dff",
  "#009dff", "#009dff", "#009dff", "#167703", "#167703", "#167703", "#167703", "#009dff", "#009dff", "#009dff",
  "#009dff", "#009dff", "#167703", "#167703", "#167703", "#167703", "#167703", "#167703", "#009dff", "#009dff",
  "#009dff", "#167703", "#167703", "#167703", "#167703", "#167703", "#167703", "#167703", "#167703", "#009dff",
  "#009dff", "#009dff", "#009dff", "#009dff", "#7d4e0d", "#7d4e0d", "#009dff", "#009dff", "#009dff", "#009dff",
  "#009dff", "#009dff", "#009dff", "#009dff", "#7d4e0d", "#7d4e0d", "#009dff", "#009dff", "#009dff", "#009dff",
  "#009dff", "#009dff", "#009dff", "#009dff", "#7d4e0d", "#7d4e0d", "#009dff", "#009dff", "#009dff", "#009dff",
  "#11ff00", "#11ff00", "#11ff00", "#11ff00", "#11ff00", "#11ff00", "#11ff00", "#11ff00", "#11ff00", "#11ff00",
  "#11ff00", "#11ff00", "#11ff00", "#11ff00", "#11ff00", "#11ff00", "#11ff00", "#11ff00", "#11ff00", "#11ff00",
],
/*second level*/
[ "#6b6b6b", "#6b6b6b", "#6b6b6b", "#6b6b6b", "#6b6b6b", "#6b6b6b", "#6b6b6b", "#6b6b6b", "#6b6b6b", "#6b6b6b",
  "#eeb691", "#eeb691", "#eeb691", "#eeb691", "#6b6b6b", "#6b6b6b", "#eeb691", "#eeb691", "#eeb691", "#eeb691",
  "#eeb691", "#d77665", "#d77665", "#eeb691", "#6b6b6b", "#6b6b6b", "#eeb691", "#d77665", "#d77665", "#eeb691",
  "#eeb691", "#d77665", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#d77665", "#eeb691",
  "#eeb691", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#eeb691",
  "#6b6b6b", "#bd8661", "#795944", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#795944", "#bd8661", "#6b6b6b",
  "#6b6b6b", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#6b6b6b",
  "#6b6b6b", "#bd8661", "#bd8661", "#bd8661", "#3e3732", "#3e3732", "#bd8661", "#bd8661", "#bd8661", "#6b6b6b",
  "#6b6b6b", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#6b6b6b",
  "#6b6b6b", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#bd8661", "#6b6b6b",
],
/*third level*/
[ "#ff0000", "#ff0000", "#8c3b3b", "#8c3b3b", "#192f1a", "#192f1a", "#192f1a", "#192f1a", "#192f1a", "#192f1a",
  "#ff0000", "#ff0000", "#8c3b3b", "#8c3b3b", "#192f1a", "#192f1a", "#192f1a", "#192f1a", "#ffffff", "#192f1a",
  "#ff0000", "#ff0000", "#8c3b3b", "#192f1a", "#192f1a", "#192f1a", "#192f1a", "#f3ff4d", "#000000", "#f3ff4d",
  "#8c3b3b", "#8c3b3b", "#8c3b3b", "#192f1a", "#192f1a", "#192f1a", "#192f1a", "#192f1a", "#192f1a", "#192f1a",
  "#3c2525", "#192f1a", "#192f1a", "#192f1a", "#192f1a", "#21a129", "#192f1a", "#192f1a", "#192f1a", "#192f1a",
  "#3c2525", "#192f1a", "#192f1a", "#21a129", "#21a129", "#21a129", "#192f1a", "#192f1a", "#192f1a", "#192f1a",
  "#3c2525", "#3c2525", "#3c2525", "#21a129", "#21a129", "#21a129", "#192f1a", "#192f1a", "#192f1a", "#192f1a",
  "#3c2525", "#3c2525", "#3c2525", "#192f1a", "#192f1a", "#192f1a", "#192f1a", "#192f1a", "#192f1a", "#192f1a",
  "#3c2525", "#3c2525", "#192f1a", "#192f1a", "#192f1a", "#192f1a", "#192f1a", "#192f1a", "#192f1a", "#192f1a",
  "#3c2525", "#3c2525", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000",
],
/*fourth level*/
[ "#1d092a", "#1d092a", "#1d092a", "#492262", "#492262", "#6e428a", "#6e428a", "#9a6cb7", "#9a6cb7", "#cca4e5",
  "#1d092a", "#1d092a", "#492262", "#492262", "#492262", "#6e428a", "#6e428a", "#9a6cb7", "#9a6cb7", "#cca4e5",
  "#1d092a", "#492262", "#492262", "#492262", "#6e428a", "#6e428a", "#6e428a", "#9a6cb7", "#9a6cb7", "#cca4e5",
  "#492262", "#492262", "#492262", "#6e428a", "#6e428a", "#6e428a", "#9a6cb7", "#9a6cb7", "#9a6cb7", "#cca4e5",
  "#492262", "#492262", "#6e428a", "#6e428a", "#6e428a", "#9a6cb7", "#9a6cb7", "#9a6cb7", "#cca4e5", "#cca4e5",
  "#6e428a", "#6e428a", "#6e428a", "#6e428a", "#9a6cb7", "#9a6cb7", "#9a6cb7", "#cca4e5", "#cca4e5", "#cca4e5",
  "#6e428a", "#6e428a", "#9a6cb7", "#9a6cb7", "#9a6cb7", "#9a6cb7", "#cca4e5", "#cca4e5", "#cca4e5", "#ead4f7",
  "#9a6cb7", "#9a6cb7", "#9a6cb7", "#9a6cb7", "#9a6cb7", "#cca4e5", "#cca4e5", "#cca4e5", "#ead4f7", "#ead4f7",
  "#9a6cb7", "#9a6cb7", "#9a6cb7", "#9a6cb7", "#cca4e5", "#cca4e5", "#cca4e5", "#ead4f7", "#ead4f7", "#ead4f7",
  "#cca4e5", "#cca4e5", "#cca4e5", "#cca4e5", "#cca4e5", "#cca4e5", "#ead4f7", "#ead4f7", "#ead4f7", "#ffffff",
]
];
  
  
function checkCanvas(){
	
    const pixels = canvas2.querySelectorAll(".pixel");

    let correct = 0;

    pixels.forEach(function(pixel, index){

        if(pixel.dataset.color == cnvanswer[currentLevel][index]){
            correct++;
        }

    });

    if(correct == 100){
        nextLevel();
    }
    else{
        gametexts.innerHTML = "Wrong! Try Again...";
        loadLevel();
    }

}

const submitgame = document.querySelector("#submitgame");
submitgame.addEventListener("click", checkCanvas);


/*click sound*/
document.addEventListener("mouseup", function(){
	click.play();
});

/* for mobile scroll lock */

const lockBtns = document.querySelectorAll(".lock");

lockBtns.forEach(function(lockBtn) {
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
});