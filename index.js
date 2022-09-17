import express from "express";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./config/database.js";

import schema from "./graphql/schema.js";
import rootValue from "./graphql/rootValue.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDatabase();

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}));

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))