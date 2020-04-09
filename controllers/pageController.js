var Entry = require('../models/entry');

const PAGECONTROLLER_TYPE_ENUM = {
    STARTSMILEY: 'startsmiley',
    WORRY: 'worry',
    RELAX: 'relax',
    ENDSMILEY: 'endsmiley',
    FEEDBACK: 'feedback'
}

exports.index = function(req, res) {   
    res.render('index', { title: 'Relax Lah' });
};

exports.show_page = function(req, res) {
    const pageType = req.body.pageType;

    switch(pageType) {
        case PAGECONTROLLER_TYPE_ENUM.STARTSMILEY:
            res.render('worry');
            break;

        case PAGECONTROLLER_TYPE_ENUM.WORRY:
            res.render('relax');
            break;

        case PAGECONTROLLER_TYPE_ENUM.RELAX:
            res.render('smiles');
            break;

        case PAGECONTROLLER_TYPE_ENUM.ENDSMILEY:
            res.render('worry');
            break;
        
        case PAGECONTROLLER_TYPE_ENUM.FEEDBACK:
            writeIntoDb(req.body);
            //res.render('worry');
            break;

        default:
            res.render('index');
            break;
    }
}

function writeIntoDb(dataToWrite) {
    var newEntry = new Entry({
        entry_text: dataToWrite['entryText'],
        feedback: dataToWrite['feedback'],
        start_smiley: parseInt(dataToWrite['startSmiley']),
        end_smiley: parseInt(dataToWrite['endSmiley']),
        relaxation_activity: dataToWrite['relaxActivity'],
        date_of_entry: new Date(),
        date_of_start: dataToWrite['startDate'],
        date_of_end: dataToWrite['endDate']
    });

    newEntry.save()
        .then(item => {
        console.log("item saved to database");
        res.sendStatus(200);
    })
        .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
}

function getCurrentTime() {
    var today = new Date();
    var date = today.getFullYear()+'-' + (today.getMonth()+1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return date + 'T' + time;
}