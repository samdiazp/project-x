"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = require("jsonwebtoken");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.send('Hello World!');
});
app.post('/api/validate', (req, res) => {
    const body = req.body;
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('Missing JWT_SECRET');
    }
    try {
        const decoded = (0, jsonwebtoken_1.verify)(body.jwt, secret);
        res.status(200).json(decoded);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
app.listen('8000', () => {
    console.log('Server is listening on port 8000');
});
