/* eslint-disable no-param-reassign */
const axios = require('axios');
const $ = require('cheerio');
const fs = require('fs');

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

function extractImage(img, replace = true) {
  return new Promise((resolve, reject) => {
    const extractPath = '../static/images/';
    const url = $(img).attr('src');
    if (url) {
      const id = new URL(url).pathname.split('/')[5];
      const imagePath = `${extractPath}${id}`;
      const linkPath = `/images/${id}`;
      if (!fs.existsSync(imagePath)) {
        axios({ url, responseType: 'stream' }).then((response) => {
          response.data
            .pipe(fs.createWriteStream(imagePath))
            .on('finish', () => {
              if (replace) {
                $(img).attr('src', linkPath);
              }
              resolve(linkPath);
            })
            .on('error', (e) => reject(e));
        });
      } else {
        if (replace) {
          $(img).attr('src', linkPath);
        }
        resolve(linkPath);
      }
    } else {
      resolve('');
    }
  });
}

async function findAndReplaceImages(el) {
  const images = $(el).find('img');
  // eslint-disable-next-line no-restricted-syntax
  for (const image of images) {
    await extractImage(image);
  }
}

module.exports = {
  removeLinkElement,
  getPage,
  extractImage,
  findAndReplaceImages,
};
