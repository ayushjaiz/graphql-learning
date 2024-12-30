import { quotes, users } from "./fakedb.js"
import { v4 as uuidv4 } from 'uuid';
import User from "./models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { comparePassword, createHash, generateToken } from "./utils.js";

const resolvers = {
    Query: {
        getAllUsers: async () => {
            return await User.find({}, { password: 0 });
        },
        getUser: async (_, { token }) => {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                const user = await User.findById(decoded.id,{ password: 0 });
                if (!user) {
                    throw new Error("User not found");
                }

                return user;
            } catch (err) {
                throw new Error('Unauthorized User')
            }
        },
    },
    // User: {
    //     quotes: (user) => quotes[0]
    // },
    Mutation: {
        signupUser: async (_, { input }) => {
            const { email, password, name } = input;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists')
            }

            const hashedPassword = await createHash(password);

            const newUser = new User({ email, name, password: hashedPassword });

            const savedUser = await newUser.save();
            return savedUser;
        },
        loginUser: async (_, { input }) => {
            const { email, password } = input;

            const dbUser = await User.findOne({ email });
            if (!dbUser) {
                throw new Error('No such user exists')
            }

            const isMatch = await comparePassword(dbUser.password, password);
            if (!isMatch) {
                throw new Error('Password or email is wrong')
            }

            const token = generateToken(dbUser);

            return token;
        },
    },
}

export default resolvers;

