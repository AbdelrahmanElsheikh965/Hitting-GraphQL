

const bcrypt = require("bcrypt");
const { GraphQLError } = require("graphql");
const jwt = require('jsonwebtoken');
const User = require("../Models/User");

const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });

const loginResolver = async (parent, args) => {
  const { email, password } = args;
  const user = await User.findOne({ email: email }).exec();
  if (!user) throw new Error("Invalid Credentials");
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) throw new Error("Invalid Credentials");
  
  console.log(`JWT_SECRET: ${process.env.JWT_SECRET}`);

  const userToken = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' },
  )
  
  return {
    isSuccess: true,
    message: "login succeeded",
    token: userToken,
  }
}



const registerUserResolver = async (parent, user) => {
  
  // !! to cast returned value to boolean
  const isDuplicateUser = !!await User.findOne({ email: user.email }).exec();
  
  if (isDuplicateUser) {
    throw new GraphQLError("the email you entered is duplicate", {
      extensions: { code: "DUPLICATE_EMAIL" }
    })
  }
  const userDoc = {
    ...user,
    password: await bcrypt.hash(user.password, 12),
  }
    
  const newUser = await User.create(userDoc);

  return { isSuccess: true, message: "User registered successfully" };
}

module.exports = {
  registerUserResolver,
  loginResolver
}