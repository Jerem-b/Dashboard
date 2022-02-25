const mongoose = require('mongoose');
require('dotenv').config();

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = InitiateMongoServer;