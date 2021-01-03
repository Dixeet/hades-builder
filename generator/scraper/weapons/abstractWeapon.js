/* eslint-disable no-param-reassign */
const $ = require('cheerio');
const camelCase = require('lodash/camelCase');
const lowerCase = require('lodash/lowerCase');
const { getPage, removeLinkElement, extractImage, findAndReplaceImages } = require('../abstractScraper');

module.exports = async function parseWeapon(URL) {
  const page = await getPage(URL);
  const image = await extractImage($('div.floatright img', page)[0]);
  const aspectsAttrs = [];
  const aspects = [];
  const id = lowerCase(URL.substring(1, 4));
  const tables = $('table.wikitable', page);
  $('th', tables[1]).each((i, attr) => {
    aspectsAttrs.push(camelCase($(attr).text()));
  });
  const trs = $('tbody > tr', tables[1]);
  let ii = -1;
  for (const tr of trs) {
    ii += 1;
    const aspect = {
      id: `${id}-a-${ii}`,
    };
    if (ii) {
      const tds = $('> td', tr);
      let j = -1;
      for (const td of tds) {
        j += 1;
        if (j) {
          removeLinkElement(td);
          await findAndReplaceImages(td);
          aspect[aspectsAttrs[j]] = $(td).html();
        } else {
          aspect.image = await extractImage($('img', td)[0]);
          aspect.name = $(td).text().replace('\n', '');
        }
      }
      aspects.push(aspect);
    }
  }
  const upgradesAttrs = [];
  const upgrades = [];
  $('th', tables[3]).each((i, attr) => {
    upgradesAttrs.push(camelCase($(attr).text()));
  });
  const utrs = $('tbody > tr', tables[3]);
  let ui = -1;
  for (const tr of utrs) {
    ui += 1;
    const upgrade = {
      id: `${id}-u-${ui}`,
    };
    if (ui) {
      const tds = $('> td', tr);
      let j = -1;
      for (const td of tds) {
        j += 1;
        if (j) {
          removeLinkElement(td);
          await findAndReplaceImages(td);
          upgrade[upgradesAttrs[j]] = $(td).html();
        } else {
          upgrade.image = await extractImage($('img', td)[0]);
          upgrade.name = $(td).text().replace('\n', '');
        }
      }
      upgrades.push(upgrade);
    }
  }
  return {
    image,
    aspects,
    upgrades,
    id,
  };
};
