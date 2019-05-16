const router = require('express').Router();

const User = require('../models/User');

const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/paciente/seek',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const {name, email, password, confirm_password } =  req.body;
    const errors = []
    if (name.length <= 0) {
        errors.push({text: 'Debe ingresar un Nombre'});
    }
    if (email.length <= 0) {
        errors.push({text: 'Debe ingresar un email'});
    }
    if (password != confirm_password) {
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    if (password.length < 5) {
        errors.push({text: 'La contraseña debe tener al menor 4 caracteres'});
    }
    if (errors.length > 0) {
        res.render('users/signup', {errors, name, email, password, confirm_password});
    }else {
        //console.log(email, this.email);
        const emailUser = await User.findOne({email: email});
        //console.log(emailUser);
        if(emailUser){
            req.flash('error_msg', 'El email está en Uso!');
            res.redirect('/users/signup');
        }
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Usuario Creado');
        res.redirect('/users/signin');
    }
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;