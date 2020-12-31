const scraper = require('./scraper');

(async function main() {
  const scraps = await scraper.scrap();
})();
