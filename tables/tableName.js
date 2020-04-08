const csvCreate = require('../csvCreate')
var faker = require('faker');

const headers = 'name,url,forignKeyID\n'
const rows = 1000
const scriptName = __filename.slice(__dirname.length + 1, -3)
const filename = `../csv/${scriptName}.csv`

const foriegnKeyRows = 1000

const dataGenerator = function(index) {
    return `${faker.name.findName()},${faker.image.imageUrl()},${Math.floor(Math.random()*foriegnKeyRows)}\n`
}

csvCreate(headers, dataGenerator, rows, filename)