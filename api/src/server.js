const { buildFederatedSchema } = require('@apollo/federation');
const { ApolloServer } = require('apollo-server-express');
const express = require("express");
const { graphqlUploadExpress } =require("graphql-upload");
const { parse } = require('graphql');
const cors = require('cors');
const path = require('path');

const mongoose = require('mongoose');

mongoose.set('returnOriginal', false)
mongoose.set('useCreateIndex', true);

require('dotenv').config();

const { getMe } = require('./utils/auth')
const { detectBrowser } = require('./utils')

const { fileLoader, mergeResolvers }= require('merge-graphql-schemas');

const typeDefs = require('./schema');
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const seeders = require('./seeder')
const models = require('./models');

mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(async() => {
        await seeders()
        console.log('Database successfully connected!');            
    },
    error => {
        console.log('Database could not connected', error);
    });


process.setMaxListeners(0);

const app = express();


app.use(express.json({ limit: '100mb' }));
app.use(cors());
app.use(graphqlUploadExpress({ maxFieldSize:100000000, maxFileSize: 100000000, maxFiles: 10 }));

(async () => {
    const server = new ApolloServer({  
        uploads: false, 
        typeDefs, 
        resolvers, 
        subscriptions: false,
        playground: true,
        introspection: true,

        context: async({ req }) => {
            const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : '';    
            const me= await getMe(token)
            let operationName = req.body.operationName
            const query_parse = parse(req.body.query)
            operationName = query_parse.definitions[0]['selectionSet']['selections'][0]['name']['value']
            let data = {
                models,
                me
            }
            if('__schema'!=operationName){
                console.log("==== ", operationName, "==== \n-- me --", me,) 
                if (operationName == 'login'){
                    const browser = detectBrowser(req.header('x-user_agent'))
                    data.ip = req.header('x-forwarded-for') || req.socket.remoteAddress;
                    data.browser = browser
                }
            }
            return data;
        },
    });

    server.applyMiddleware({app});
    const port = process.env.PORT_GATEWAY;
    app.listen({ port }, () =>
        console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
    );
})();