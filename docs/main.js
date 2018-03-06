window.onload = init;
function init() {
    var textarea = document.getElementById('textarea');
    if (!textarea)
        return;
    textarea.onkeypress = function (keypress) {
        console.log(keypress);
        // TODO: add support for backspace and delete
        if (keypress.key === '+') {
            keypress.preventDefault();
            if (textarea.value.endsWith('+ ') || textarea.value.length === 0)
                return;
            if (textarea.value.includes('+ '))
                textarea.value = textarea.value.replace('+ ', '');
            textarea.value += '\n+ ';
        }
        else if (keypress.key === 'Enter') {
            keypress.preventDefault();
            if (textarea.value.includes('+ ')) {
                if (textarea.value.endsWith('+ ')) {
                    // move '+ ' to before the previous number (e.g. '1\n2\n+ ' => '1\n+ 2')
                    textarea.value = textarea.value.replace('\n+ ', '');
                    var lastNewlineIndex = textarea.value.lastIndexOf('\n') + 1;
                    textarea.value = [textarea.value.slice(0, lastNewlineIndex), '+ ', textarea.value.slice(lastNewlineIndex)].join('');
                }
                var n = parseAddition(textarea.value);
                display(new Addition(n), textarea);
            }
        }
        else if (keypress.which < 48 || keypress.which > 57) {
            keypress.preventDefault();
        }
    };
}
function parseAddition(s) {
    var tokens = s.split('\n');
    if (tokens[tokens.length - 1].length === 2) {
        tokens.pop();
    }
    else {
        tokens[tokens.length - 1] = tokens[tokens.length - 1].substr(2);
    }
    return tokens.map(Number);
}
function display(a, textarea) {
    // TODO: remove unnecessary carries (.e.g. '45+1' has '000' carry)
    // TODO: make dashed line as long as longest line
    // TODO: use something like string padding to create this?
    var dashedLine = '';
    for (var i = 0; i < a.sum.length + 2; i++) {
        dashedLine += '-';
    }
    textarea.value = a.carry.reverse().join('') + '\n' +
        textarea.value + '\n' +
        dashedLine + '\n' +
        a.sum.reverse().join('');
}
var Addition = /** @class */ (function () {
    function Addition(operands) {
        this.map = [[]];
        var longestNumber = -1;
        for (var i = 0; i < operands.length; i++) {
            this.map[i] = toNumberArray(operands[i]);
            longestNumber = Math.max(this.map[i].length, longestNumber);
        }
        this.carry = [0];
        this.sum = [0];
        for (var c = 0; c < longestNumber; c++) {
            var columnSum = 0;
            for (var r = 0; r < this.map.length; r++) {
                columnSum += this.map[r][c] ? this.map[r][c] : 0;
            }
            columnSum += this.carry[c];
            this.sum[c] = columnSum % 10;
            this.carry[c + 1] = Math.floor(columnSum / 10);
        }
        // check for any remaining carry
        if (this.carry[longestNumber])
            this.sum[longestNumber] = this.carry[longestNumber];
    }
    return Addition;
}());
// converts 456 to [6,5,4]
function toNumberArray(n) {
    var a = [];
    while (n > 0) {
        a[a.length] = n % 10;
        n = Math.floor(n / 10);
    }
    return a;
}
