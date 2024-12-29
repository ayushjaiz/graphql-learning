import { gql } from "apollo-server"

const typeDefs = gql`
    type User{
        id: ID!
        firstName: String
        lastName: String
        email: String
        password: String
        quotes: [Quote]
    }

    type Quote{
        by: ID!
        name: String 
    }

    type Query{
        greet: String
        users: [User]
        user(id:ID!): User
    }
`

export default typeDefs;