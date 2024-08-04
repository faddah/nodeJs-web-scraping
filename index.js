const request = require('request-promise');
const cheerio = require('cheerio');

const URL = "https://www.imdb.com/title/tt0063823/?ref_=nv_sr_srsg_0_tt_7_nm_1_in_0_q_yellow%2520sub";

const runScrape =	 async () => { // async function expression assigned to a variable
	try {
		const response = await (request(URL));
		// console.log(response);
		let $ = cheerio.load(response);
		let title = $('span[class="hero__primary-text"]').text();
		let releaseDate = $('a[href="/title/tt0063823/releaseinfo?ref_=tt_ov_rdat"]').text();
		console.log(title, releaseDate);
		
  } catch (error) {
    console.error(error);
  }
} 

runScrape();