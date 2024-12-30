import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createHash = async (password) => bcrypt.hash(password, 10); // No change

const comparePassword = async (hashedPassword, plainTextPassword) => {
    return bcrypt.compare(plainTextPassword, hashedPassword); // No need for explicit if-else
};

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};

export {
    createHash,
    comparePassword,
    generateToken,
}