window.onload = init;

function init() {
	let textarea = document.getElementById('textarea');
	if (!textarea) return;
	textarea.onkeypress = function(keypress) {
		console.log(keypress);

		// TODO: add support for backspace and delete

		if (keypress.key === '+') {

			// TODO: don't let a new line get created if no numbers have been inputted

			if (textarea.value.indexOf('+')) textarea.value = textarea.value.replace('+ ', '');
			textarea.value += '\n+ ';
			keypress.preventDefault();
		} else if (keypress.key === 'Enter') {
			if (textarea.value.indexOf('+')) parseAddition(textarea.value);
			keypress.preventDefault();
		} else if (keypress.which < 48 || keypress.which > 57) {
			keypress.preventDefault();
		}
	}
}

function parseAddition(s: string) {
	// TODO
}

class Addition {

	readonly map: number[][];
	readonly sum: number[];
	readonly carry: number[];

	constructor(operands: number[]) {
		this.map = [[]];
		let longestNumber: number = -1;
		for (let i = 0; i < operands.length; i++) {
			this.map[i] = toNumberArray(operands[i]);
			longestNumber = Math.max(this.map[i].length, longestNumber);
		}

		this.carry = [0];
		this.sum = [0];
		for (let c = 0; c < longestNumber; c++) {
			let columnSum: number = 0;
			for (let r = 0; r < this.map.length; r++) {
				columnSum += this.map[r][c] ? this.map[r][c] : 0;
			}

			columnSum += this.carry[c];
			this.sum[c] = columnSum % 10;
			this.carry[c + 1] = Math.floor(columnSum / 10);
		}

		// check for any remaining carry
		if (this.carry[longestNumber]) this.sum[longestNumber] = this.carry[longestNumber];
	}
}

function toNumberArray(n: number): number[] {
	let a: number[] = [];
	while (n > 0) {
		a[a.length] = n % 10;
		n = Math.floor(n / 10);
	}
	return a;
}
