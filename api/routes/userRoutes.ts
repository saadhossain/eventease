import express from 'express';
import { createUser, getAllUsers, getSingleUser } from '../controllers/userController';

const router = express.Router();

router.get('/users', getAllUsers);
router.post('/users', createUser);
router.get('/user', getSingleUser);

export default router;
