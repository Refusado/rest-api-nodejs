const router = require('express').Router();
const ActivityController = require('../controllers/ActivityController');

router.post('/person', ActivityController.create);
router.get('/person', ActivityController.read);
router.get('/person/:id', ActivityController.read);
router.patch('/person/:id', ActivityController.update);
router.delete('/person/:id', ActivityController.delete);

module.exports = router;