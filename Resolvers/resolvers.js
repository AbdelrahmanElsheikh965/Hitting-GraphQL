

const { registerUserResolver, loginResolver } = require("./user-auth-resolvers");
const User = require("../Models/User");

/*
  No need now for db.json restApi on port 3000 -> But a real MongoDB server.
  
  const axios = require('axios').default;
  const restApi = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 10000,
    headers: {
      "X-Token": "token",
    }
  });

*/

const resolvers = {

  User: {
    posts: async (parent, args) => {
      const userPosts = await User.find({ _id: parent.id }, 'posts').limit(args.last);
      return {userPosts};
    }
  },

  Mutation: {
    register: registerUserResolver,
    login: loginResolver,
  },

  Query: {


    profile: () => {
      return { name: "ahmed", email: "test@mail.com" }
    },


    getUsers: async (parent, args, context) => {
      const { pagination: { page, count } } = args;

      if(!context.loggedUser?.email) {
        throw new Error("UNAUTHORIZED");
      }

      const users = await User.find({}).skip(page).limit(count);
      return users;
      
    },


    getUserByID: async (parent, args) => {
      const { userId } = args;
      
      const user = await User.findById(userId);

      return user;
    }

    
  }
}

module.exports = { resolvers };