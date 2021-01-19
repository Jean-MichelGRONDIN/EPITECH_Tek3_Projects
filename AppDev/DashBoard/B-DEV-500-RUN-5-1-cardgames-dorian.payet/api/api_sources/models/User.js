// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const UserSchema = new Schema({
//     username:   String,
//     email:      String,
//     password:   String,
// });

// const User = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:   String,
    email:      String,
    password:   String,
    config:     {
        customer: {
            host: String
        },
        server: {
            current_time: String,
            services: [{
                name: String,
                widgets: [{
                    name: String,
                    description: String,
                    params: [{
                        name: String,
                        type: String
                    }]
                }]
            } ]
        }
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;