const router  = require('express').Router();
const UserController = require('../controllers/UserController');

router.post('/user', UserController.create);
router.get('/user', UserController.read);
router.get('/user/:id', UserController.read);
router.patch('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete);

module.exports = router;