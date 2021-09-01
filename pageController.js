const pageScraper = require('./pageScraper');
const fs = require('fs');

async function scrapeAll(browserInstance){
    let browser;
    try{
        browser = await browserInstance;
        let scrapedData = {};
        //states 
        
        scrapedData['Andhra Pradesh'] = await pageScraper.scraper(browser, 'Andhra Pradesh');
        scrapedData['Himachal Pradesh'] = await pageScraper.scraper(browser, 'Himachal Pradesh');
        scrapedData['Meghalaya'] = await pageScraper.scraper(browser, 'Meghalaya');
        scrapedData['Tamil Nadu'] = await pageScraper.scraper(browser, 'Tamil Nadu');
        scrapedData['Arunachal Pradesh'] = await pageScraper.scraper(browser, 'Arunachal Pradesh');
        scrapedData['Jharkhand'] = await pageScraper.scraper(browser, 'Jharkhand');
        scrapedData['Mizoram'] = await pageScraper.scraper(browser, 'Mizoram');
        scrapedData['Tripura'] = await pageScraper.scraper(browser, 'Tripura');
        scrapedData['Assam'] = await pageScraper.scraper(browser, 'Assam');
        scrapedData['Karnataka'] = await pageScraper.scraper(browser, 'Karnataka');
        scrapedData['Nagaland'] = await pageScraper.scraper(browser, 'Nagaland');
        scrapedData['Uttar Pradesh'] = await pageScraper.scraper(browser, 'Uttar Pradesh');
        scrapedData['Bihar'] = await pageScraper.scraper(browser, 'Bihar');
        scrapedData['Chhattisgarh'] = await pageScraper.scraper(browser, 'Chhattisgarh');
        scrapedData['Orissa'] = await pageScraper.scraper(browser, 'Orissa');
        scrapedData['Uttarakhand'] = await pageScraper.scraper(browser, 'Uttarakhand');
        scrapedData['Delhi'] = await pageScraper.scraper(browser, 'Delhi');
        scrapedData['Madhya Pradesh'] = await pageScraper.scraper(browser, 'Madhya Pradesh');
        scrapedData['Punjab'] = await pageScraper.scraper(browser, 'Punjab');
        scrapedData['West Bengal'] = await pageScraper.scraper(browser, 'West Bengal');
        scrapedData['Gujarat'] = await pageScraper.scraper(browser, 'Gujarat');
        scrapedData['Maharashtra'] = await pageScraper.scraper(browser, 'Maharashtra');
        scrapedData['Rajasthan'] = await pageScraper.scraper(browser, 'Rajasthan');
        scrapedData['Telangana'] = await pageScraper.scraper(browser, 'Telangana');
        scrapedData['Haryana'] = await pageScraper.scraper(browser, 'Haryana');
        scrapedData['Manipur'] = await pageScraper.scraper(browser, 'Manipur');
        scrapedData['Sikkim'] = await pageScraper.scraper(browser, 'Sikkim');

        await browser.close();
       
        fs.writeFile("data.json", JSON.stringify(scrapedData), 'utf8', function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The data has been scraped and saved successfully! View it at './data.json'");
        });
    }
    catch(err){
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)