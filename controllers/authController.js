import bcrypt from 'bcryptjs'
import User from '../model/User.js'
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
      try {
            if (req.body.password) {
                  const salt = bcrypt.genSaltSync(10);
                  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

                  await User.create({
                        username: req.body.username,
                        password: hashedPassword,
                  })

                  res.status(201).json('new user created');
            } else {
                  res.status(403).json('please provide a password');
            }
      } catch (err) {
            res.status(500).json(err.message);
      }
}

export const login = async (req, res) => {
      try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                  return res.status(404).json('user not found');
            }
            const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
            if(!isPasswordCorrect){
                  return res.status(400).json('Wrong Password');
            }

            const payload = {
                  id : user.id,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET,{ expiresIn: '1d'});
            res.cookie('access_token', token, {
                  httpOnly: true,
            }).status(200).json({
                  username: user.username,
            })
      } catch (err) {
            res.status(500).json(err.message);
      }
}

export const logout = (req, res) => {
      res.clearCookie('access_token');
      res.status(200).json('Logout Successfully')
}