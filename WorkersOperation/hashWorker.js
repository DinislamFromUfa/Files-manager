const {workerData, parentPort} = require('worker_threads');
const fs = require('fs');
const crypto = require('crypto');


function getCurrentDirectory() {
    return process.cwd();
}
const getDirectory = getCurrentDirectory();

const ReadStream = fs.createReadStream(workerData);
const hash = crypto.createHash('sha256');
ReadStream.on('data', (chunk) => {
    hash.update(chunk);
});

ReadStream.on('end', () => {
    const Value = hash.digest('hex');
    parentPort.postMessage(Value);
    parentPort.postMessage(`You are currently in ${getDirectory}`);
});

ReadStream.on('error', (err) => {
    parentPort.postMessage('Operation failed ' + err);
    parentPort.postMessage(`You are currently in ${getDirectory}`);
});

