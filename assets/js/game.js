// - Game
// 	- props:
// 		- delay between interactions
// 		- stepsUsed
// 		- matrix
//      - board
//      - solver
//      - isSolving
//      - interactions
//      - numberWrittens
//      - events
// 	- methods:
//      - registerEvents()
// 		- new(matrix);
// 		- startSolving();
//      - interacted() -> used by children modules to notify a game interaction
// 		- redraw() -> call p5js redraw method: this will be used by is children when a update is needed

// Matrix empty param will make sense when the game is ready to cosume a sudoku generator
function Game(matrix = [], delay = { time: 0 }) {
	this.matrix = matrix;
	this.delay = delay;
	this.solver = false;
	this.board = false;
	this.isSolving = false;
	this.interactions = 0;
	this.events = {};

	const newGame = (matrix) => {
		// Create board
		this.board = new Board(matrix);

		// Create solver
		this.solver = new Solver(matrix, this);
	};

	const registerEvents = () => {
		const interaction = new Event("interaction");
		this.events.interaction = interaction;

		const resolved = new Event("resolved");
		this.events.resolved = resolved;
	};

	// Called once, and then the steps (current interation number) will be passed to the draw function
	this.startSolving = () => {
		// Algorithm
		this.isSolving = true;
		this.solver.solve(this.matrix);
	};

	this.redraw = () => {
		background(0);
		this.board.draw();
	};

	this.interacted = () => {
		this.interactions++;
		window.interactionsNumber = this.interactions;
		window.dispatchEvent(this.events.interaction);

		return this.interactions;
	};

	this.done = () => {
		this.isSolving = false;
		window.dispatchEvent(this.events.resolved);
	};

	this.countEmptyCells = () => {
		let emptyCells = 0;
		for (let i = 0; i < this.matrix.length; i++) {
			for (let j = 0; j < this.matrix[0].length; j++) {
				if (this.matrix[i][j] === 0) {
					emptyCells++;
				}
			}
		}

		return emptyCells;
	};

	// Start
	newGame(this.matrix);
	registerEvents();
}
