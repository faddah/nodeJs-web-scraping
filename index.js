const request = require('request-promise');
const cheerio = require('cheerio');

// const URL = "https://www.imdb.com/title/tt0063823/?ref_=nv_sr_srsg_0_tt_7_nm_1_in_0_q_yellow%2520sub";
const URL = "https://www.imdb.com/title/tt0063823/?ref_=nv_sr_srsg_0_tt_7_nm_1_in_0_q_yellow%2520sub";

const runScrape =	 async () => { // async function expression assigned to a variable
	try {
		const response = await (request({
			uri: URL,
			Headers: {
				"User-Agent": "Request-Promise",
			},
			gzip: true,
		}));
		// console.log(response);
		let $ = cheerio.load(response);
	
		let title = $('span[class="hero__primary-text"]').text();
		// let releaseDate = $('a[href="/title/tt0063823/releaseinfo?ref_=tt_ov_rdat"]').text();
		let releaseDate = $('a[href="/title/tt0063823/releaseinfo?ref_=tt_ov_rdat"]').text();
		let directorLabel = $('ul[class="ipc-metadata-list ipc-metadata-list--dividers-all title-pc-list ipc-metadata-list--baseAlt"] > li[data-testid="title-pc-principal-credit"] > span[aria-label="See full cast and crew"]').text().slice(0, -8);
		let director = $('a[href="/name/nm0242945/?ref_=tt_ov_dr"]').text().slice(0, -14);
		let writersLabel = $('a[href="/title/tt0063823/fullcredits/writer?ref_=tt_ov_wr_sm"]').text().slice(0, -7);
		let rating = $('div[data-testid="hero-rating-bar__aggregate-rating__score"] > span').text().slice(0, -6);
		let writers = [];
		writers.push($('a[href="/name/nm0591543/?ref_=tt_ov_wr"]').text().slice(0, -10));
		writers.push($('a[href="/name/nm0006168/?ref_=tt_ov_wr"]').text().slice(0, -11));	
		writers.push($('a[href="/name/nm0005200/?ref_=tt_ov_wr"]').text().slice(0, -14));
	
		// console.log(`Rating Label: ${rating}`);
		
		let writersString = writers.join(', ');
		let titleAndReleaseDate = `
			${title} - ${releaseDate}\n
			${directorLabel} - ${director}\n
			${writersLabel} - ${writersString}\n
			IMDB Rating — ${rating}`;
		console.log(titleAndReleaseDate);
		
  } catch (error) {
    console.error(error);
  }
} 

runScrape();