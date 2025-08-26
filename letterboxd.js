const axios = require("axios");
const cheerio = require("cheerio");


async function scrapeMovies(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const movies = [];

    $(".react-component[data-component-class='globals.comps.LazyPoster']").each((i, el) => {
      const title = $(el).attr("data-item-name");
      const fullTitle = $(el).attr("data-item-full-display-name");
      const link = "https://letterboxd.com" + $(el).attr("data-item-link");
      const year = fullTitle?.match(/\((\d{4})\)/)?.[1];

      if (title) {
        movies.push({ title, fullTitle, year, link });
      }
    });

    return movies;
  } catch (err) {
    console.error("Scraping error:", err.message);
    return [];
  }
}

async function getLetterboxdProfile(username, maxPages = 5) {
  let page = 1;
  let watched = [];

  while (page <= maxPages) {
    const url = `https://letterboxd.com/${username}/films/page/${page}/`;
    console.log(`Fetching ${url}`);
    const pageMovies = await scrapeMovies(url);
    if (pageMovies.length === 0) break; 
    watched.push(...pageMovies);
    page++;
  }


  const liked = await scrapeMovies(`https://letterboxd.com/${username}/likes/films/`);

  return { watched, liked };

}




module.exports = { getLetterboxdProfile };
