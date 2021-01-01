/* eslint-disable no-param-reassign */
const axios = require('axios');
const $ = require('cheerio');

function removeLinkElement(el) {
  $(el)
    .find('a')
    .each((_, a) => {
      a.tagName = 'span';
      $(a).attr('href', null);
      $(a).attr('title', null);
    });
}

async function getPage(URL) {
  const { data: page } = await axios.get(`https://hades.gamepedia.com${URL}`);
  return page;
}

module.exports = {
  removeLinkElement,
  getPage,
};
