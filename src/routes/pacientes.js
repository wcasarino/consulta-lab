const router = require('express').Router();

const Protocolo = require('../models/Protocolo');
const { isAuthenticated } = require('../helpers/auth');
const { formatFecha } =  require('../helpers/ffecha');

router.get('/pacientes/seek', isAuthenticated, (req, res) => {
    res.render('pacientes/seek-paciente');
});

router.post('/pacientes/seek', isAuthenticated, async (req, res) => {
    const { opcion, dato } = req.body;
    //console.log(req.body);
    //let viewModel = { pacientes: {}, lastProtocolo: Date };
    const errors = [];
    let pacientes = {}
    // console.log(dato)
    // console.log(Number.isInteger(dato));
    // console.log(Number.isNaN(dato));
    // console.log(isNaN(dato));

    if (!dato) {
        errors.push({text: 'Por favor ingrese un dato valido'});
        res.render('pacientes/seek-paciente', {
            errors,
            dato
        });
    }else { if (opcion == 1 && isNaN(dato) == false){
            pacientes = await Protocolo.find({"Paciente.DNI": dato})
                .limit(15)
                .sort({ Fecha: -1 });

            }else if (opcion == 2){
                pacientes = await Protocolo.find({"Paciente.Nombre": {$regex: dato ,$options:"$i"} })
                    .limit(15)
                    .sort({ Fecha: -1 });

                }else if (opcion == 3 && isNaN(dato) == false){
                    pacientes = await Protocolo.find({"Protocolo": dato})
                        .limit(15)
                        .sort({ Fecha: -1 });

    }
        //viewModel.pacientes = pacientes;
        //const { Fecha } = await Protocolo.findOne().sort({Fecha: -1});
        //viewModel.lastProtocolo = formatFecha(Fecha);
        console.log(pacientes);
        res.json(pacientes);
    }
});

module.exports = router;