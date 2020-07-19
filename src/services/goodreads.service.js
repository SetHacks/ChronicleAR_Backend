const { GOODREADS_ROOT_URL, DEV_KEY } = require('../config.js');

const util = require('util');
const xml2js = require('xml2js');
const fetch = require('node-fetch')
const Dataloader = require('dataloader');

const parseXML = util.promisify(xml2js.parseString);

//Fetch data (search by keyword, find id, then query again for book)
const fetchBook = async(search_query) => {
    //search goodreads and find the book id we are looking for
    const id = await fetch(`${GOODREADS_ROOT_URL}search.xml?key=${DEV_KEY}&q=${encodeURI(search_query)}`)
        .then(response => response.text())
        .then(parseXML)
        .then(response => response.GoodreadsResponse.search[0].results[0].work[0].best_book[0].id[0]._)

    //now grab the proper book object 
    return fetch(`${GOODREADS_ROOT_URL}/book/show/${id}.xml?key=${DEV_KEY}`)
        .then(response => response.text())
        .then(parseXML)
        .then(reponse => reponse.GoodreadsResponse.book[0])
}

module.exports = {
    fetchBook
}