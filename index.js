#!/usr/bin/env node

module.exports = () => {
  console.log('bbbb')
};

if (require.main === module ) {

}
console.log('aaaa')

const fs = require('fs')
fs.readFile('./README.md' , 'utf8' ,  (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})