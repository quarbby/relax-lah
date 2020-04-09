

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