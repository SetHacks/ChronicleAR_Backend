const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLID } = require('graphql');
// const { resolveFieldValueOrError } = require('graphql/execution/execute'); 
const { fetchBook } = require('./services/api.service.js');

//xml nests children in an array regardless if there is only one 
const getXML = key => obj => obj[key][0]; 

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        title: { type: GraphQLString, resolve: getXML('title')  }, 
        publication_year: { type: GraphQLString, resolve: getXML('publication_year')  }, 
        publisher: { type: GraphQLString, resolve: getXML('publisher')  }, 
        language_code: { type: GraphQLString, resolve: getXML('language_code')  },
        is_ebook: { type: GraphQLString, resolve: getXML('is_ebook')  },
        description: { type: GraphQLString, resolve: getXML('description')  },

        average_rating: { type: GraphQLString, resolve: getXML('average_rating')  },
        num_pages: { type: GraphQLString, resolve: getXML('num_pages')  }, 

    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: { 
            type: BookType,
            args: { title: { type: GraphQLString }},
            resolve(root, args) {
                return fetchBook(args.title);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});