

exports.index = function(req, res) {   
    res.render('index', { title: 'Relax Lah' });
};

exports.worry_page = function(req, res) {
    console.log('POST ' + req.body.id);
    res.render('worry');
}

exports.show_worry_page = function(req, res) {
    console.log('Show Worry Page')
    //res.render('worry', { title: 'Relax Lah' });
}

exports.show_page = function(req, res) {
    const pageType = res.body.pageType;

    switch(pageType) {
        case "startsmiley":
            console.log('POST ' + req.body.id);
            res.render('worry');
            break;

        case "worry":
            res.render('relax');
            break;

        case "relax":
            res.render('smiley');
            break;

        case "endsmiley":
            res.render('worry');
            break;
        
        case "feedback":
            res.render('worry');
            break;

        default:
            res.render('index');
            break;
    }
}