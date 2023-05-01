const process = require("process");
const { puppeteerDataScrapper } = require("./scrapper");

let title = process.argv[2];
let noOfJobs = process.argv[3];

const getAllJobsData = async (title, noOfJobs) => {
  try {
    console.log(title, noOfJobs);
    await puppeteerDataScrapper(title, noOfJobs);
  } catch (error) {
    console.log(error)
  }
};
getAllJobsData(title, noOfJobs);
