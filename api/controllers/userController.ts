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
        const newUser = new users({ ...payload, password: hashPassword });
        const result = await newUser.save();
        res.status(201).json({ status: true, result });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await users.find();
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const getSingleUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const query = req.query;

        if (Object.keys(query).length === 0) {
            res.status(400).json({ message: 'At least one query parameter is required' });
            return;
        }

        const key = Object.keys(query)[0];
        const value = query[key] as string;

        // Find the user based on the query parameter
        const user = await users.findOne({ [key]: value });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};