'use strict';
var os = require('os');
var md5 = require('MD5');

function chunkSubstr(str, size) {
    var numChunks = str.length / size + 0.5 | 0,
        chunks = new Array(numChunks);

    for (var i = 0, o = 0; i < numChunks; ++i, o += size) {
        chunks[i] = str.substr(o, size);
    }

    return chunks;
}

var bigrandom = function bigrandom() {
    var salt = arguments[0] === undefined ? 's' : arguments[0];

    return md5(salt + Math.random() + Math.random() + Math.random() + Math.random() + new Date().getTime() + JSON.stringify(arguments) + os.hostname() + os.freemem() + JSON.stringify(os.cpus()) + JSON.stringify(os.networkInterfaces()) + JSON.stringify(os.loadavg()) + process.pid + process.hrtime() + process.memoryUsage() + os.uptime());
};

function randomString() {
    var salt = arguments[0] === undefined ? 'random-guid' : arguments[0];

    return bigrandom(salt);
}
exports.randomString = randomString;

function randomGuid() {
    var numberOfBlocks = arguments[0] === undefined ? 4 : arguments[0];
    var blockLength = arguments[1] === undefined ? 4 : arguments[1];
    var salt = arguments[2] === undefined ? 'random-guid' : arguments[2];

    var strLength = numberOfBlocks * blockLength;
    var randomString = bigrandom();
    while (strLength > 32) {
        randomString += bigrandom();
        strLength -= 32;
    }
    var chunks = chunkSubstr(randomString, blockLength);
    var chunkedArray = chunks.map(function (v) {
        return v.toString(16);
    });
    var output = [chunkedArray[0]];
    var i = chunkedArray.length;

    for (var _i = 1; _i < numberOfBlocks; _i++) {
        output.push(chunkedArray[_i]);
    }
    return output.join('-');
    //return chunks.map(v => v.toString(16)).join('-');
}
exports.randomGuid = randomGuid;

//generate a guid that is tested unique against id's on the current doc
function domSafeRandomGuid() {
    var numberOfBlocks = arguments[0] === undefined ? 4 : arguments[0];

    function s4() {
        return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
    }

    var output = '';
    var num = numberOfBlocks;
    while (num > 0) {
        output += s4();
        if (num > 1) output += '-';
        num--;
    }

    if (null === document.getElementById(output)) {
        return output;
    } else {
        domSafeRandomGuid(numberOfBlocks);
    }
}
exports.domSafeRandomGuid = domSafeRandomGuid;

