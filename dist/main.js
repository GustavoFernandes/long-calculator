var Addition = /** @class */ (function () {
    function Addition(operands) {
        var map = [[]];
        for (var i = 0; i < operands.length; i++) {
            map[i] = toNumberArray(operands[i]);
        }
    }
    return Addition;
}());
function toNumberArray(n) {
    var a = [];
    while (n > 0) {
        a[a.length] = n % 10;
        n = Math.floor(n / 10);
    }
    return a;
}
function addTwoNumbers(a, b) {
    return a + b;
}
function double(a) {
    return a * 2;
}
var a = "a";
var o = [97, 3, 400];
var add = new Addition(o);
