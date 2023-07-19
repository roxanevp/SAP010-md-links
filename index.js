#!/usr/bin/env node
const { rejects } = require('assert');
const fs = require('fs');

const mdLinks = (path, options) => new Promise((resolve, reject) => {
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
          reject(err);
          return;
        }
        const searchLinks = /(\[.*\]\(http.*\))/gm;
        // eslint-disable-next-line no-console
        resolve(data.match(searchLinks));
      });
    }
    console.log('is folder', isFolder);
  }
});

module.exports = mdLinks;

if (require.main === module) {
  mdLinks();
}
