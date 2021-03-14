import mongoose from 'mongoose';

interface UserAttrs {
    email: string;
    password: string
}

interface UserModal extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}

interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}); 

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModal>('User', userSchema);


export { User }