import express from 'express'
import { checkAuth } from '../middlewares/checkAuth.js';

const routes = express.Router();

routes.get('/', checkAuth, (req, res) => {
      console.log(req.user);
      res.json('you got the private route');
})

export default routes;