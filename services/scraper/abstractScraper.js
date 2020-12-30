/* eslint-disable no-param-reassign */
import axios from 'axios';
import $ from 'cheerio';
import camelCase from 'lodash/camelCase';

export function removeLinkElement(el) {
  $(el)
    .find('a')
    .each((_, a) => {
      a.tagName = 'span';
      $(a).attr('href', null);
      $(a).attr('title', null);
    });
}

export async function getPage(URL) {
  const { data: page } = await axios.get(`/hades${URL}`);
  return page;
}

export async function parseGod(URL) {
  const page = await getPage(URL);
  const image = $('table.infobox-table td.infobox-centered img', page).attr('src');
  const boons = [];
  $('table.wikitable.boonTableSB > tbody > tr', page).each((i, tr) => {
    const boon = {};
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
  return {
    image,
    boons,
  };
}
