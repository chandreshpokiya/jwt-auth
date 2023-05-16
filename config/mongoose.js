import mongoose from 'mongoose';

mongoose.connect(process.env.DB_CONNECTION);

const db = mongoose.connection;

db.on('error',console.error.bind(console, 'db is not connected'));

db.once('open',(err)=>{
      if(err){
            console.log(err);
            return false;
      }
      console.log('db is connected');
})

export default db;