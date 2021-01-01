/* eslint-disable no-param-reassign */
const $ = require('cheerio');
const camelCase = require('lodash/camelCase');
const lowerCase = require('lodash/lowerCase');
const { getPage, removeLinkElement } = require('../abstractScraper');

module.exports = async function parseGod(URL, standard = true) {
  const page = await getPage(URL);
  const image = $('table.infobox-table td.infobox-centered img', page).attr('src');
  const boons = [];
  const id = lowerCase(URL.substring(1, 4));
  $('table.wikitable.boonTableSB > tbody > tr', page).each((i, tr) => {
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
      $('> td', tr).each((j, td) => {
        const className = $(td).attr('class');
        switch (className) {
          case 'boonTableName':
            boon.name = $('b', td).text();
            boon.image = $('img', td).attr('src');
            break;
          case 'boonTableDescription':
            removeLinkElement(td);
            boon.description = $(td).html();
            break;
          case 'boonTableNotes':
            removeLinkElement(td);
            boon.notes = $(td).html();
            break;
          case 'boonTablePrereqs':
            removeLinkElement(td);
            boon.prerequisites = $(td).html();
            break;
          default:
            if ($(td).find('table').length) {
              boon.rarity = {};
              $(td)
                .find('table')
                .find('tr')
                .each((k, ttr) => {
                  let type = '';
                  $('td', ttr).each((l, ttd) => {
                    if (l === 0) {
                      type = camelCase($(ttd).text().replace(':', ''));
                    } else {
                      boon.rarity[type] = $(ttd).text().replace('\n', '');
                    }
                  });
                });
            } else {
              removeLinkElement(td);
              boon.rarity = $(td).html();
            }
        }
      });
      boons.push(boon);
    }
  });
  const icon = $('ul.gallery > li:nth-child(2) img', page).attr('src');
  return {
    image,
    boons,
    icon,
    id,
  };
};
