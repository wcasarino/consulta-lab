const helpers = {};

helpers.formatFecha = (Fecha) => {
    Fecha.setDate(Fecha.getDate()+1);
    //console.log(Fecha);
    let dd = Fecha.getDate();
    let mm = Fecha.getMonth()+1; 
    const yyyy = Fecha.getFullYear();
    if(dd<10) 
    {
        dd=`0${dd}`;
    } 

    if(mm<10) 
    {
        mm=`0${mm}`;
    } 
    Fecha = `${dd}-${mm}-${yyyy}`;
    //console.log(Fecha);
    return Fecha;
}

module.exports = helpers;