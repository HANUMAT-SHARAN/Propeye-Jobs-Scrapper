const fs = require("fs");
//this addData json format function will takes all jobs from response and search job paramater for dynamic files name
function addDataInJsonFormat(allJobs, searchJob) {
  fs.writeFile(
    `${searchJob}${Math.floor(Math.random() * 975586756)}.json`,
    JSON.stringify(allJobs),
    (err) => {
      if (err) throw err;
      console.log("Scrapped data and uploaded In Json Format successs");
    }
  );
}

//this function is used for checking length so that that number of results user wants can only stored in json file
function checkingLength(allJobs, number) {
  let finalData = [];
  
  let count = 0;
  while (finalData.length < number) {
    if (allJobs[count] == undefined) {
      return finalData;
    }
    finalData.push(allJobs[count]);
    count++;
  }
  return finalData;
}

module.exports = { addDataInJsonFormat, checkingLength };
