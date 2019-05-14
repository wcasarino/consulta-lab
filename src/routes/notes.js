const router = require('express').Router();

router.get('/notes', (req, res) => {
    res.send('Ingresando Notas');
});

module.exports = router;