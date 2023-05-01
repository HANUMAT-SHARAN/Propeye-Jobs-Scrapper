const puppeteer = require("puppeteer");
const { addDataInJsonFormat, checkingLength } = require("./utils.js");

const puppeteerDataScrapper = async (searchJob, nofOfJobs) => {
  //this launch ther chromimum browser so that puppeter can perform task
  let browser = await puppeteer.launch({ headless: false });

  //this will leads to opern a newpage of the desired url
  const page = await browser.newPage();

  //this code will leads to go at the indeed.com and wait untile full page is not loaded as networkidle2
  await page.goto("https://indeed.com", { waitUntil: "networkidle2" });

  //this wil type the search query in the input with give inputclass
  await page.type("#text-input-what", searchJob);

  //page button will be clicked so that we can get desired results
  await page.click(".yosegi-InlineWhatWhere-primaryButton");

  //this wil wait for result card to apperar on the dom
  await page.waitForSelector(".result");

  //this $$eval function from puppeter finds all the elememts from the dom of result class and itrates
  //over each element and then get the desired things like title of job data etc
  const allJobs = await page.$$eval(".result", (singleJob) => {
    return singleJob.map((singleJob) => {
      return {
        titleOfJob: singleJob
          .querySelector(".e37uo190 span")
          .textContent.trim(),
        nameOfCompany: singleJob
          .querySelector(".companyName")
          .textContent.trim(),
        placeOfLocation: singleJob
          .querySelector(".companyLocation")
          .textContent.trim(),
        dateOfPostedJob: singleJob.querySelector(".date ").textContent.trim(),
        descriptionOfJob: singleJob
          .querySelector(".job-snippet li")
          .textContent.trim(),
        companyUrl: singleJob.querySelector(".jobTitle a.jcs-JobTitle").href,
      };
    });
  });
  //this function is higher order function that takes cheking lengh function and return the exact data according
  // to the limit as no of jobs we want
  addDataInJsonFormat(checkingLength(allJobs, nofOfJobs), searchJob);
  await browser.close();
};

module.exports = { puppeteerDataScrapper };
