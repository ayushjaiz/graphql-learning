import dotenv from 'dotenv'
dotenv.config()

import { ApolloServer } from "apollo-server"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import typeDefs from "./schemaGql.js"
import resolvers from "./resolvers.js"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("connected", () => {
    console.log("Connected to mongodb")
})

mongoose.connection.on("error", () => {
    console.log("error connecting to mongodb".err)
})

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ],
})

server.listen().then(({ url }) => {
    console.log(`Server listening at ${url}`)
})