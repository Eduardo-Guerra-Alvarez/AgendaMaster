const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Participant = new Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: false },
    password: { type: String, required: true }
});

module.exports = mongoose.model('Participant', Participant);
