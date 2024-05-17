const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./Resolvers/resolvers");
const jwt = require('jsonwebtoken');

// Handle database connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/graphql');

const app = new ApolloServer({
  context: async (ctx) => {
    let loggedUser = null;
    const token = ctx.req.headers["authorization"];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      loggedUser = payload;
    } catch (error) {
      console.error(error);
    }
    
    return { loggedUser };
  },
  typeDefs,
  resolvers,
});

app.listen(3001)
 .then(() => console.log("server started"));