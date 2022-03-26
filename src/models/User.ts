import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    username: string;
    fullName: string;
    password: string;
    comparePassword: (password: string) => Promise<Boolean>
}

const userSchema = new Schema({
    username: { type: String, required: true, lowercase: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

userSchema.pre<IUser>('save', async function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comprarePassword = async function(password: string): Promise<Boolean> {
    return await bcrypt.compare(password, this.password);
}

export default model('User ', userSchema);
