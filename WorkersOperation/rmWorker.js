const {workerData, parentPort} = require('worker_threads');
const fs = require('fs');

function getCurrentDirectory() {
    return process.cwd();
}

const getDirectory = getCurrentDirectory();
fs.unlink(workerData, (err) => {
    if (err) {
        parentPort.postMessage('Operation failed ' + err);
        parentPort.postMessage(`You are currently in ${getDirectory}`);
    }
    else {
        parentPort.postMessage('File was deleted\n' + `You are currently in ${getDirectory}`);
    }
});