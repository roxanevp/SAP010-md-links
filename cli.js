#!/usr/bin/env node
const main = require('./index');

main('./exemplos', { validate: true, stats: false }).then((values) => console.log(JSON.stringify(values, null, 2)));
