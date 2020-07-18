const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = require('graphql');
// const { resolveFieldValueOrError } = require('graphql/execution/execute');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        user: { 
            type: UserType,
            args: { id: { type: GraphQLString }},
            resolve(parent, args) {

            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});