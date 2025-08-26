const axios = require("axios");
const cheerio = require("cheerio");

const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function scrapeMovies(url) {

  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log(`Using cached data for ${url}`);
    return cached.data;
  }

  try {
    console.log(`Fetching ${url}`);
    
    await delay(1000); 
    
    const { data } = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
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
   
    cache.set(url, {
      data: movies,
      timestamp: Date.now()
    });
    
    return movies;
  } catch (err) {
    console.error("Scraping error:", err.message);
    return [];
  }
}


const ongoingRequests = new Map();

async function getLetterboxdProfile(username, maxPages = 5) {
  const cacheKey = `${username}_${maxPages}`;
  
  if (ongoingRequests.has(cacheKey)) {
    console.log(`Request for ${username} already in progress, waiting...`);
    return await ongoingRequests.get(cacheKey);
  }
  

  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log(`Using cached profile for ${username}`);
    return cached.data;
  }
  

  const requestPromise = async () => {
    try {
      console.log(`Starting profile fetch for ${username}`);
      let page = 1;
      let watched = [];
      
      while (page <= maxPages) {
        const url = `https://letterboxd.com/${username}/films/page/${page}/`;
        const pageMovies = await scrapeMovies(url);
        
        if (pageMovies.length === 0) {
          console.log(`No more movies found at page ${page}, stopping`);
          break;
        }
        
        watched.push(...pageMovies);
        page++;
      }
      
      console.log(`Fetching liked movies for ${username}`);
      const liked = await scrapeMovies(`https://letterboxd.com/${username}/likes/films/`);
      
      const result = { watched, liked };
      
      cache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      });
      
      console.log(`Profile fetch complete for ${username}: ${watched.length} watched, ${liked.length} liked`);
      return result;
    } catch (error) {
      console.error(`Error fetching profile for ${username}:`, error.message);
      throw error;
    } finally {

      ongoingRequests.delete(cacheKey);
    }
  };
  

  const promise = requestPromise();
  ongoingRequests.set(cacheKey, promise);
  
  return await promise;
}


setInterval(() => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      cache.delete(key);
    }
  }
}, CACHE_DURATION);

module.exports = { getLetterboxdProfile }
