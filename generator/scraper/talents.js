/* eslint-disable no-param-reassign */
const $ = require('cheerio');
const camelCase = require('lodash/camelCase');
const { getPage, removeLinkElement } = require('./abstractScraper');

const URL = '/Mirror_of_Night';

async function parse() {
  const talents = [];
  const attrs = [];
  const page = await getPage(URL);
  $('table.wikitable th', page).each((i, attr) => {
    attrs.push(camelCase($(attr).text()));
  });
  $('table.wikitable tr', page).each((i, tr) => {
    const talent = {
      id: `t-${i}`,
      red: {},
      green: {},
    };
    if (i) {
      $('td', tr).each((j, td) => {
        removeLinkElement(td);
        if (j < 4) {
          talent.red[attrs[j]] = $(td).html();
        } else {
          talent.green[attrs[j]] = $(td).html();
        }
      });
      talents.push(talent);
    }
  });

  return talents;
}

module.exports = {
  parse,
};
