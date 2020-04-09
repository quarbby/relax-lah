var express = require('express');
var router = express.Router();

var page_controller = require('../controllers/pageController');

router.get('/', page_controller.index);
router.post('/', page_controller.worry_page);

module.exports = router;
