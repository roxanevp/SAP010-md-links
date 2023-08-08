#!/usr/bin/env node
const chalk = require('chalk');
const main = require('./index');

const path = process.argv[2];

const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
};

const getStats = ({ stats, validate }) => (links) => new Promise((resolve) => {
  if (stats) {
    const total = links.length;
    const unique = new Set(links.map(({ href }) => href)).size;

    if (validate) {
      const broken = links.filter((link) => link.ok === 'fail').length;
      resolve({ total, unique, broken });
    } else {
      resolve({ total, unique });
    }
  } else {
    resolve(links);
  }
});

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
  console.log(
    [
      chalk.yellow(item.file),
      chalk.underline.cyanBright(item.href),
      statusColor(item.ok),
      statusColor(item.status),
      chalk.white(item.text),
    ]
      .filter((value) => !!value)
      .join(' '),
  );
};

const cli = (testPath, testOptions, done) => {
  main(testPath || path, testOptions || options)
    .then(getStats(testOptions || options))
    .then((values) => {
      const stats = testOptions?.stats || options?.stats;
      const validate = testOptions?.validate || options?.validate;

      if (stats) {
        console.log(chalk.yellow('total:', values.total));
        console.log(chalk.cyan('unique:', values.unique));

        if (validate) {
          console.log(chalk.red('broken:', values.broken));
        }
      } else {
        values.map(renderLine);
      }
      if (done) {
        done();
      }
    }).catch((error) => {
      if (done) {
        done(error);
      }
    });
};

if (process.env.NODE_ENV === 'test') {
  module.exports = cli;
} else {
  cli();
}
