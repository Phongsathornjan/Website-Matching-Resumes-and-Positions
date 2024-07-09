const mongoose = require('mongoose');

const {MONGO_URI} = process.env;

exports.connect = async () => {

    //Connecting to the database
    await mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected Success to database');
    })
    .catch((error) => {
        console.log('Error to connect to database');
        console.log(error);
        process.exit(1);
    })
}