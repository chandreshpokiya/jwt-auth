import { request } from 'http';
import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
      const token = req.cookies.access_token;
      if (!token) {
            return res.status(401).json('you are not authorized');
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                  return res.status(403).json('Invalid token');
            }
            req.user = {
                  id: payload.id
            }
            next();
      })
}