const router = require('express').Router();

const Protocolo = require('../models/Protocolo');
const { isAuthenticated } = require('../helpers/auth');

router.post('/protocolo/seek/:id', isAuthenticated, async (req, res) => {
    //console.log(req.params)
    const { id } = req.params;
    const protocolo = await Protocolo.findById(id); 
    res.json(protocolo);
});

module.exports = router;