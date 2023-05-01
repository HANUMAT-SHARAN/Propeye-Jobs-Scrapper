const puppeteer = require("puppeteer");
const { addDataInJsonFormat, checkingLength } = require("./utils");

const puppeteerDataScrapper = async (searchJob, nofOfJobs) => {
  let browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  console.log(page);
  await page.goto("https://indeed.com", { waitUntil: "networkidle2" });

  await page.type("#text-input-what", searchJob);
  await page.click(".yosegi-InlineWhatWhere-primaryButton");

  await page.waitForSelector(".result");

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

  addDataInJsonFormat(checkingLength(allJobs, nofOfJobs), searchJob);
  await browser.close();
};

module.exports = { puppeteerDataScrapper };
