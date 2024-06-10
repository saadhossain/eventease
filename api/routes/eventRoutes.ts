import express from 'express';
import { createEvent, getAllEvents } from '../controllers/eventController';

const router = express.Router();

router.get('/events', getAllEvents);
router.post('/events', createEvent);

export default router;
