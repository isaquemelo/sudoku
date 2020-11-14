// - Solver
// 	- props:
// 		- matrix
// 		- redraw -> method from parent
// 	- methods:
// 		- solve()
//      - findEmpty()

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function Solver(matrix = [], game = false) {
    
    this.solve = async (matrix) => {
        if(game) {
            // Wait game defined delay time (this should be somewhere else(?))
            await delay(game.delay.time);
            // Notify game that the funciton was called
            game.redraw();

            // Notify game that interaction was made
            game.interacted();
        }

        const find = findEmpty(matrix);
        
        if(find === false) {
            if(game) {
                // Notify the game that finished!
                game.done();
            }

            return true;
        } else {
            const [row, column] = find; 

            for(let number = 1; number < 10; number++) {
                
                if(this.isValid(matrix, number, [ row, column ] )){
                    matrix[row][column] = number;
                    
                    if(game) {
                        // Mark a single cell
                        game.board.markCell(row, column);
                    }


                    if(await this.solve(matrix)){
                        return true; 
                    } 

                    matrix[row][column] = 0;
                }
            }

            return false;
        }


    }

    this.isValid = (matrix, number, position) => {
        // Check single row
        for(let i = 0; i < matrix[0].length; i++) {
            if(matrix[position[0]][i] == number && position[1] != i) {
                return false;
            }
        }

        // Check single column
        for(let i = 0; i < matrix.length; i++) {
            if(matrix[i][position[1]] == number && position[0] != i) {
                return false;
            }
        }

        // Check single box
        // Find the box we're at
        // 0 to 2 
        const boxX = Math.floor(position[1] / 3);
        const boxY = Math.floor(position[0] / 3);

        for(let i = boxY * 3; i < boxY * 3 + 3; i++ ){
            for(let j = boxX * 3; j < boxX * 3 + 3; j++ ){
                if(matrix[i][j] == number) {
                    if(position[0] != i || position[1] != j) {
                        return false;
                    }
                }
            }
        }

        return true;
        
    }

    this.addEmpty = (matrix) => {
        for(let positionX = 0; positionX < 3; positionX ++) {
            for(let positionY = 0; positionY < 3; positionY ++) {
                const boxX = positionX;
                const boxY = positionY;
                let removedElements = 0;
                const suposeToRemove = Math.floor(random(3, 6));
                // console.log("boxX", boxX)
                // console.log("boxY", boxY)
                // console.log("suposeToRemove", suposeToRemove)

                while (removedElements < suposeToRemove) {
                    for(let i = boxY * 3; i < boxY * 3 + 3; i++ ){
                        for(let j = boxX * 3; j < boxX * 3 + 3; j++ ){
                            if(random() > 0.5) {
                                matrix[i][j] = 0;
                                removedElements ++;
                            }
                        }
                    }
                }
            }

        }
        
        return matrix;
        
    }

    this.randomInsertOneValue = (matrix) => {
        for (let i = Math.floor(random(0, 8)); i < 9; i++) {
            for (let j = Math.floor(random(0, 8)); j < 9; j++) {
                if(random() > 0.5) {
                    matrix[i][j] = Math.floor(random(1, 10));
                    return matrix;
                }
            }
        }
    }

    const findEmpty = (matrix) => {
        for(let i = 0; i < matrix.length; i++) {
            for(let j = 0; j < matrix[0].length; j++) {
                if(matrix[i][j] == 0) {
                    return [i, j];
                }
            }   
        }

        return false;
    };
}