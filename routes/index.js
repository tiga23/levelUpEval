var express = require('express');
var router = express.Router();

const FormController = require('../controllers/FormController');

/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

router.get("/", FormController.form);

router.post("/submitInfo/", FormController.check);

module.exports = router;
