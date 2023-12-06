// CREATE A CHILD PROCESS
const { spawn } = require("child_process");

// DEFINING FUNCTION TO RUN BACKEND PYTHON CODE ON OUR JSON OBJECT
const connect = async (object, option) => {
    return new Promise((resolve, reject) => {
        object.option = option;
        const pythonProcess = spawn("python", ["backend/Kheti Sahayak.py", JSON.stringify(object)]);
        if(option == 1){
            delete object.api_key;
        }
        delete object.option;
        // VARIABLE TO STORE ERROR MESSAGE FROM PYTHON
        let errorMessage = '';
        // CAPTURE ERROR OUTPUT FROM PYTHON
        pythonProcess.stderr.on('data', (data) => {
            errorMessage += data.toString();
        });
        // GOT A RESPONSE FROM PYTHON ON EXECUTION
        pythonProcess.stdout.on('data', (data) => {
            const response = JSON.parse(data.toString());
            return resolve(response);
        });
        // FAILED TO RECEIVE A RESPONSE FROM PYTHON
        pythonProcess.on('error', (error) => {
            return reject(error);
        });
        pythonProcess.on('exit', (code, signal) => {
            if (code === 0) {
                // EXECUTED BUT NO RESPONSE
                return resolve('Python process exited successfully');
            } else {
                // EXECUTION FAILED
                return reject(errorMessage);
            }
        });
    });
};

module.exports = connect;