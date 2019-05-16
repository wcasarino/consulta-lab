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
        const pacientes = await Protocolo.find({"Paciente.DNI": DNI});
        console.log(pacientes, DNI);
        res.render('pacientes/seek-paciente', { pacientes });
    }
});

router.get('/notes', isAuthenticated, async (req, res) => {
    const notes = await Note.find({user: req.user.id}).sort({date: 'desc'});
    res.render('notes/all-notes', { notes });
});

router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note', {note});
});

router.put('/notes/edit-note/:id', isAuthenticated,  async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Nota ACTUALIZADA satisfactoriamente');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota BORRADA satisfactoriamente');
    res.redirect('/notes');
});

module.exports = router;