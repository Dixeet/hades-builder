/* eslint-disable no-param-reassign */
const $ = require('cheerio');
const camelCase = require('lodash/camelCase');
const { getPage, removeLinkElement, findAndReplaceImages } = require('./abstractScraper');

const URL = '/Mirror_of_Night';

async function parse() {
  const talents = [];
  const attrs = [];
  const page = await getPage(URL);
  $('table.wikitable th', page).each((i, attr) => {
    attrs.push(camelCase($(attr).text()));
  });
  const trs = $('table.wikitable tr', page);
  let i = -1;
  for (const tr of trs) {
    i += 1;
    const talent = {
      id: `t-${i}`,
      red: {},
      green: {},
    };
    if (i) {
      const tds = $('td', tr);
      let j = -1;
      for (const td of tds) {
        j += 1;
        removeLinkElement(td);
        await findAndReplaceImages(td);
        if (j < 4) {
          talent.red[attrs[j]] = $(td).html();
        } else {
          talent.green[attrs[j]] = $(td).html();
        }
      }
      talents.push(talent);
    }
  }

  return talents;
}

module.exports = {
  parse,
};
