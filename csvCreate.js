const fs = require('fs')
const cliProgress = require('cli-progress');

function csvCreate(headers, dataGenerator, rows, filename = `../csv/${Math.random().toString()}.csv`, stringLoops = Math.ceil(rows/10000)) {
    const b1 = new cliProgress.SingleBar({
        format: 'CLI Progress for ' + filename + ' |' + '| {bar} || {percentage}% || {value}/{total} Chunks',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    });
    b1.start(rows, 0);

    var wstream = fs.createWriteStream(filename)
    let stringToWrite
    wstream.write(headers)

    for (var i = 0; i < Math.ceil(rows/stringLoops); i++) {
        stringToWrite = ''
        for (var j = 0; j < stringLoops; j++) {
            stringToWrite += dataGenerator(i*stringLoops + j)
        }
        wstream.write(stringToWrite, (err) => {
            if (err) {
                console.log(err)
            }
            else if (j === stringLoops) {
                b1.stop()
            }
        })
        b1.increment(stringLoops)
    }
    wstream.end()
};

module.exports = csvCreate