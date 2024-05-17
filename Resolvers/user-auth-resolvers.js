

const bcrypt = require("bcrypt");
const { GraphQLError } = require("graphql");

const loginResolver = async (parent, args) => {
  const { email, password } = args;
  const user = usersDB.find((user) => user.email === email);
  if (!user) throw new Error("Invalid Credentials");
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) throw new Error("Invalid Credentials");

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
  const isDuplicateUser = !!usersDB
    .find(({ email }) => user.email === email);
  console.log(usersDB);
  if (isDuplicateUser) {
    throw new GraphQLError("the email you entered is duplicate", {
      extensions: { code: "DUPLICATE_EMAIL" }
    })
  }
  const userDoc = {
    ...user,
    password: await bcrypt.hash(user.password, 12),
  }

  usersDB.push(userDoc);
  console.log(usersDB);
  return { isSuccess: true, message: "User registered successfully" };
}

module.exports = {
  registerUserResolver,
  loginResolver
}