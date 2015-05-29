"use strict";
var os = require('os');
var md5 = require('MD5');

function chunkSubstr(str, size) {
  var numChunks = str.length / size + 0.5 | 0,
      chunks = new Array(numChunks);

  for(var i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }

  return chunks;
}

var bigrandom = function bigrandom(salt="s") {
    return md5(salt + Math.random() + 
               Math.random() + Math.random() + Math.random() +
               new Date().getTime() +
               JSON.stringify(arguments) +
               os.hostname() +
               os.freemem() +
               JSON.stringify(os.cpus()) +
               JSON.stringify(os.networkInterfaces()) +
               JSON.stringify(os.loadavg()) +
               ('pid' in process ? process.pid : '' )+
               ('hrtime' in process ? process.hrtime() : '' )+
               ('memoryUsage' in process ? process.memoryUsage() : '' )+
               ('uptime' in os ? os.uptime() : '' )
               );
}

function randomString(salt = "random-guid") {
    return bigrandom(salt);
    }
exports.randomString = randomString;

function randomGuid(numberOfBlocks = 4, 
        blockLength = 4, 
        salt = "random-guid") {
    let strLength=numberOfBlocks * blockLength;
    let rnd = bigrandom();
    while(strLength > 32){
        rnd += bigrandom();
        strLength -= 32;
    }
    const chunks=chunkSubstr(rnd,blockLength);
    const chunkedArray = chunks.map(v => v.toString(16));
    let output=[chunkedArray[0]];
    let i = chunkedArray.length;
   
    for(let i = 1; i < numberOfBlocks; i++){
        output.push(chunkedArray[i]);
    }
    return output.join('-');
    //return chunks.map(v => v.toString(16)).join('-');
    }
exports.randomGuid = randomGuid;

//generate a guid that is tested unique against id's on the current doc
function domSafeRandomGuid(numberOfBlocks = 4) {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    var output = '';
    var num = numberOfBlocks;
    while (num > 0) {
        output += s4();
        if (num > 1) output += "-";
        num--;
    }

    if (null === document.getElementById(output)) {
        return output;
    } else {
        return domSafeRandomGuid(numberOfBlocks);
    }
}
exports.domSafeRandomGuid = domSafeRandomGuid;