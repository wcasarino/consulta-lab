$(function () {

    const URI_PAC = '/pacientes/seek';
    const URI_PRO = '/protocolo/seek';
                     

    $('#pacienteForm').on('submit', (e) => {
        e.preventDefault();
        let inputGroupSelect01 = $('#inputGroupSelect01');
        let datoPaciente = $('#datoPaciente');
        $.ajax({
            url: URI_PAC,
            method: 'POST',
            dataType: 'json',
            data: {
                opcion: inputGroupSelect01.val(),
                dato: datoPaciente.val()
            },
            success: function(pacientes) {
                let tbody = $('tbody');
                tbody.html('');
                let divProtocolo = $('#protocolo1');
                divProtocolo.html('');
                console.log(pacientes);
                if (pacientes) {
                    pacientes.forEach(paciente => {
                        let str = paciente.Fecha.toString()
                        //console.log('STRING ',str);
                        let ff = str.substr(8,2)+str.substr(4,4)+str.substr(0,4);
                        //console.log(ff);
                    tbody.append(`
                        <tr>
                            <td style="display:none" class="id">${paciente._id}</td>
                            <td>${ff}</td>
                            <td>${paciente.Protocolo}</td>
                            <td>${paciente.Paciente.DNI}</td>
                            <td>${paciente.Paciente.Nombre}</td>
                            <td>
                            <button class="update-button">VER</button>
                            </td>
                        </tr>
                    `)
                    })
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    });

    $('table').on('click', '.update-button', function(e) {
        e.preventDefault();
        let row = $(this).closest('tr');
        let id = row.find('.id').text();
           
        $.ajax({
          url: `${URI_PRO}/${id}`,
          method: 'POST',
          dataType: 'json',
          data: {
            
          },
          success: function(protocolo) {
                console.log(protocolo);
                let divProtocolo = $('#protocolo1');
                divProtocolo.html('');
                let str1 = protocolo.Fecha.toString()
                let ff1 = str1.substr(8,2)+str1.substr(4,4)+str1.substr(0,4);
                let texto = "";
                texto = texto + `
                    <div class="card mb-2">
                    <div class="card-header bg-dark text-white">
                    <h5>${protocolo.Paciente.Nombre} ---- Protocolo ${protocolo.Protocolo} ----  Fecha ${ff1}</h5>
                    </div>
                    <div class="card-body">
                    <div class="row">
                    <div class="col-md-4">
                    <div class="card">
                    <div class="card-header bg-dark text-white">
                        Hemograma
                    </div>
                    <div class="card-body">`;
                if (protocolo.Hemograma.Eritrocitos) { texto = texto + `<p>Eritrocitos: <strong>${protocolo.Hemograma.Eritrocitos}</strong> <span> mm3</span></p>`};
                if (protocolo.Hemograma.Hemoglobina) { texto = texto + `<p>Hemoglobina: <strong>${protocolo.Hemograma.Hemoglobina}</strong> <span> g/dl</span></p>`};
                if (protocolo.Hemograma.Hematocritos) { texto = texto + `<p>Hematocritos: <strong>${protocolo.Hemograma.Hematocritos}</strong> <span> %</span></p>`};
                if (protocolo.Hemograma.Leucocitos) { texto = texto + `<p>Leucocitos: <strong>${protocolo.Hemograma.Leucocitos}</strong> <span> mm3</span></p>`};
                if (protocolo.Hemograma.Plaquetas) { texto = texto + `<p>Plaquetas: <strong>${protocolo.Hemograma.Plaquetas}</strong> <span> mm3</span></p>`};
                if (protocolo.Hemograma.Eritrosedimentacion) { texto = texto + `<p>Eritrosedimentacion: <strong>${protocolo.Hemograma.Eritrosedimentacion}</strong> <span> mm</span></p>`};
                texto = texto + `</div></div></div>`;
                
                texto = texto + `
                    <div class="col-md-4">
                    <div class="card">
                    <div class="card-header bg-dark text-white">
                        Formula Leucocitaria
                    </div>
                    <div class="card-body">`;
            console.log(protocolo.Formula_Leucocitaria.Glucemia);
                if (protocolo.Formula_Leucocitaria.Glucemia) { texto = texto + `<p>Glucemia: <strong>${protocolo.Formula_Leucocitaria.Glucemia}</strong> <span> g/l (VR: 0,7 - 1,1 g/l)</span></p>`};
                if (protocolo.Formula_Leucocitaria.Uremia) { texto = texto + `<p>Uremia: <strong>${protocolo.Formula_Leucocitaria.Uremia}</strong> <span> g/l (VR: 0,7 - 1,1 g/l)</span></p>`};
                if (protocolo.Formula_Leucocitaria.Colesterol) { texto = texto + `<p>Colesterol: <strong>${protocolo.Formula_Leucocitaria.Colesterol}</strong> <span> g/l (VR: < de 2 g/l)</span></p>`};
                if (protocolo.Formula_Leucocitaria.HDL_colesterol) { texto = texto + `<p>HDL colesterol: <strong>${protocolo.Formula_Leucocitaria.HDL_colesterol}</strong> <span> g/l (VR: 0,4 - 0,6 g/l)</span></p>`};
                if (protocolo.Formula_Leucocitaria.LDL_colesterol) { texto = texto + `<p>LDL colesterol: <strong>${protocolo.Formula_Leucocitaria.LDL_colesterol}</strong> <span> g/l (VR: < 1,29 g/l)</span></p>`};
                if (protocolo.Formula_Leucocitaria.Trigliceridos) { texto = texto + `<p>Trigliceridos: <strong>${protocolo.Formula_Leucocitaria.Trigliceridos}</strong> <span> g/l (VR.< 1,5 g/l)</span></p>`};
                if (protocolo.Formula_Leucocitaria.Calcemia) { texto = texto + `<p>Calcemia: <strong>${protocolo.Formula_Leucocitaria.Calcemia}</strong><span> mg/dl (VR: 8,5 - 10,5)</span></p>`};
                if (protocolo.Formula_Leucocitaria.Acido_Urico) { texto = texto + `<p>Acido Urico: <strong>${protocolo.Formula_Leucocitaria.Acido_Urico}</strong><span> mg/l (H: h'60  M:h'50)</span></p>`};
                if (protocolo.Formula_Leucocitaria.Creatinina) { texto = texto + `<p>Creatinina: <strong>${protocolo.Formula_Leucocitaria.Creatinina}</strong><span> mg/l (VR: 6 - 13 mg/l)</span></p>`};
                if (protocolo.Formula_Leucocitaria.indice_proteinuria_creatininuria) { texto = texto + `<p>indice proteinuria creatininuria: <strong>${protocolo.Formula_Leucocitaria.indice_proteinuria_creatininuria}</strong><span> mg/g (VR: <150 mg/g)</span></p>`};
                if (protocolo.Formula_Leucocitaria.MDRD_4_IDMS) { texto = texto + `<p>MDRD_4_IDMS: <strong>${protocolo.Formula_Leucocitaria.MDRD_4_IDMS}</strong></strong><span> mL/min/1,73 m2</span></p>`};
                if (protocolo.Formula_Leucocitaria.Proteinas_Totales) { texto = texto + `<p>Proteinas Totales: <strong>${protocolo.Formula_Leucocitaria.Proteinas_Totales}</strong><span> g/l (VR: 6,1 - 7,9 g/l)</span></p>`};
                if (protocolo.Formula_Leucocitaria.Albumina) { texto = texto + `<p>Albumina: <strong>${protocolo.Formula_Leucocitaria.Albumina}</strong><span> g/l (VR: 3,5 - 4,8 g/l)</span></p>`};
                texto = texto + `</div></div></div>`;                
                
                texto = texto + `
                    <div class="col-md-4">
                    <div class="card">
                    <div class="card-header bg-dark text-white">
                        Analisis quimico
                    </div>
                    <div class="card-body">`;
                if (protocolo.Analisis_quimico.Neutrofilos_en_cayados) { texto = texto + `<p>Neutrofilos encayados: <strong>${protocolo.Analisis_quimico.Neutrofilos_en_cayados}</strong> <span> %</span></p>`};
                if (protocolo.Analisis_quimico.Neutrofilos_segmentados) { texto = texto + `<p>Neutrofilos segmentados: <strong>${protocolo.Analisis_quimico.Neutrofilos_segmentados}</strong> <span> %</span></p>`};
                if (protocolo.Analisis_quimico.Eosinofilos) { texto = texto + `<p>Eosinofilos: <strong>${protocolo.Analisis_quimico.Eosinofilos}</strong> <span> %</span></p>`};
                if (protocolo.Analisis_quimico.Basofilos) { texto = texto + `<p>Basofilos: <strong>${protocolo.Analisis_quimico.Basofilos}</strong> <span> %</span></p>`};
                if (protocolo.Analisis_quimico.Linfocitos) { texto = texto + `<p>Linfocitos: <strong>${protocolo.Analisis_quimico.Linfocitos}</strong> <span> %</span></p>`};
                if (protocolo.Analisis_quimico.Monocitos) { texto = texto + `<p>Monocitos: <strong>${protocolo.Analisis_quimico.Monocitos}</strong> <span> %</span></p>`};
                if (protocolo.Analisis_quimico.Alteraciones) { texto = texto + `<p>Alteraciones: <strong>${protocolo.Analisis_quimico.Alteraciones}</strong></p>`};
                texto = texto + `</div></div></div>`;                
                
                texto = texto + `</div></div></div>`;

                console.log(texto);

                divProtocolo.append(texto)
          }
        });
      });

})