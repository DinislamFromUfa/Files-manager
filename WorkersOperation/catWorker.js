const {workerData, parentPort} = require('worker_threads');
const fs = require('fs');

function getCurrentDirectory() {
    return process.cwd();
}
const getDirectory = getCurrentDirectory();

const readStream = fs.createReadStream(workerData, { encoding: 'utf8' });

readStream.on('data', (chunk) => {
    parentPort.postMessage(chunk.toString());
    parentPort.postMessage(`You are currently in ${getDirectory}`);
});

readStream.on('error', (err) => {
    parentPort.postMessage('Operation failed ' + err);
    parentPort.postMessage(`You are currently in ${getDirectory}`);
});