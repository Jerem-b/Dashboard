const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    strategy: {
        type: String,
        enum: ['local', 'github'],
        required: true
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    services: [{
        name: String,
        widgets: [
            {
                name: String,
                refreshRate: Number,
                size: Number,
                options: String
            }
        ]
    }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;