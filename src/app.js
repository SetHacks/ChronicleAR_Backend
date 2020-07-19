const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema.js');

const { fetchAnnotations } = require('./services/vision.services.js');

const fs = require('fs')
const imgFile = fs.readFileSync('src/book2.png')
const encoded = Buffer.from(imgFile).toString('base64')

fetchAnnotations(encoded)
.then(a => console.log(a))

const app = express();

app.use('/graphql',graphqlHTTP.graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(3000, () => {
    console.log('started server');
});