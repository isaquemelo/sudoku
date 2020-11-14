// - Cell:
// 	- props:
// 		- position: [x: x, y: y]
// 		- value
// 		- color
		
// 	- methods:
// 		- draw() - ok
// 		- highlight(colorCode) - ok~~

const defaultColor = '255';
const defaultHightlighColor = 'rgba(255,255,255,0.2)';
const cellSize = 50;

function Cell(value = 0, position = { x: 0, y: 0 }, color = defaultColor) {
	this.value = value;
	this.position = position;
	this.color = color;

	this.show = function() {
		noFill();
        stroke(this.color);
		rect(this.position.x, this.position.y, cellSize, cellSize);
		
        if (this.value != 0) {
            fill(this.color);
            textSize(32);
            text(this.value, this.position.x + 15, this.position.y + 35);
		}		
	}

	this.highlight = function() {
		fill(defaultHightlighColor);
        stroke(this.color);
        rect(this.position.x, this.position.y, cellSize, cellSize);
	}
}