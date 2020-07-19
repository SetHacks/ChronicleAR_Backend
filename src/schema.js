const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLID } = require('graphql');
const { fetchBook } = require('./services/goodreads.service.js');
const { fetchAnnotations } = require('./services/vision.services.js');

//xml nests children in an array regardless if there is only one 
const getXML = key => obj => obj[key][0]; 

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID, resolve: getXML('id')  }, 
        title: { type: GraphQLString, resolve: getXML('title')  }, 
        publication_year: { type: GraphQLString, resolve: getXML('publication_year')  }, 
        publisher: { type: GraphQLString, resolve: getXML('publisher')  }, 
        language_code: { type: GraphQLString, resolve: getXML('language_code')  },
        is_ebook: { type: GraphQLString, resolve: getXML('is_ebook')  },
        description: { type: GraphQLString, resolve: getXML('description')  },

        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent,args) {
                return parent.authors.map(author => author.author[0])
            }
        },

        average_rating: { type: GraphQLString, resolve: getXML('average_rating')  },
        num_pages: { type: GraphQLString, resolve: getXML('num_pages')  }, 

    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID, resolve: getXML('id') }, 
        name: { type: GraphQLString, resolve: getXML('name') }, 
    })
});

const getBookData = async(imgBinary) => {
    const annotations = await fetchAnnotations(imgBinary);

    const search_query = annotations[0].textAnnotations[0].description.replace(/\n/g,' ');

    const book_data = await fetchBook(search_query);
    return book_data;
}

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: { 
            type: BookType,
            args: { imgBinary: { type: GraphQLString }},
            resolve(root, args) {
                return getBookData(args.imgBinary)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});