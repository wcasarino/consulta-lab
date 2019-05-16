const router = require('express').Router();

const Protocolo = require('../models/Protocolo');
const { isAuthenticated } = require('../helpers/auth');

router.get('/paciente/seek', isAuthenticated, (req, res) => {
    //res.send('OK LOCO');
    res.render('pacientes/seek-paciente');
});

router.post('/paciente/seek', isAuthenticated, async (req, res) => {
    const { DNI } = req.body;
    const errors = [];
    if (!DNI) {
        errors.push({text: 'Por favor ingrese un DNI'});
        res.render('pacientes/seek-paciente', {
            errors,
            DNI
        });
    }else {
        const pacientes = await Protocolo.find({"Paciente.DNI": DNI})
        .limit(15)
        .sort({ Fecha: -1 });
        //console.log(pacientes, DNI);
        res.render('pacientes/seek-paciente', { pacientes });
    }
});

router.get('/protocolo/view/:id', isAuthenticated, async (req, res) => {
    const protocolo = await Protocolo.findById(req.params.id);
    res.render('partials/protocolo', {protocolo});
});


module.exports = router;