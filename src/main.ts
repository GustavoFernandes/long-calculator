class Addition {
	constructor(operands: number[]) {
		let map: number[][] = [[]];
		let longestNumber: number = -1;
		for (let i = 0; i < operands.length; i++) {
			map[i] = toNumberArray(operands[i]);
			longestNumber = Math.max(map[i].length, longestNumber);
		}

		let carry: number[] = [0];
		let sum: number[] = [0];
		for (let c = 0; c < longestNumber; c++) {
			let columnSum: number = 0;
			for (let r = 0; r < map.length; r++) {
				let n: number = map[r][c];
				if (n === undefined) n = 0;
				columnSum += n;
			}

			columnSum += carry[c];
			sum[c] = columnSum % 10;
			carry[c + 1] = Math.floor(columnSum / 10);
		}
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

function addTwoNumbers(a: number, b: number): number {
	return a + b;
}

function double(a: number): number {
	return a*2;
}

let o: number[] = [97, 3, 400, 178];
let add = new Addition(o);
