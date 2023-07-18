#!/usr/bin/env node
const fs = require('fs');

const mdLinks = (path, options) => {
  const pathExists = fs.existsSync(path);
  console.log(pathExists);
  if (pathExists) {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return;
      }
      const searchLinks = /(\[.*\]\(http.*\))/gm;
      // eslint-disable-next-line no-console
       console.log(data.match(searchLinks));
    });
  }
};

module.exports = mdLinks;

if (require.main === module) {
  mdLinks();
};
