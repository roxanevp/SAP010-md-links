#!/usr/bin/env node
const chalk = require('chalk');
const main = require('./index');

const path = process.argv[2];

const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
};

const statusColor = (value) => {
  if (value == null) {
    return null;
  }

  if (value === 'fail' || value >= 400) {
    return chalk.red(value);
  }

  return chalk.green(value);
};

const renderLine = (item) => {
  console.log([
    chalk.yellow(item.file),
    chalk.underline.cyanBright(item.href),
    statusColor(item.ok),
    statusColor(item.status),
    item.text,
  ].filter((value) => !!value).join(' '));
};

main(path, options).then((values) => {
  //   console.log(JSON.stringify(values, null, 2));
  if (options.stats) {
    console.log(chalk.yellow('total:', values.total));
    console.log(chalk.cyan('unique:', values.unique));

    if (options.validate) {
      console.log(chalk.red('broken:', values.broken));
    }
  } else {
    values.map(renderLine);
  }
});
