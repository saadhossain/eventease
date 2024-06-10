import mongoose, { Schema } from 'mongoose';

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    // image: {
    //     type: String,
    //     required: true,
    // },
    password: {
        type: String,
        required: true,
    }
});

export default mongoose.model('users', userSchema);
