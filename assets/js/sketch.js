// Create user interations
// Document selectors: used for later
const app = document.querySelector("#app");

// Slider data
const slider = document.querySelector("#delay-ranger");
const sliderText = document.querySelector("#delay-ranger-text");

slider.addEventListener(
	"change",
	function () {
		sliderText.textContent = `${slider.value}ms`;
		recursionDelay.time = slider.value;
	},
	false
);

// Interaction event handler
const interactionsText = document.querySelector("#number-of-interactions");
window.addEventListener("interaction", () => {
	interactionsText.textContent = `x${window.interactionsNumber}`;
});

window.addEventListener("resolved", () => {
	resetButton.querySelector("div.spinner").classList.remove("active");
	resetButton.querySelector("div.redo").classList.add("active");
	app.classList.add("resolved");
});

const numbersWritten = document.querySelector("#empty-cells");

const cells = [
	[7, 8, 0, 4, 0, 0, 1, 2, 0],
	[6, 0, 0, 0, 7, 5, 0, 0, 9],
	[0, 0, 0, 6, 0, 1, 0, 7, 8],
	[0, 0, 7, 0, 4, 0, 2, 6, 0],
	[0, 0, 1, 0, 5, 0, 9, 3, 0],
	[9, 0, 4, 0, 6, 0, 0, 0, 5],
	[0, 7, 0, 3, 0, 0, 0, 1, 2],
	[1, 2, 0, 0, 0, 7, 4, 0, 0],
	[0, 4, 9, 2, 0, 6, 0, 0, 7],
];

// const cells1 = [
// 	[0, 0, 8, 0, 0, 0, 0, 0, 0],
// 	[4, 9, 0, 1, 5, 7, 0, 0, 2],
// 	[0, 0, 3, 0, 0, 4, 1, 9, 0],
// 	[1, 8, 5, 0, 6, 0, 0, 2, 0],
// 	[0, 0, 0, 0, 2, 0, 0, 6, 0],
// 	[9, 6, 0, 4, 0, 5, 3, 0, 0],
// 	[0, 3, 0, 0, 7, 2, 0, 0, 4],
// 	[0, 4, 9, 0, 3, 0, 0, 5, 7],
// 	[8, 2, 7, 0, 0, 9, 0, 1, 3],
// ];

const defaultRecursionDelay = 250; //ms
const recursionDelay = { time: defaultRecursionDelay };

let game = new Game(cells, recursionDelay);
numbersWritten.textContent = game.countEmptyCells();

// Reset button
const resetButton = document.querySelector("#start-over");
resetButton.addEventListener("click", function () {
	if (!game.isSolving) {
		resetButton.querySelector("div.spinner").classList.add("active");
		resetButton.querySelector("div.redo").classList.remove("active");
		app.classList.remove("resolved");
		resetAll();
	}
});

function setup() {
	const screenCanvas = createCanvas(451, 451);
	screenCanvas.parent("canvas-wrapper");

	frameRate(60);
	noLoop();
}

function draw() {
	game.startSolving();
}


const emptyMatrix = Array(9).fill().map(() => Array(9).fill(0));

function resetAll() {
	// The whole process is:
	// - Create a new matrix (with all cells 0 filled)
	// - Create a new Solver
	// - Random insert a single random value inside matrix
	// - Make the solver solve lol
	// - When its solved generate empty cells
	// - Use new board to create a whole new game
	const newMatrixReference = JSON.parse(JSON.stringify(emptyMatrix));
	const solver = new Solver();

	solver.randomInsertOneValue(newMatrixReference);
	solver.solve(newMatrixReference).then(() => {
		solver.addEmpty(newMatrixReference);

		game = new Game(newMatrixReference, recursionDelay);
        numbersWritten.textContent = game.countEmptyCells();
        
		game.startSolving();
	});
}
