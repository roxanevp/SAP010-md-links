#!/usr/bin/env node
const main = require('./index');

// main('./exemplos').then((values) => console.log(JSON.stringify(values, null, 2)));
console.log(typeof main.validateLink, main.validateLink);
main.validateLink('https://twitter.com/exit/dimitri').then(console.log);
