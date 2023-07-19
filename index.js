#!/usr/bin/env node
const fs = require('fs');

const mdLinks = (path, options) => {
  const pathExists = fs.existsSync(path);
  console.log(pathExists);
  if (pathExists) {
    const stats = fs.statSync(path);
    const isFolder = stats.isDirectory();
    if (isFolder) {
      console.log('pasta');
    } else {
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
    console.log('is folder', isFolder);
  }
};

module.exports = mdLinks;

if (require.main === module) {
  mdLinks();
}
