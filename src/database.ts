import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URL || '')
    .then(db => console.log('Db is connect'))
    .catch(e => console.log(e));