import { Request, ResponseToolkit } from '@hapi/hapi';
import User, { IUser } from '../models/User';

export const getUsers = async (req: Request, h: ResponseToolkit) => {
    try {
        const users = await User.find();
        return h.response(users);
    } catch (err: any) {
        return h.response(err.message);
    }
}

export const getUser = async (req: Request, h: ResponseToolkit) => {
    try {
        const { userId } = req.params;
        const userFound = await User.findById(userId);
        if (userFound) return h.response(userFound);
        return h.response().code(404);
    } catch (err: any) {
        return h.response(err.message);
    }
}

export const createUser = async (req: Request, h: ResponseToolkit) => {
    try {
        const userSaved = new User(req.payload);
        const userAdded = await userSaved.save();
        return h.response(userAdded);
    } catch (err: any) {
        return h.response(err.message);
    }
}

export const updatedUser = async (req: Request, h: ResponseToolkit) => {
    try {
        const { userId } = req.params;
        const { username, fullName } = req.payload as IUser;

        const userUpdated = await User.findByIdAndUpdate(userId, { username, fullName }, { new: true });

        if (userUpdated) return h.response(userUpdated);

        return h.response().code(404)
    } catch (err: any) {
        return h.response(err.message);
    }
}

export const deletedUser = async (req: Request, h: ResponseToolkit) => {
    try {
        const { userId } = req.params;
        const userDeleted = await User.findByIdAndDelete(userId);

        if (userDeleted) return h.response(deletedUser);

        return h.response().code(404)
    } catch (err: any) {
        return h.response(err.message);
    }
}