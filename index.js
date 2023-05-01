const process = require("process");
const { puppeteerDataScrapper } = require("./scrapper.js");

let title = process.argv[2];
let noOfJobs = process.argv[3];

//here to get the arguments from ther termial for each dynamic query we can perform and no of results limit
const getAllJobsData = async (title, noOfJobs) => {
  try {
    console.log(title, noOfJobs);
    await puppeteerDataScrapper(title, noOfJobs);
  } catch (error) {
    console.log(error)
  }
};
getAllJobsData(title, noOfJobs);
