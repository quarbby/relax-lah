var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EntrySchema = new Schema(
{
    entry: {type: String, required: true},
    feedback: {type:String},

    start_smiley: {type: Number},
    end_smiley: {type: Number},
    relaxation_activity: {type: String},

    date_of_entry: {type: Date, default: Date.now()},
    date_of_start: {type: Date},
    date_of_end: {type: Date}
});

module.exports = mongoose.model('Entry', EntrySchema);