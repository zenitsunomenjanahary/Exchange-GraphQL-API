import { users, user, loginUser, registerUser,toys, toy, createToy,updateToy,updateOwnerToy, deleteToy, exchanges, exchange, createExchange,desactivateExchange, deleteExchange,toyByUser } from "./resolvers.js";

export default {
    users, user, loginUser,registerUser,
    toys, toy,toyByUser, createToy,updateToy,updateOwnerToy, deleteToy,
    exchanges, exchange, createExchange,desactivateExchange, deleteExchange
}