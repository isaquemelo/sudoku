// - Board:
// 	- props:
// 		- matrix 
// 		- cellMatrix: Array<Cell>
// 	- methods:
// 		- draw() - ok
//      - drawSquares() - ok
// 		- setMatrix(matrix) - ok
//      - createCells() - ok
// 		- getMatrix() - ok
// 		- markCell(row, column, colorCode = [green, red, yellow])  - ok

function Board(matrix) {
    this.matrix = matrix;
    this.cellMatrix = Array(9).fill().map(() => Array(9));

    // Create Cells objects
    let createCells = () => {
        let a = 0;
        let b = 0;

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (j % 9 == 0 && i != 0) {
                    b += 50;
                    a = 0;
                }

                this.cellMatrix[i][j] = new Cell( this.matrix[i][j], {x: a, y: b} );
                a += 50;
            }
        }
    }

    createCells();

    this.setMatrix = (matrix) => {
        this.matrix = matrix;
    }

    this.getMatrix = () => {
        return this.matrix;
    }

    // Highlight a particular cell
    this.markCell = (row, column) => {
        this.cellMatrix[row][column].highlight();
    }

    // Update method
    this.draw = () => {
        this.drawSquares();

        // console.log("board", JSON.parse(JSON.stringify(this.matrix)));

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.cellMatrix[i][j].value = this.matrix[i][j];
            }
        }

        this.cellMatrix.forEach(cellsRow => {
            cellsRow.forEach(cell => cell.show())
        });
    }

    this.drawSquares = () => {
        push();
        strokeWeight(4);
        stroke(255);
        line(150,0,150,height);
        line(300,0,300,height);
        line(0,150,width,150);
        line(0,300,width,300);
        pop();
    }
}