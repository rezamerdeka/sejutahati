const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('./controllers/registerController');
const {login} = require('./controllers/loginController');
const {getUser} = require('./controllers/getUserController');
const validators = require('./validators');
const delController = require('./controllers/delController');
const updateController = require('./controllers/updateController');
const userController = require('./controllers/userController');

router.patch(
    '/update-user/:id',
    [...validators.userID, ...validators.userInfo],
    validators.result,
    updateController.updateUser
    );

router.delete(
    '/delete-user/:id',
    validators.userID,
    validators.result,
    delController.delUser
    );

router.post('/register', [
    body('username',"The name must be of minimum 3 characters length")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
], register);


router.post('/login',[
    body('username',"Invalid username")
    .notEmpty()
    .escape()
    .trim(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
],login);

router.get('/getuser',getUser);

module.exports = router;
