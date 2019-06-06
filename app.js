var Service = require('node-windows').Service;
 
// Create a new service object
var svc = new Service({
  name:'Consulta LAB',
  description: 'Web Server para las consultas de estudios de Laboratorio de CAPS Dr. A. BARASSI',
  script: 'D:\\Users\\User\\Desktop\\Curso\\Consulta-Lab\\src\\index.js'
  
});
 
// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});
 
svc.install();