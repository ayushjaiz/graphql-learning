import { quotes, users } from "./fakedb.js"

const resolvers = {
    Query: {
        greet: () => 'Hello World!',
        users: () => users,
        user: (_, { id }) => users.find(user => user.id === id),
    },
    User: {
        quotes: (u) => quotes.filter(quote => quote.by === u.id)
    }
}

export default resolvers;

