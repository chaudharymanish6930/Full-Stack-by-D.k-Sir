// console.log("start");
// setTimeout(() => {
//   console.log("Data Loaded");
// }, 2000);
// console.log("end");

function processData(callback) {
    console.log("Processing data...");
    callback();
}

function done(){
    console.log("Data Processed");
}

processData(done);