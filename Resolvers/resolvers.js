

const { registerUserResolver, loginResolver } = require("./user-auth-resolvers");

const resolvers = {
  User: {
    posts: async (parent, args) => {
      const { data: userPosts } = await restApi
        .get(`/users/${parent.id}/posts?_limit=${args.last}`);
      return userPosts;
    }
  },
  Mutation: {
    register: registerUserResolver,
    login: loginResolver,
  },
  Query: {
    profile: () => {
      return {};
      return { name: "ahmed", email: "test@sedfsd.com" }
    },
    getUsers: async (parent, args, context) => {
      const { pagination: { page, count } } = args;

      if(!context.loggedUser?.email) {
        throw new Error("UNAUTHORIZED");
      }
      
      const { data: users } = await restApi
        .get(`/users?_limit=${count}&_page=${page}`);

      return users;
    },
    getUserByID: async (parent, args) => {
      const { userId } = args;
      
      const { data: user } = await restApi
        .get(`/users/${userId}`);

      return user;
    }
  }
}

module.exports = { resolvers };