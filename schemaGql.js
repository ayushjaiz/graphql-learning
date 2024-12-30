import { gql } from "apollo-server";

const typeDefs = gql`
    type User{
        _id: ID!
        name: String!
        email: String!
        quotes: [Quote]
    }

    type Quote{
        _id: ID!
        authorId: ID!
        description: String!
    }

    type Query{
        getAllUsers: [User]
        getUser(token: String!): User
    }

    input SignupUserInput {
        name: String!
        email: String!
        password: String!
    }

    input LoginUserInput{
        email: String!
        password: String!
    }

    type Mutation{
        signupUser(
            input: SignupUserInput!
        ): User
        loginUser(
            input: LoginUserInput!
        ): String
        getUser(
            token: String!
        ): User
    }
`;

export default typeDefs;
