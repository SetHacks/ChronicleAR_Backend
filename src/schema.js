const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

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
        user: { }
    }
});