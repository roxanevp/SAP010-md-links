#!/usr/bin/env node
const fs = require('fs');

module.exports = () => {
  // eslint-disable-next-line no-console
  console.log('from require');
};

if (require.main === module) {
  // eslint-disable-next-line no-console
  console.log('from cli');
}

fs.readFile('./README.md', 'utf8', (err, data) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return;
  }
  // eslint-disable-next-line no-console
  console.log(data);

  const searchLinks = /(\[.*\]\(http.*\))/gm;
  // eslint-disable-next-line no-console
  console.log(data.match(searchLinks));
});
