const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors")
const schema = require("./schema")
const users = require("./db/users")

const createUser = (input) => {
  const id = Date.now()
  return {
    id, ...input
  }
}

console.log(users)

const app = express();
const PORT = 5000;

const root = {
  getAllUsers: () => {
    return users
  },
  getUser: ({id}) => {
    return users.find(user => user.id === id)
  },
  createUser: ({input}) => {
    const user = createUser(input)
    users.push(user)
    console.log(users)
    return user
  }
}

app.use(cors())
app.use("/graphql", graphqlHTTP({
  graphiql: true,
  schema,
  rootValue: root
}));

app.listen(PORT, () => {
  console.log("Server started!")
})