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
        owner: User!
    }

    type Query {
        user(id: ID!): User
        users: [User]!
        loginUser(email: String!, password: String!): User
        toys: [Toy]!
        toy(id: ID!): Toy!
    }

    type Mutation {
        registerUser(userInput: UserInput): User
        createToy(toyInput: ToyInput): Toy
        updateToy(id: ID!,name: String, photo: String): Toy
        updateOwnerToy(id: ID!, owner: String!): Toy
        deleteToy(id: ID!):Toy
    }
`);

export default schema;