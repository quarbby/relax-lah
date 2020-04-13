var Entry = require('../models/entry');

const PAGECONTROLLER_TYPE_ENUM = {
    STARTSMILEY: 'startsmiley',
    WORRY: 'worry',
    RELAX: 'relax',
    MEDITATION: 'meditation',
    FEEDBACK: 'feedback',
    FEEDBACK_SMILEY: 'feedbackSmiley',
    BYE: 'bye'
}

var entryObjId = undefined;

exports.index = function(req, res) {   
    res.render('index', { title: 'Relax Lah' });
};

exports.show_page = function(req, res) {
    const pageType = req.body.pageType;
    console.log(pageType)

    switch(pageType) {
        case PAGECONTROLLER_TYPE_ENUM.STARTSMILEY:
            entryObjId = parseInt(req.body.startDate);
            writeSmileyToDb(req.body, entryObjId);
            res.render('worry');
            break;

        case PAGECONTROLLER_TYPE_ENUM.WORRY:
            writeWorryToDb(req.body, entryObjId);
            res.render('meditation');
            break;

        case PAGECONTROLLER_TYPE_ENUM.MEDITATION:
            res.render('final');
            break;
        
        case PAGECONTROLLER_TYPE_ENUM.FEEDBACK_SMILEY:
            var statusCode = writeFeedbackSmileyIntoDb(req.body, entryObjId);
            //res.send(statusCode.toString());
            res.render('smiles');
            break;

        case PAGECONTROLLER_TYPE_ENUM.FEEDBACK:
            if (req.body.feedbackText == '') {
                res.render('bye');
            }

            var statusCode = writeIntoDb(req.body, entryObjId);
            console.log(statusCode);
            res.render('bye');
            // if (statusCode == 200) {
            //     res.render('bye');
            // }
            // else if (statusCode == 500) {
            //     res.render('error');
            // }
            entryObjId = undefined;
            break;

        default:
            res.render('index');
            break;
    }
}

async function writeSmileyToDb(dataToWrite, entryObjId) {
    var newEntry = new Entry({
        start_smiley: parseInt(dataToWrite['startSmiley']),
        date_of_entry: new Date(),
        date_of_start: dataToWrite['startDate'],
        _id: entryObjId
    });
    newEntry.save()
        .then(item => {
        console.log("item saved to database");

        entryObjId = newEntry._id;
        console.log('new entry id: ' + entryObjId)
        return entryObjId;
    })
        .catch(err => {
        console.log(err);
        return undefined;
    });
}

async function writeWorryToDb(dataToWrite, entryObjId) {
    var newEntry = new Entry({
        entry_text: dataToWrite['entryText'],
        start_smiley: parseInt(dataToWrite['startSmiley']),
        date_of_entry: new Date(),
        date_of_start: dataToWrite['startDate'],
        date_of_end: dataToWrite['endDate'],
        _id: entryObjId
    });

    var responseStatus = findEntryAndUpdate(newEntry, entryObjId);
    return responseStatus;
}

async function writeFeedbackSmileyIntoDb(dataToWrite, entryObjId) {
    var newEntry = new Entry({
        entry_text: dataToWrite['entryText'],
        start_smiley: parseInt(dataToWrite['startSmiley']),
        end_smiley: parseInt(dataToWrite['endSmiley']),
        date_of_entry: new Date(),
        date_of_start: dataToWrite['startDate'],
        date_of_end: dataToWrite['endDate'],
        _id: entryObjId
    });

    var responseStatus = findEntryAndUpdate(newEntry, entryObjId);
    return responseStatus;
}

function writeIntoDb(dataToWrite, entryObjId) {
    if (!('feedbackText' in dataToWrite)) {
        dataToWrite['feedbackText'] = '';
    }

    var newEntry = new Entry({
        entry_text: dataToWrite['entryText'],
        feedback: dataToWrite['feedbackText'],
        start_smiley: parseInt(dataToWrite['startSmiley']),
        end_smiley: parseInt(dataToWrite['endSmiley']),
        date_of_entry: new Date(),
        date_of_start: dataToWrite['startDate'],
        date_of_end: dataToWrite['endDate'],
        _id: entryObjId
    });

    var responseStatus = findEntryAndUpdate(newEntry, entryObjId);
    return responseStatus;
}

function findEntryAndUpdate(newEntry, entryObjId) {
    var query = {_id: entryObjId};

    Entry.findOneAndUpdate(query, newEntry, {upsert: true}, function(err, doc) {
        if (err) {
            console.log(err);
            return 500;
        }
        return 200;
    });
}
