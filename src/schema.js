const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLID } = require('graphql');
// const { resolveFieldValueOrError } = require('graphql/execution/execute'); 
// const { getBook } = require('./services/api.service.js');

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        title: { type: new GraphQLList(GraphQLString) }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: { 
            type: BookType,
            args: { title: { type: GraphQLString }},
            resolve(root, args) {
                // return getBook(args.title).then(response => {
                //     return response.GoodreadsResponse.search[0].results[0].work[0].best_book[0];
                // });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});