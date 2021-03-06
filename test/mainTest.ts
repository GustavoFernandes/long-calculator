describe('toNumberArray', function () {
  it('converts numbers to digits array', function () {
    let a = 6789;
    let b = [9,8,7,6];
    expect(toNumberArray(a)).toEqual(b);
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

    let b = new Addition([3,7]);
    expect(b.map).toEqual([[3],[7]]);
    expect(b.sum).toEqual([0,1]);
    expect(b.carry).toEqual([0,1]);

    let c = new Addition([6578, 899, 7877, 99999, 77]);
    expect(c.carry).toEqual([0, 4, 4, 3, 2, 1]);
    expect(c.sum).toEqual(toNumberArray(115430));
  });
});

describe('addition parser', function () {
  it ('parses addition text into a number array', function () {
    expect(parseAddition('1\n+ 2')).toEqual([1,2]);
    expect(parseAddition('1\n2\n+ ')).toEqual([1,2]);
  });
});
