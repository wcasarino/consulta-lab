const router = require('express').Router();

router.get('/users/signin', (req, res) => {
    res.send('Ingresando a La APP');
});

router.get('/users/signup', (req, res) => {
    res.send('Creando el usurio');
});

module.exports = router;