const Protocolo = require('../models/Protocolo');

return UltimoProtocolo = async ()  => {
    const { Fecha } = await Protocolo.findOne().sort({ Fecha: -1});
    UltimoProtocolo = Fecha
    console.log(UltimoProtocolo);
    return UltimoProtocolo;
;}
module.exports = UltimoProtocolo;
