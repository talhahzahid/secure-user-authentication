import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcrypt"

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});



userSchema.pre("save", function (next) {
    const user = this;
    if (user.isModified('password')) return
    const hashingPassword = bcrypt.hash(user.password, 10)
    user.password = hashingPassword
    next()
})

export default mongoose.model('users', userSchema)