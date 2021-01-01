/* eslint-disable no-param-reassign */
const axios = require('axios');
const $ = require('cheerio');
const camelCase = require('lodash/camelCase');
const lowerCase = require('lodash/lowerCase');

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

async function parseGod(URL) {
  const page = await getPage(URL);
  const image = $('table.infobox-table td.infobox-centered img', page).attr('src');
  const boons = [];
  const id = lowerCase(URL.substring(1, 4));
  $('table.wikitable.boonTableSB > tbody > tr', page).each((i, tr) => {
    const boon = {
      id: `${id}-${i}`,
    };
    if (i) {
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
}

async function parseWeapon(URL) {
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
}

module.exports = {
  removeLinkElement,
  getPage,
  parseGod,
  parseWeapon,
};
