const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('./controllers/registerController');
const {login} = require('./controllers/loginController');
const {getUser} = require('./controllers/getUserController');
const validators = require('./validators');
const delController = require('./controllers/delController');
const updateController = require('./controllers/updateController');

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
    body('username',"username minimal 3 karakter")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('password',"Password minimal 4 karakter").notEmpty().trim().isLength({ min: 4 }),
], register);


router.post('/login',[
    body('username',"Username Salah")
    .notEmpty()
    .escape()
    .trim(),
    body('password',"Password harus minimal 4 karakter").notEmpty().trim().isLength({ min: 4 }),
],login);

router.get('/getuser',getUser);

module.exports = router;
