const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

const convert = async (fileIn = 'customer-data.csv') => {
    // Function to actually do the work of converting
    const convertFile = (fileIn, fileOut) => {
        const converter = csv({objectMode:true});
        try {
            // Converter is asynchronous, so we pass some promise callbacks
            converter.fromFile(fileIn).then((obj) => { 
                // Signal success and write out result
                console.log('Object parsed');
                fs.writeFileSync(fileOut, JSON.stringify(obj, null, 2));
                console.log(fileOut);
            }, (error) => {
                throw error;
            });
        } catch (error) {
            console.log("Parse failed: ", error);
        }
    }

    if(!path.isAbsolute(fileIn)) {
        fileIn = path.join(__dirname, fileIn);
    }
    
    // For the file out, just change the extension to 'json'
    let fileObj = path.parse(fileIn);
    fileObj.ext = '.json';
    delete fileObj.base;    // delete the base element so that name + ext is used
    let fileOut = path.format(fileObj);

    convertFile(fileIn, fileOut);
} 

convert(process.argv[2]);
