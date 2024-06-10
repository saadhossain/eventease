import { Request, Response } from 'express';
import events from '../models/events';

export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const allEvents = await events.find();
    res.json(allEvents);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const newEvent = new events(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};
