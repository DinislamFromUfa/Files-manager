const {workerData, parentPort} = require('worker_threads');
const fs = require('fs');

const readStream = fs.createReadStream(workerData.old_path);
const writeStream = fs.createWriteStream(workerData.new_path);

function getCurrentDirectory() {
    return process.cwd();
}

const getDirectory = getCurrentDirectory();

readStream.pipe(writeStream);

readStream.on('end', () => {
    fs.unlink(workerData.old_path, (err) => {
        if (err) {
            parentPort.postMessage('Operation failed' + err);
            parentPort.postMessage(`You are currently in ${getDirectory}`);
        }
        else {
            parentPort.postMessage('File was moved');
            parentPort.postMessage(`You are currently in ${getDirectory}`);
        }
    });
})