const mongoose = require('mongoose');


const connectDatabase = async ()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/smehealthcheck?directConnection=true')
}

module.exports = connectDatabase;