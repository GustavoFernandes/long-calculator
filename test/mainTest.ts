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
})
