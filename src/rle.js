let fs = require('fs');
let arg = process.argv;
let inText;
let resultStr = "";
let temporaryStr = "";
let i = 0;
let n = 1;
let nJump = 0;
let resultOrInput = "";
let codeOrDecord = "";

function read(inFile) {
    try {
        inText = fs.readFileSync(inFile, "utf-8");
        return inText.toString();
    }
    catch (e) {
        return undefined;
    }
}

function message(message, inputOrResult) {
    console.log("Success!!!!!");
    console.log(`Length of the ${inputOrResult} string: `, message);
    if (inputOrResult === "result") {
        resultOrInput = "input";
        codeOrDecord = "code";
    }
    else {
        resultOrInput = "result";
        codeOrDecord = "decode";
    }
    console.log(`You can compare it with the ${resultOrInput} string in the ${codeOrDecord} mode`);
}

function codeEscape(inFile) {
    inText = read(inFile);
    if (inText == undefined || inText == "")
        return undefined;
    while (i < inText.length) {
        while (inText.charAt(i) == inText.charAt(i + n))
            n++;
        nJump = n;
        while (n >= 258) {
            resultStr += '#' + String.fromCharCode(255) + inText.charAt(i);
            n -= 258;
        }
        if (inText.charAt(i) == '#')
            resultStr += '#' + String.fromCharCode(n) + inText.charAt(i);
        else if (n > 3)
            resultStr += '#' + String.fromCharCode(n - 3) + inText.charAt(i);
        else
            for (k = 0; k < n; k++)
                resultStr += inText.charAt(i);
        i += nJump;
        n = 1;
    }
    message(inText.length, "input");
    return resultStr;
}
function decodeEscape(outFile) {
    inText = read(outFile);
    if (inText == undefined || inText == "")
        return undefined;
    while (i < inText.length) {
        if (inText.charAt(i) == '#') {
            if (inText.charAt(i + 2) == '#') {
                for (k = 0; k < inText.charCodeAt(i + 1); k++)
                    resultStr += inText.charAt(i + 2);
            }
            else {
                for (k = 0; k < inText.charCodeAt(i + 1) + 3; k++)
                    resultStr += inText.charAt(i + 2);
            }
            i += 3;
        }
        else {
            resultStr += inText.charAt(i);
            i += 1;
        }
    }
    message(resultStr.length, "result");
    return resultStr;
}

function codeJump(inFile) {
    inText = read(inFile);
    if (inText == undefined || inText == "")
        return undefined;
    while (i < inText.length) {
        while (inText.charAt(i) == inText.charAt(i + n))
            n++;
        nJump = n;
        while (n >= 129) {
            resultStr += String.fromCharCode(126 + 129) + inText.charAt(i);
            n -= 129;
        }
        if (n > 1)
            resultStr += String.fromCharCode(126 + n) + inText.charAt(i);
        else
            nJump--;
        i += nJump;
        while (inText.charAt(i) != inText.charAt(i + 1) && temporaryStr.length < 128) {
            temporaryStr += inText.charAt(i);
            i++;
        }
        if (temporaryStr != "")
            resultStr += String.fromCharCode(temporaryStr.length) + temporaryStr;
        temporaryStr = "";
        n = 1;
    }
    message(inText.length, "input");
    return resultStr;
}

function decodeJump(outFile) {
    inText = read(outFile);
    if (inText == undefined || inText == "")
        return undefined;
    while (i < inText.length) {
        if (inText.charCodeAt(i) < 128) {
            var symbolsCount = inText.charCodeAt(i);
            for (k = 0; k < symbolsCount; k++) {
                resultStr += inText.charAt(i + 1);
                i++;
            }
            i += 1;
        }
        else {
            for (k = 0; k < inText.charCodeAt(i) - 126; k++)
                resultStr += inText.charAt(i + 1);
            i += 2;
        }
    }
    message(resultStr.length, "result");
    return resultStr;
}

function GetNeededFunction(mode, codingAlgorithm) {
    if (mode == "code") {
        if (codingAlgorithm == "escape")
            return codeEscape;
        else if (codingAlgorithm == "jump")
            return codeJump;
        else
            console.log("You need to choose escape or jump mode");

    }
    else if (mode == "decode") {
        if (codingAlgorithm == "escape")
            return decodeEscape;
        else if (codingAlgorithm == "jump")
            return decodeJump;
        else
            console.log("You need to choose escape or jump mode");
    }
    else
        console.log("You need to choose code or decode mode");
}

var fun = GetNeededFunction(arg[2], arg[3]);
if (fun != undefined) {
    let r = fun(arg[4]);
    if (r != undefined) {
        fs.writeFileSync(arg[5], r);
    }
    else {
        console.log("Sorry your file is empty or not exist.")
    }
}
else {
    console.log("file is empty");
}