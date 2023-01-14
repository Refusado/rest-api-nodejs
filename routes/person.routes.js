const router  = require('express').Router();
const PersonController = require('../controllers/PersonController');

router.post('/person', PersonController.create);
router.get('/person', PersonController.read);
router.get('/person/:id', PersonController.read);

module.exports = router;