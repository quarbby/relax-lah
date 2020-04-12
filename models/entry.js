var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EntrySchema = new Schema(
{
    _id: Number,
    entry_text: {type: String, required: true},
    feedback: {type:String},

    start_smiley: {type: Number, required: true},
    end_smiley: {type: Number},

    date_of_entry: {type: Date, default: Date.now()},
    date_of_start: {type: Date, required: true},
    date_of_end: {type: Date, required: true}
});

module.exports = mongoose.model('Entry', EntrySchema);