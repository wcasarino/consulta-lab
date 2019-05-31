const router = require('express').Router();

const Protocolo = require('../models/Protocolo');
const { isAuthenticated } = require('../helpers/auth');

router.get('/pacientes/seek', isAuthenticated, (req, res) => {
    res.render('pacientes/seek-paciente');
});

router.post('/pacientes/seek', isAuthenticated, async (req, res) => {
    const { opcion, dato } = req.body;
    const errors = [];
    let pacientes = {}
    //console.log(dato)

    if (dato) {
        if (opcion == 1 && isNaN(dato) == false){
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
    }
    res.json(pacientes);
    
});

module.exports = router;