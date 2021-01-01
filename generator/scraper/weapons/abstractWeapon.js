/* eslint-disable no-param-reassign */
const $ = require('cheerio');
const camelCase = require('lodash/camelCase');
const lowerCase = require('lodash/lowerCase');
const { getPage, removeLinkElement } = require('../abstractScraper');

module.exports = async function parseWeapon(URL) {
  const page = await getPage(URL);
  const image = $('div.floatright img', page).attr('src');
  const aspectsAttrs = [];
  const aspects = [];
  const id = lowerCase(URL.substring(1, 4));
  const tables = $('table.wikitable', page);
  $('th', tables[1]).each((i, attr) => {
    aspectsAttrs.push(camelCase($(attr).text()));
  });
  $('tbody > tr', tables[1]).each((i, tr) => {
    const aspect = {
      id: `${id}-a-${i}`,
    };
    if (i) {
      $('> td', tr).each((j, td) => {
        if (j) {
          removeLinkElement(td);
          aspect[aspectsAttrs[j]] = $(td).html();
        } else {
          aspect.image = $('img', td).attr('src');
          aspect.name = $(td).text().replace('\n', '');
        }
      });
      aspects.push(aspect);
    }
  });
  const upgradesAttrs = [];
  const upgrades = [];
  $('th', tables[3]).each((i, attr) => {
    upgradesAttrs.push(camelCase($(attr).text()));
  });
  $('tbody > tr', tables[3]).each((i, tr) => {
    const upgrade = {
      id: `${id}-u-${i}`,
    };
    if (i) {
      $('> td', tr).each((j, td) => {
        if (j) {
          removeLinkElement(td);
          upgrade[upgradesAttrs[j]] = $(td).html();
        } else {
          upgrade.image = $('img', td).attr('src');
          upgrade.name = $(td).text().replace('\n', '');
        }
      });
      upgrades.push(upgrade);
    }
  });
  return {
    image,
    aspects,
    upgrades,
    id,
  };
};
