#!/usr/bin/env node
const chalk = require('chalk');
const main = require('./index');

const path = process.argv[2];

const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
};

const renderLine = (item) => {
  if (options.validate) {
    console.log([item.file, item.href, item.ok, item.status, item.text].join(' '));
  } else {
    console.log([item.file, item.href, item.text].join(' '));
  }
};

main(path, options).then((values) => {
  //   console.log(JSON.stringify(values, null, 2));
  if (options.stats) {
    console.log('total:', values.total);
    console.log('unique:', values.unique);

    if (options.validate) {
      console.log('broken:', values.broken);
    }
  } else {
    values.map(renderLine);
  }
});

console.log(chalk.cyan('jujuba'));
