import { Request, Response } from 'express';
import users from '../models/users';
const bcrypt = require('bcrypt');

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const payload = req.body;
        const isExists = await users.findOne({ email: payload.email });
        if (isExists) {
            res.status(409).json({ message: 'User already exists' });
            return;
        }
        const hashPassword = await bcrypt.hash(payload.password, 10);
        const newUser = new users({ ...payload, password:hashPassword });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
} 

export const getAllUsers = async(req: Request, res: Response): Promise<void> => {
    try {
        const allUsers = await users.find();
        res.status(200).json(allUsers);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}