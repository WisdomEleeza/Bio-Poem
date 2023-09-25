import { Schema, model } from "mongoose";
import userInterface from '../../utils/interfaces/users.interface'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
      },
    profileImage: String,
})

export default model<userInterface>('users', userSchema)

// one - one relationship in my requirement
// the createPoem table references the user table