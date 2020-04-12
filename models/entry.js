var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EntrySchema = new Schema(
{
    _id: Number,
    entry_text: {type: String},
    feedback: {type:String},

    start_smiley: {type: Number},
    end_smiley: {type: Number},

    date_of_entry: {type: Date, default: Date.now()},
    date_of_start: {type: Date},
    date_of_end: {type: Date}
});

module.exports = mongoose.model('Entry', EntrySchema);