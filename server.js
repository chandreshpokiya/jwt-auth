import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import privateRoutes from './routes/private.js'
import authRoutes from './routes/auth.js';

const PORT = process.env.PORT || 5000;
const app = express();
import './config/mongoose.js'

app.use(cookieParser());
app.use(express.json())

app.use('/auth',authRoutes)
app.use('/private', privateRoutes);

app.listen(PORT, (err) => {
      if (err) {
            console.log(err);
            return false;
      }
      console.log('server is listening on port http://localhost:' + PORT);
})