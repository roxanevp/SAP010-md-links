#!/usr/bin/env node
const main = require('./index');

main('./exemplos', { validate: true, stats: true }).then((values) => console.log(JSON.stringify(values, null, 2)));
