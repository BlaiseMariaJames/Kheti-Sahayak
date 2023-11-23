// Create a child process
const { spawn } = require("child_process");

// Run backend python code on our JSON object
const connect = async (object, option) => {
    return new Promise((resolve, reject) => {
        object.option = option;
        const pythonProcess = spawn("python", ["backend/Kheti Sahayak.py", JSON.stringify(object)]);
        if(option == 1){
            delete object.api_key;
        }
        delete object.option;
        // Variable to store error message from Python
        let errorMessage = '';
        // Capture error output from Python
        pythonProcess.stderr.on('data', (data) => {
            errorMessage += data.toString();
        });
        // Got a response from python on execution
        pythonProcess.stdout.on('data', (data) => {
            const response = JSON.parse(data.toString());
            return resolve(response);
        });
        // Failed to recieve an response from python
        pythonProcess.on('error', (error) => {
            return reject(error);
        });
        pythonProcess.on('exit', (code, signal) => {
            if (code === 0) {
                // Executed but no response
                return resolve('Python process exited successfully');
            } else {
                // Execution failed
                return reject(errorMessage);
            }
        });
    });
};

module.exports = connect;