const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList } = require('graphql');
// const { resolveFieldValueOrError } = require('graphql/execution/execute'); 
const { getBook } = require('./services/api.service.js');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
    })
});

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
                return getBook(args.title).then(response => {
                    const result = response.GoodreadsResponse.search[0].results[0].work[0].best_book[0];
                    console.log(result)
                    return result
                });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});