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
    const attrName = camelCase($(attr).text());
    if (attrs.includes(`${attrName}Red`)) {
      attrs.push(`${attrName}Green`);
    } else {
      attrs.push(`${attrName}Red`);
    }
  });
  $('table.wikitable tr', page).each((i, tr) => {
    const talent = {};
    if (i) {
      $('td', tr).each((j, td) => {
        removeLinkElement(td);
        talent[attrs[j]] = $(td).html();
      });
      talents.push(talent);
    }
  });

  return talents;
}

module.exports = {
  parse,
};
