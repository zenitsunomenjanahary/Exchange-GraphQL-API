import { buildSchema } from "graphql";

const schema = buildSchema(`
    input UserInput {
        name: String!
        email: String!
        phone: String!
        password: String!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        phone: String!
        password: String!
        toys: [Toy]
    }

    input ToyInput {
        name: String!
        photo: String!
        owner: String!
    }

    type Toy {
        id: ID!
        name: String!
        photo: String!
        owner: User
    }

    input ExchangeInput {
        name: String!
        contact: String!
        toyToExchange: String!
        exchangeTo: String!
        photo: String!
    }

    type Exchange {
        id: ID!
        name: String!
        contact: String!
        toyToExchange: String!
        exchangeTo: String!
        photo: String!
        status: String!
    }

    type PageInfo {
        page: Int
        limit: Int
        status: String
    }

    input PageInput {
        page: Int
        limit: Int
        status: String
    }

    type Page {
        totalCount: Int
        exchanges: [Exchange]
        pageInformation: PageInfo
    }

    type Query {
        user(id: ID!): User
        users: [User]
        loginUser(email: String!, password: String!): User
        toys: [Toy]
        toy(id: ID!): Toy
        toyByUser(userId: ID!): [Toy]
        exchanges(pageInput: PageInput): Page
        exchange(id: ID!): Exchange
    }

    type Mutation {
        registerUser(userInput: UserInput): User
        createToy(toyInput: ToyInput): Toy
        updateToy(id: ID!,name: String, photo: String): Toy
        updateOwnerToy(id: ID!, owner: String!): Toy
        deleteToy(id: ID!):Toy
        createExchange(exchangeInput: ExchangeInput): Exchange
        desactivateExchange(id: ID!): Exchange
        deleteExchange(id: ID!): Exchange
    }
`);

export default schema;