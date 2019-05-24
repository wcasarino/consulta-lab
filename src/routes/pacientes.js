const router = require('express').Router();

const Protocolo = require('../models/Protocolo');
const { isAuthenticated } = require('../helpers/auth');
const { formatFecha } =  require('../helpers/ffecha');

router.get('/paciente/seek', isAuthenticated, (req, res) => {
    //res.send('OK LOCO');
    //let viewModel = { DNI: String, pacientes: {}, protocolo: {} };
    res.render('pacientes/seek-paciente');
});

router.post('/paciente/seek', isAuthenticated, async (req, res) => {
    const { DNI } = req.body;
    //console.log(req.body)
    let viewModel = { DNI: String, pacientes: {}, protocolo: {}, lastProtocolo: Date };
    viewModel.DNI = DNI;
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
        viewModel.pacientes = pacientes;
        const { Fecha } = await Protocolo.findOne().sort({Fecha: -1});
        viewModel.lastProtocolo = formatFecha(Fecha);
        //console.log(pacientes);
        res.render('pacientes/seek-paciente', viewModel );
    }
});

router.post('/protocolo/seek/:id', isAuthenticated, async (req, res) => {
    let viewModel = { DNI: String, pacientes: {}, protocolo: {}, lastProtocolo: Date };
    const protocolo = await Protocolo.findById(req.params.id); 
    const pacientes = await Protocolo.find({"Paciente.DNI": protocolo.Paciente.DNI})
        .limit(15)
        .sort({ Fecha: -1 });
    viewModel.pacientes = pacientes;
    viewModel.protocolo = protocolo;
    viewModel.DNI = protocolo.Paciente.DNI;
    const { Fecha } = await Protocolo.findOne().sort({Fecha: -1});
    viewModel.lastProtocolo = formatFecha(Fecha);
    res.render('pacientes/seek-paciente', viewModel );
    //res.send('ok');
});


module.exports = router;