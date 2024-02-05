const {workerData, parentPort} = require('worker_threads');
const fs = require('fs');
const path = require('path');

function getCurrentDirectory() {
    return process.cwd();
}
const getDirectory = getCurrentDirectory();

const {currentFileName, newFileName} = workerData;
const directory = path.dirname(currentFileName);
const newFilePath = path.join(directory, newFileName);
fs.rename(currentFileName, newFilePath, (err) => {
    if (err) {
        parentPort.postMessage('Operation failed ' + err);
        parentPort.postMessage(`You are currently in ${getDirectory}`);
    }
    else {
        parentPort.postMessage(`Renamed filename from ${currentFileName} to ${newFileName}`);
        parentPort.postMessage(`You are currently in ${getDirectory}`);
    }
});