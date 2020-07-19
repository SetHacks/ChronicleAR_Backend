const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema.js');

const { fetchAnnotations } = require('./services/vision.services.js');

fetchAnnotations('./src/Google Cloud Vision/amish.jpg')
.then(a => console.log(a))

const app = express();

app.use('/graphql',graphqlHTTP.graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(3000, () => {
    console.log('started server');
});