/* eslint-disable no-param-reassign */
const $ = require('cheerio');
const camelCase = require('lodash/camelCase');
const lowerCase = require('lodash/lowerCase');
const { getPage, removeLinkElement, extractImage, findAndReplaceImages } = require('../abstractScraper');

module.exports = async function parseGod(URL, standard = true) {
  const page = await getPage(URL);
  const image = await extractImage($('table.infobox-table td.infobox-centered img', page)[0]);
  const boons = [];
  const id = lowerCase(URL.substring(1, 4));
  const trs = $('table.wikitable.boonTableSB > tbody > tr', page);
  let i = -1;
  for (const tr of trs) {
    i += 1;
    if (i) {
      const boon = {
        id: `${id}-${i}`,
      };
      if (standard) {
        switch (i) {
          case 1:
            boon.type = 'attack';
            break;
          case 2:
            boon.type = 'special';
            break;
          case 3:
            boon.type = 'cast';
            break;
          case 4:
            boon.type = 'cast';
            break;
          case 5:
            boon.type = 'dash';
            break;
          case 6:
            boon.type = 'call';
            break;
          default:
            boon.type = 'other';
        }
      } else {
        boon.type = 'other';
      }
      const tds = $('> td', tr);
      for (const td of tds) {
        const className = $(td).attr('class');
        switch (className) {
          case 'boonTableName':
            boon.name = $('b', td).text();
            boon.image = await extractImage($('img', td)[0]);
            break;
          case 'boonTableDescription':
            removeLinkElement(td);
            await findAndReplaceImages(td);
            boon.description = $(td).html();
            break;
          case 'boonTableNotes':
            removeLinkElement(td);
            await findAndReplaceImages(td);
            boon.notes = $(td).html();
            break;
          case 'boonTablePrereqs':
            removeLinkElement(td);
            await findAndReplaceImages(td);
            boon.prerequisites = $(td).html();
            break;
          default:
            if ($(td).find('table').length) {
              boon.rarity = {};
              const ttrs = $(td).find('table').find('tr');
              for (const ttr of ttrs) {
                let type = '';
                const ttds = $('td', ttr);
                let l = -1;
                for (const ttd of ttds) {
                  l += 1;
                  if (l === 0) {
                    type = camelCase($(ttd).text().replace(':', ''));
                  } else {
                    boon.rarity[type] = $(ttd).text().replace('\n', '');
                  }
                }
              }
            } else {
              await findAndReplaceImages(td);
              removeLinkElement(td);
              boon.rarity = $(td).html();
            }
        }
      }
      boons.push(boon);
    }
  }
  const icon = await extractImage($('ul.gallery > li:nth-child(2) img', page)[0]);
  return {
    image,
    boons,
    icon,
    id,
  };
};
