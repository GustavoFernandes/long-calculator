describe("toNumberArray", function () {
  it("converts numbers to digits array", function () {
    let a = 6789;
    let b = [9,8,7,6];
    expect(toNumberArray(a)).toEqual(b);
  })
});

describe("add", function () {
  it("adds 2 numbers", function () {
    let a = addTwoNumbers(5,2);
    expect(a).toBe(7);
  })
});

describe('double', function () {
  it('doubles the number', function () {
    expect(double(16)).toBe(32);
  })
});

describe('addition', function () {
  it ('does long addition', function () {

    /*
     [3 2 1 0] <- array index
      0 1 1 0 <- carry
          9 7
            3
        4 0 0
        1 7 8
       ------
        6 7 8 <- sum
    */

    let a = new Addition([97, 3, 400, 178]);
    expect(a.map).toEqual([
      [7,9],
      [3],
      [0,0,4],
      [8,7,1]
    ]);
    expect(a.sum).toEqual([8,7,6]);
    expect(a.carry).toEqual([0,1,1,0]);
  });
});
