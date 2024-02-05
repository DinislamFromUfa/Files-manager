const {workerData, parentPort} = require('worker_threads');
const fs = require('fs');


const readableStream = fs.createReadStream(workerData.old_path);
const writableStream = fs.createWriteStream(workerData.new_path);
function getCurrentDirectory() {
    return process.cwd();
}
const getDirectory = getCurrentDirectory();

readableStream.on('error', (err) => {
    parentPort.postMessage(`Operation failed: ${err}`);
    parentPort.postMessage(`You are currently in ${getDirectory}`);
});

writableStream.on('error', (err) => {
    parentPort.postMessage(`Operation failed: ${err}`);
    parentPort.postMessage(`You are currently in ${getDirectory}`);
});
  
writableStream.on('finish', () => {
    parentPort.postMessage('File copied successfully ');
    parentPort.postMessage(`You are currently in ${getDirectory}`);
});

readableStream.pipe(writableStream);