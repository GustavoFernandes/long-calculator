window.onload = init;

function init() {
	let textarea: any = document.getElementById('textarea');
	if (!textarea) return;
	textarea.onkeypress = function(keypress: any) {
		console.log(keypress);

		// TODO: add support for backspace and delete

		if (keypress.key === '+') {
			keypress.preventDefault();
			if (textarea.value.endsWith('+ ') || textarea.value.length === 0) return;
			if (textarea.value.includes('+ ')) textarea.value = textarea.value.replace('+ ', '');
			textarea.value += '\n+ ';
		} else if (keypress.key === 'Enter') {
			keypress.preventDefault();
			if (textarea.value.includes('+ ')) {

				if (textarea.value.endsWith('+ ')) {
					// move '+ ' to before the previous number (e.g. '1\n2\n+ ' => '1\n+ 2')
					textarea.value = textarea.value.replace('\n+ ', '');
					let lastNewlineIndex = textarea.value.lastIndexOf('\n') + 1;
					textarea.value = [textarea.value.slice(0, lastNewlineIndex), '+ ', textarea.value.slice(lastNewlineIndex)].join('');
				}
				
				let n: number[] = parseAddition(textarea.value);
				display(new Addition(n), textarea);
			}
		} else if (keypress.which < 48 || keypress.which > 57) {
			keypress.preventDefault();
		}
	}
}

function parseAddition(s: string): number[] {
	let tokens: string[] = s.split('\n');
	if (tokens[tokens.length - 1].length === 2) { // if last token is '+ '
		tokens.pop();
	} else { // last token contains '+ '
		tokens[tokens.length - 1] = tokens[tokens.length - 1].substr(2);
	}
	return tokens.map(Number);
}

function display(a: Addition, textarea: any) {

	// TODO: remove unnecessary carries (.e.g. '45+1' has '000' carry)

	// TODO: make dashed line as long as longest line
	// TODO: use something like string padding to create this?
	let dashedLine: string = '';
	for (let i = 0; i < a.sum.length + 2; i++) {
		dashedLine += '-';
	}

	textarea.value = a.carry.reverse().join('') + '\n' +
			textarea.value + '\n' +
			dashedLine + '\n' +
			a.sum.reverse().join('');
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

// converts 456 to [6,5,4]
function toNumberArray(n: number): number[] {
	let a: number[] = [];
	while (n > 0) {
		a[a.length] = n % 10;
		n = Math.floor(n / 10);
	}
	return a;
}
