const fs = require('fs');
const request = require('request');

function download(dataObj) {
    return new Promise((resolve, reject) => {
      request.head(dataObj['imageUrl'], function (err, res, body) {
        request(dataObj['imageUrl']).pipe(fs.createWriteStream(dataObj['imageUrl'].split('/').pop())).on('close', resolve);
      });
    });
  }

const scraperObject = {
    url: 'https://www.ugc.ac.in/privatuniversity.aspx',
    async scraper(browser, category){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        // Navigate to the selected page
        await page.goto(this.url);
        // Select the category of book to be displayed
        let selectedCategory = await page.$$eval('#ctl00_bps_homeCPH_rptState > tbody > tr > td > li > a', (links, _category) => {
            // Search for the element that has the matching text
            links = links.map(a => a.textContent.replace(/(\r\n\t|\n|\r|\t|^\s|\s$|\B\s|\s\B)/gm, "") === _category ? a : null);
            let link = links.filter(tx => tx !== null)[0];
            return link.href;
        }, category);
        // Navigate to the selected category       
        await page.goto(selectedCategory);
        let scrapedData = [];
        // Wait for the required DOM to be rendered
        async function scrapeCurrentPage(){
            await page.waitForSelector('#centerpanel');
            // Get the link to all the required books
            let urls = await page.$$eval('table > tbody tr > td > a', links => {
                // Make sure the book to be scraped is in stock
                
                links = links.filter(link => link.textContent == "More Details...")
                // Extract the links from the data
               
                links = links.map(el => el.href)                
                return links;
            });
            // Loop through each of those links, open a new page instance and get the relevant data from them
            let pagePromise = (link) => new Promise(async(resolve, reject) => {
                let dataObj = {};
                let newPage = await browser.newPage();
                await newPage.goto(link);
                dataObj['State'] = category;
                dataObj['University'] = await newPage.$eval('#dluniversity > tbody > tr > td', text => text.textContent.replace(/(\r\n\t|\n|\r|\t|^\s|\s$|\B\s|\s\B)/gm, ""));
                
               // await download(dataObj);

                resolve(dataObj);
                await newPage.close();
            });

            for(link in urls){
                let currentPageData = await pagePromise(urls[link]);
                scrapedData.push(currentPageData);
                // console.log(currentPageData);
            }
            // When all the data on this page is done, click the next button and start the scraping of the next page
            // You are going to check if this button exist first, so you know if there really is a next page.
            let nextButtonExist = false;
            try{
                const nextButton = await page.$eval('.next > a', a => a.textContent);
                nextButtonExist = true;
            }
            catch(err){
                nextButtonExist = false;
            }
            if(nextButtonExist){
                await page.click('.next > a');
                return scrapeCurrentPage(); // Call this function recursively
            }
            await page.close();
            return scrapedData;
        }
        let data = await scrapeCurrentPage();       
        return data;
    }
}

module.exports = scraperObject;