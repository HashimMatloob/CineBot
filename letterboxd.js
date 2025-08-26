const axios = require("axios");
const cheerio = require("cheerio");

async function main() {
  try {
    const response = await axios.get("https://letterboxd.com/tiktokTaste/films/");
    const $ = cheerio.load(response.data);

    const movies = [];

    $("[data-component-class='globals.comps.LazyPoster']").each((i, el) => {
      const title = $(el).attr("data-item-name");
      const fullTitle = $(el).attr("data-item-full-display-name");
      const link = "https://letterboxd.com" + $(el).attr("data-item-link");
      const year = fullTitle.match(/\((\d{4})\)/)?.[1]; // extract year if present

      if (title) {
        movies.push({
          title,
          fullTitle,
          year,
          link
        });
      }
    });

    console.log("Movies found:", movies);
  } catch (error) {
    console.error(error);
  }
}

main();
