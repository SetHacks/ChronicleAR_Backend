const { ROOT_URL, DEV_KEY } = require('../config.js');

const util = require('util');
const xml2js = require('xml2js');
const fetch = require('node-fetch');

const parseXML = util.promisify(xml2js.parseString);

const getBook = title => fetch(`${ROOT_URL}search.xml?key=${DEV_KEY}&q=${encodeURI(title)}`)
    .then(response => response.text())
    .then(parseXML)

module.exports = {
    getBook,
}