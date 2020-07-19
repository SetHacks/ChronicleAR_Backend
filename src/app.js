const {fetchBook} = require('./services/api.service.js')

const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema.js');

const app = express();

fetchBook("Ender's Game").then(response => console.log(response))

app.use('/graphql',graphqlHTTP.graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(3000, () => {
    console.log('started server');
});