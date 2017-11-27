var halfSpacing = spacing/2;
var halfLength = halfSpacing * 0.8;
var x = spacing/2;
var y = spacing/2;
var xNum = 40;
var yNum = 25;
var sw = 6;
var numOfPixs = xNum * yNum;
var pattern = [];
var patternSystem = new PatternSystem(xNum, yNum);
var pattern = patternSystem.pattern;
var counter = 0;
var backgroundColour = 255;
var lineColour = 65;
var activePixels = [];
var activePixelIndex = [];

console.log('hit')

function setup() {
	createCanvas(xNum * spacing, yNum * spacing);
	// background(218,112,214);
	background(backgroundColour);

	stroke(lineColour);
	strokeWeight(sw);

	for(var i = 0, il = pattern.length; i < il; i++) {
		var col = i % xNum;
		var row = Math.floor(i / xNum);

		var x = col * spacing;
		var y = row * spacing;

		if(pattern[i] == 1) {
			line(x + spacing/2 - halfLength, y + halfSpacing, x + spacing/2 + halfLength, y + halfSpacing);
			// line(x, y + halfSpacing, x + spacing, y + halfSpacing);
		} else {
			line(x + spacing/2 -0.1, y + halfSpacing, x + spacing/2 + 0.1, y + halfSpacing);
		}
	}
}

function draw() {
	stroke(20,10, 100);
	strokeWeight(sw);

	for(var i = 0; i < 50; i++) {
		if(!patternSystem.activeSets[i]) {
			// while(true) {
			// 	var some = Math.floor(Math.random() * numOfPixs);
			// 	if(activePixelIndex.indexOf(some) == -1) {
			// 		activePixelIndex.push(some);
			// 		break;
			// 	}
			// }
			var some = Math.floor(Math.random() * numOfPixs);
			patternSystem.activeSets[i] = new ActivePixel(some, pattern[some], Math.random() * 0.01 + 0.01);
		} else {
			if (!patternSystem.activeSets[i].active) {
				patternSystem.activeSets[i] = 0;
				activePixelIndex.filter(function(index){return index != patternSystem.activeSets[i].i});
			} else {
				patternSystem.activeSets[i].run();
			}
		}
	}
}




/**
*
*/
function PatternSystem(xNum, yNum) {
	this.pattern = [];
	// this.activePixels = [];
	this.activeSets = new Array(40);

	for(var i = 0, n = xNum * yNum; i < n; i++) {
		this.pattern.push(binaryNumber());
	}
}

PatternSystem.prototype.getPixelNumber = function(i) {

};

PatternSystem.prototype.makeActiveSet = function() {

}

function ActivePixel(i, value, rate) {
	this.i = i;

	this.col = i % xNum;
	this.row = Math.floor(i / xNum);

	this.x = (i % xNum) * spacing;
	this.y = Math.floor(i / xNum) * spacing;

	this.start = value;
	this.end = value ? 0: 1;

	this.value = value;

	this.rate = rate;

	this.active = true;
}

ActivePixel.prototype.run = function() {
	this.update();
	this.render();
}

ActivePixel.prototype.update = function() {
	if(!this.active) return;

	if(!this.start) {
		if(this.value > 1) {
			pattern[this.i] = this.value = this.end;
			this.active = false;
		} else {
			this.value += this.rate;
		}
	} else {
		if(this.value < 0) {
			pattern[this.i] = this.value = this.end;
			this.active = false;
		} else {
			this.value -= this.rate;
		}
	}
}

ActivePixel.prototype.render = function() {
	this.hidePixel();
	this.drawPixel();
};

ActivePixel.prototype.hidePixel = function() {
	noStroke();
	fill(backgroundColour);
	rect(this.x, this.y, spacing, spacing);
}

ActivePixel.prototype.drawPixel = function() {
	stroke(lineColour);
	strokeWeight(sw);

	if(!this.active) {
		if(this.end == 1) {
			line(this.x + halfSpacing - halfLength, this.y + halfSpacing, this.x + halfSpacing + halfLength, this.y + halfSpacing);
		} else {
			line(this.x + spacing/2, this.y + halfSpacing, this.x + spacing/2, this.y + halfSpacing);
		}
	} else {
		line(this.x + spacing/2 - this.value * halfLength, this.y + halfSpacing, this.x + spacing/2 + this.value * halfLength, this.y + halfSpacing);
	}
}

/**
*
*/
function binaryNumber() {
	if(Math.random() < 0.6) return 0;
	else return 1;
}

function getPixelNumber() {

}
