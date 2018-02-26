class Addition {
	constructor(operands: number[]) {
		let map: number[][] = [[]];
		for (let i = 0; i < operands.length; i++) {
			map[i] = toNumberArray(operands[i]);
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

let a: number = "a";

let o: number[] = [97, 3, 400];
let add = new Addition(o);
