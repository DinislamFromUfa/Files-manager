const {exec, spawn} = require('child_process');
const readline = require('readline');
const os = require('os');
const { stdout, stderr, stdin } = require('process');
const fs = require('fs');
const { isMainThread, workerData, Worker } = require('worker_threads');
const path = require('path');




let Username;
let path_to_working_directory = os.homedir();
try {
    const args = process.argv.slice(2);
    args.forEach((arg) => {
    const [param, value] = arg.split('=');
    if (param === '--username') {
        Username = value;
    }
});
}

catch (err) {
    console.log('Have problems on entering...' + err);
}

console.log(`Welcome to the File Manager, ${Username}!\n`);
exec(`cd ${path_to_working_directory}`, (err, stdout, stderr) => {
    console.log(`You are currently in ${path_to_working_directory}`);
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const commands = ['up', 'cd', 'ls', 'cat', 'add', 'rn', 'cp', 'mv', 'rm',
                'os --EOL', 'os --cpus', 'os --homedir', 'os --username', 
                'os --architecture', 'hash', 'compress', 'decompress'];
if (isMainThread) {
    rl.on('line', (answer) => {
        if (answer.startsWith('rm')) {
            const filePath = answer.substring(3).trim();
            const worker = new Worker(path.resolve(__dirname, 'WorkersOperation', 'rmWorker.js'), {
                workerData: filePath
            });
            worker.on('message', (msg) => {
                console.log(msg);
            });
        }

        if (answer.startsWith('add')) {
            const filePath = answer.substring(3).trim();
            const worker = new Worker(path.resolve(__dirname, 'WorkersOperation', 'addWorker.js'), {
                workerData: filePath
            });
            worker.on('message', (msg) => {
                console.log(msg);
            });
        }

        if (answer.startsWith('rn')) {
            const filePath = answer.split(' ', 3);
            let filename = filePath[2];
            let path_to_file = filePath[1];
            const worker = new Worker(path.resolve(__dirname, 'WorkersOperation', 'rnWorker.js'), {
                workerData: {
                    currentFileName: path_to_file,
                    newFileName: filename
                }
            });
            worker.on('message', (msg) => {
                console.log(msg);
            });
        }

        if (answer.startsWith('cat')) {
            const filePath = answer.substring(3).trim();
            const worker = new Worker(path.resolve(__dirname, 'WorkersOperation', 'catWorker.js'), {
                workerData: filePath
            });
            worker.on('message', (msg) => {
                console.log(msg);
            });
        }
        
        if (answer.startsWith('cp')) {
            const file_path = answer.split(' ', 3);
            const old_file_path = file_path[1];
            const new_file_path = file_path[2];
            const worker = new Worker(path.resolve(__dirname, 'WorkersOperation', 'cpWorker.js'), {
                workerData: {
                    old_path: old_file_path,
                    new_path: new_file_path
                }});
            worker.on('message', (msg) => {
                console.log(msg);
            });
        }
        if (answer.startsWith('hash')) {
            const file_path = answer.substring(4).trim();
            const worker = new Worker(path.resolve(__dirname, 'WorkersOperation', 'hashWorker.js'), {
                workerData: file_path
            });
            worker.on('message', (msg) => {
                console.log(msg);
            })
        }
        if (answer.startsWith('mv')) {
            const file_path = answer.split(' ', 3);
            const old_file_path = file_path[1];
            const new_file_path = file_path[2];
            const worker = new Worker(path.resolve(__dirname, 'WorkersOperation', 'mvWorker.js'), {
                workerData: {
                    old_path: old_file_path,
                    new_path: new_file_path
                }
            });
            worker.on('message', (msg) => {
                console.log(msg);
            })
        }
        if (answer.startsWith('compress')) {
            const dir_path = answer.split(' ', 2);
            const file_path = dir_path[1];
            const worker = new Worker(path.resolve(__dirname, 'workersOperation', 'compress.js'), {
                workerData: file_path
            })
            worker.on('message', (msg) => {
                console.log(msg);
            })
        }
        if (answer.startsWith('decompress')) {
            const dir_path = answer.split(' ', 2);
            const file_path = dir_path[1];
            const worker = new Worker(path.resolve(__dirname, 'workersOperation', 'compress.js'), {
                workerData: file_path
            })
            worker.on('message', (msg) => {
                console.log(msg);
            })
        }
        if (answer.startsWith('cd')) {
            const dir_path = answer.substring(2).trim();
            fs.access(dir_path, (err) => {
              if (err) {
                console.error('Operation failed');
              } else {
                process.chdir(dir_path);
                const currentDirectory = process.cwd();
                console.log('You are currently in ', currentDirectory);
              }
            });
        }
        if (answer === '.exit') {
            rl.close();
        }
        if (answer === 'os --EOL') {
            return console.log(`${JSON.stringify(os.EOL)}\n` + `You are currently in ${getDirectory}`);
        }
        if (answer === 'os --cpus') {
            return console.log(`overall amount of CPUS:${os.cpus().length}`) + os.cpus().forEach((element) => {
                console.log(`Model is ${element.model}, speed is ${element.speed / 1000} GHz\n` + `You are currently in ${getDirectory}`)
            });
        }
        if (answer === 'os --homedir') {
            return console.log(`${os.homedir()}\n You are currently in ${getDirectory}`);
        }
        if (answer === 'os --username') {
            return console.log(`os.hostname()\n You are currently in ${getDirectory}`);
        }
        if (answer === 'os --architecture') {
            return console.log(`${os.arch()}\n You are currently in ${getDirectory}`);
        }
    });
}



rl.on('error', (err) => {
    console.log('Fail: ', err);
});

rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${Username}, goodbye!`);
    process.exit(0);
});

function Move_on_directory(path_to_working_directory) {
    process.chdir(path_to_working_directory);
    console.log(`You are currently in ${path_to_working_directory}`);
}

function getCurrentDirectory() {
    return process.cwd();
}
const getDirectory = getCurrentDirectory();


    

    

