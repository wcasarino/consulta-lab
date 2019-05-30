const router = require('express').Router();

const Protocolo = require('../models/Protocolo');
const { isAuthenticated } = require('../helpers/auth');
const { formatFecha } =  require('../helpers/ffecha');

router.post('/protocolo/seek/:id', isAuthenticated, async (req, res) => {
    console.log(req.body, req.params)
    const { id } = req.params;
    //const { name } = req.body;
    //let viewModel = { DNI: String, pacientes: {}, protocolo: {}, lastProtocolo: Date };
    const protocolo = await Protocolo.findById(req.params.id); 
    /*
    const pacientes = await Protocolo.find({"Paciente.DNI": protocolo.Paciente.DNI})
        .limit(15)
        .sort({ Fecha: -1 });
    viewModel.pacientes = pacientes;
    viewModel.protocolo = protocolo;
    viewModel.DNI = protocolo.Paciente.DNI;
    const { Fecha } = await Protocolo.findOne().sort({Fecha: -1});
    viewModel.lastProtocolo = formatFecha(Fecha);
    res.render('pacientes/seek-paciente', viewModel );
    */
   res.json(protocolo);
    //res.send('ok');
});

router.get('/protocolo/seek/:id', isAuthenticated, async (req, res) => {
    res.json({
        protocolos: ['protocolo1', 'protocolo2']
    })
})


module.exports = router;