"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = exports.getAllEvents = void 0;
const events_1 = __importDefault(require("../models/events"));
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allEvents = yield events_1.default.find();
        res.json(events_1.default);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getAllEvents = getAllEvents;
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEvent = new events_1.default(req.body);
        const savedEvent = yield newEvent.save();
        res.status(201).json(savedEvent);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.createEvent = createEvent;
