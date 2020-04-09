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
    console.log("PAGE TYPE " + pageType)

    switch(pageType) {
        case PAGECONTROLLER_TYPE_ENUM.STARTSMILEY:
            res.render('worry');
            break;

        case PAGECONTROLLER_TYPE_ENUM.WORRY:
            res.render('relax');
            break;

        case PAGECONTROLLER_TYPE_ENUM.RELAX:
            res.render('smiley');
            break;

        case PAGECONTROLLER_TYPE_ENUM.ENDSMILEY:
            res.render('worry');
            break;
        
        case PAGECONTROLLER_TYPE_ENUM.FEEDBACK:
            res.render('worry');
            break;

        default:
            res.render('index');
            break;
    }
}