const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    clientid:         String,
    servicename:   String,
    actions:   [{
        name:          String,
        description:   String
    }],
    reactions:  [{
        name:        String,
        description: String
    }]
});

const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;