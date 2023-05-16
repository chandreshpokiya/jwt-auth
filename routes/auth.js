import express from 'express';
import { login, logout, register } from '../controllers/authController.js';

const routes = express.Router();

routes.post('/register',register)
routes.post('/login',login)
routes.get('/logout',logout)

export default routes