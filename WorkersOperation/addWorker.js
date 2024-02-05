const {workerData, parentPort} = require('worker_threads');
const fs = require('fs');

function getCurrentDirectory() {
    return process.cwd();
}
const getDirectory = getCurrentDirectory();
fs.writeFile(workerData, '', (err) => {
    if (err) {
        parentPort.postMessage('Operation failed ' + err + ` You are currently in ${getDirectory}`);
    } else {
        parentPort.postMessage('File was created\n ' + `You are currently in ${getDirectory}`);
    }
});