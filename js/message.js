const fs = require('fs');

fs.writeFileSync('adat.txt', 'Hello világ!');
const data = fs.readFileSync('adat.txt', 'utf8');
console.log(data);