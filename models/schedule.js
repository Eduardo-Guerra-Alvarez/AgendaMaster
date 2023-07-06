const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Schedule = new Schema({
    title: { type: String, required: true },
    link: { type: String, required: false },
    comments: { type: String, required: false },
    date: { type: Date, required: true },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'Participant'
    }] 
});

module.exports = mongoose.model('Schedule', Schedule);
