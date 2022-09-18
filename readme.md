# Exchange GraphQl API
## WCC2_Techzara Dev week 3

## How to launch this project

### clone it then run `npm install` 

### create .env file for MONGO_URI 
### run `npm start` or `npm run dev` for development 

### use cases: 
###### After logged in User can create Exchange and manage Toys.

##### Technical dependancies
###### We are using `express`, `express-graphql` and `graphql` as dependancies for building the Graphql Server.
###### The root level query is of type `RootQueryType` and it has the following fields bellow:

##### Queries:
###### `user`: takes an input parameter called `id` and return the details of a particular user.

###### `users`: for fetching the list of all users.

###### `loginUser`: takes 2 parameters called `email` and `password` and return the details of a particular user.

###### `toys`: for fetching the list of all toys.

###### `toy`: takes an input parameter called `id` and return a particular Toy.

###### `toyByUser`: takes an input parameter called `userId` and return a list of Toy for a particular user.

###### `exchange`: takes an input parameter called `id` and return a particular Exchange.

###### `exchanges`: takes an input called `pageInput` wich is an object with three fields {`page`: type Integer, `limit`: type Integer, `status`: String } and return a `Page` Wich contains many information like: `totalCount` an Integer ,`exchanges` an array of Exchanges and `pageInformation`.

##### Mutations:
###### `registerUser`: takes an input called `userInput` with four required fields: {`name`: String, `email`:String, `phone`: String,`password`: String } and return the User Information

###### `createToy`: takes an input called `toyInput` with 3 required fields: {`name`: String, `photo`:String, `owner`: String (userId) } and return the new Toy created information.

###### `updateToy`: takes 3 input parameters with required field `id`: String and `name`,`photo` are optional. Return Toy with updated Information.

###### `updateOwnerToy`: takes 2 input parameters with required field `id`: String (toyId) and `owner`: String (userId). Return Toy with updated Information.

###### `deleteToy`: takes an input parameters called `id`: String (toyId)

###### `createExchange`: takes an input called `exchangeInput` wich is an object with  five required fields: {`name`: String, `contact`:String, `toyToExchange`,`exchangeTo`: String, `photo`: String } and return the Exchange created Information.

###### `desactivateExchange`: takes an input parameter called `id` and return Exchange information with desactivate status

###### `deleteExchange`: takes an input parameter called `id` and return Exchange deleted information.













