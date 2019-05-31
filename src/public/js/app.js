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
                    if (protocolo.Formula_Leucocitaria.Neutrofilos_en_cayados) { texto = texto + `<p>Neutrofilos encayados: <strong>${protocolo.Formula_Leucocitaria.Neutrofilos_en_cayados}</strong> <span> %</span></p>`};
                    if (protocolo.Formula_Leucocitaria.Neutrofilos_segmentados) { texto = texto + `<p>Neutrofilos segmentados: <strong>${protocolo.Formula_Leucocitaria.Neutrofilos_segmentados}</strong> <span> %</span></p>`};
                    if (protocolo.Formula_Leucocitaria.Eosinofilos) { texto = texto + `<p>Eosinofilos: <strong>${protocolo.Formula_Leucocitaria.Eosinofilos}</strong> <span> %</span></p>`};
                    if (protocolo.Formula_Leucocitaria.Basofilos) { texto = texto + `<p>Basofilos: <strong>${protocolo.Formula_Leucocitaria.Basofilos}</strong> <span> %</span></p>`};
                    if (protocolo.Formula_Leucocitaria.Linfocitos) { texto = texto + `<p>Linfocitos: <strong>${protocolo.Formula_Leucocitaria.Linfocitos}</strong> <span> %</span></p>`};
                    if (protocolo.Formula_Leucocitaria.Monocitos) { texto = texto + `<p>Monocitos: <strong>${protocolo.Formula_Leucocitaria.Monocitos}</strong> <span> %</span></p>`};
                    if (protocolo.Formula_Leucocitaria.Alteraciones) { texto = texto + `<p>Alteraciones: <strong>${protocolo.Formula_Leucocitaria.Alteraciones}</strong></p>`};
    
                texto = texto + `</div></div></div>`;                
                
                texto = texto + `
                    <div class="col-md-4">
                    <div class="card">
                    <div class="card-header bg-dark text-white">
                        Analisis quimico
                    </div>
                    <div class="card-body">`;
                if (protocolo.Analisis_quimico.Glucemia) { texto = texto + `<p>Glucemia: <strong>${protocolo.Analisis_quimico.Glucemia}</strong> <span> g/l (VR: 0,7 - 1,1 g/l)</span></p>`};
                if (protocolo.Analisis_quimico.Uremia) { texto = texto + `<p>Uremia: <strong>${protocolo.Analisis_quimico.Uremia}</strong> <span> g/l (VR: 0,7 - 1,1 g/l)</span></p>`};
                if (protocolo.Analisis_quimico.Colesterol) { texto = texto + `<p>Colesterol: <strong>${protocolo.Analisis_quimico.Colesterol}</strong> <span> g/l (VR: < de 2 g/l)</span></p>`};
                if (protocolo.Analisis_quimico.HDL_colesterol) { texto = texto + `<p>HDL colesterol: <strong>${protocolo.Analisis_quimico.HDL_colesterol}</strong> <span> g/l (VR: 0,4 - 0,6 g/l)</span></p>`};
                if (protocolo.Analisis_quimico.LDL_colesterol) { texto = texto + `<p>LDL colesterol: <strong>${protocolo.Analisis_quimico.LDL_colesterol}</strong> <span> g/l (VR: < 1,29 g/l)</span></p>`};
                if (protocolo.Analisis_quimico.Trigliceridos) { texto = texto + `<p>Trigliceridos: <strong>${protocolo.Analisis_quimico.Trigliceridos}</strong> <span> g/l (VR.< 1,5 g/l)</span></p>`};
                if (protocolo.Analisis_quimico.Calcemia) { texto = texto + `<p>Calcemia: <strong>${protocolo.Analisis_quimico.Calcemia}</strong><span> mg/dl (VR: 8,5 - 10,5)</span></p>`};
                if (protocolo.Analisis_quimico.Acido_Urico) { texto = texto + `<p>Acido Urico: <strong>${protocolo.Analisis_quimico.Acido_Urico}</strong><span> mg/l (H: h'60  M:h'50)</span></p>`};
                if (protocolo.Analisis_quimico.Creatinina) { texto = texto + `<p>Creatinina: <strong>${protocolo.Analisis_quimico.Creatinina}</strong><span> mg/l (VR: 6 - 13 mg/l)</span></p>`};
                if (protocolo.Analisis_quimico.indice_proteinuria_creatininuria) { texto = texto + `<p>indice proteinuria creatininuria: <strong>${protocolo.Analisis_quimico.indice_proteinuria_creatininuria}</strong><span> mg/g (VR: <150 mg/g)</span></p>`};
                if (protocolo.Analisis_quimico.MDRD_4_IDMS) { texto = texto + `<p>MDRD_4_IDMS: <strong>${protocolo.Analisis_quimico.MDRD_4_IDMS}</strong></strong><span> mL/min/1,73 m2</span></p>`};
                if (protocolo.Analisis_quimico.Proteinas_Totales) { texto = texto + `<p>Proteinas Totales: <strong>${protocolo.Analisis_quimico.Proteinas_Totales}</strong><span> g/l (VR: 6,1 - 7,9 g/l)</span></p>`};
                if (protocolo.Analisis_quimico.Albumina) { texto = texto + `<p>Albumina: <strong>${protocolo.Analisis_quimico.Albumina}</strong><span> g/l (VR: 3,5 - 4,8 g/l)</span></p>`};

                    texto = texto + `</div></div></div>`;                
                
                    texto = texto + `
                    <div class="col-md-4 mt-2">
                    <div class="card">
                    <div class="card-header bg-dark text-white">
                        Orina
                    </div>
                    <div class="card-body">`;
                if (protocolo.Orina.Color) { texto = texto + `<p>Color: <strong>${protocolo.Orina.Color}</strong></p>`};
                if (protocolo.Orina.Aspecto) { texto = texto + `<p>Aspecto: <strong>${protocolo.Orina.Aspecto}</strong></p>`};
                if (protocolo.Orina.pH) { texto = texto + `<p>pH: <strong>${protocolo.Orina.pH}</strong></p>`};
                if (protocolo.Orina.Densidad) { texto = texto + `<p>Densidad: <strong>${protocolo.Orina.Densidad}</strong></p>`};
                if (protocolo.Orina.Proteinas) { texto = texto + `<p>Proteinas: <strong>${protocolo.Orina.Proteinas}</strong></p>`};
                if (protocolo.Orina.Glucosa) { texto = texto + `<p>Glucosa: <strong>${protocolo.Orina.Glucosa}</strong></p>`};
                if (protocolo.Orina.C_Cetonicos) { texto = texto + `<p>C. Cetonicos: <strong>${protocolo.Orina.C_Cetonicos}</strong></p>`};
                if (protocolo.Orina.Pigm_Biliares) { texto = texto + `<p>Pigm. Biliares: <strong>${protocolo.Orina.Pigm_Biliares}</strong></p>`};
                if (protocolo.Orina.Hemoglobina) { texto = texto + `<p>Hemoglobina: <strong>${protocolo.Orina.Hemoglobina}</strong></p>`};

                if (protocolo.Examen_Microscopico_de_Sedimento.Sensibles) { texto = texto + `<h6 class="bg-dark text-white mx-auto">Examen Microscopico de Sedimento: </h6>`};

                if (protocolo.Examen_Microscopico_de_Sedimento.Sensibles) { texto = texto + `<p>Sensibles: <strong>${protocolo.Examen_Microscopico_de_Sedimento.Sensibles}</strong><span> cantidad</span></p>`};
                if (protocolo.Examen_Microscopico_de_Sedimento.Leucocitos) { texto = texto + `<p>Leucocitos: <strong>${protocolo.Examen_Microscopico_de_Sedimento.Leucocitos}</strong><span> por campo</span></p>`};
                if (protocolo.Examen_Microscopico_de_Sedimento.Hematies) { texto = texto + `<p>Hematies: <strong>${protocolo.Examen_Microscopico_de_Sedimento.Hematies}</strong><span> por campo</span></p>`};
                if (protocolo.Examen_Microscopico_de_Sedimento.Cilindros) { texto = texto + `<p>Cilindros: <strong>${protocolo.Examen_Microscopico_de_Sedimento.Cilindros}</strong></p>`};
                if (protocolo.Examen_Microscopico_de_Sedimento.Cristales) { texto = texto + `<p>Cristales: <strong>${protocolo.Examen_Microscopico_de_Sedimento.Cristales}</strong></p>`};
                if (protocolo.Examen_Microscopico_de_Sedimento.Bacteriuria) { texto = texto + `<p>Bacteriuria: <strong>${protocolo.Examen_Microscopico_de_Sedimento.Bacteriuria}</strong><span> cantidad</span></p>`};
                if (protocolo.Examen_Microscopico_de_Sedimento.Mucus) { texto = texto + `<p>Mucus: <strong>${protocolo.Examen_Microscopico_de_Sedimento.Mucus}</strong></p>`};
                if (protocolo.Examen_Microscopico_de_Sedimento.Observaciones) { texto = texto + `<p>Observaciones: <strong>${protocolo.Examen_Microscopico_de_Sedimento.Observaciones}</strong></p>`};

                texto = texto + `</div></div></div>`;                
                
                
                texto = texto + `
                <div class="col-md-4 mt-2">
                <div class="card">
                <div class="card-header bg-dark text-white">
                    Urocultivo
                </div>
                <div class="card-body">`;
            if (protocolo.Sedimento_urinario.Recuento_de_Colonias) { texto = texto + `<p>Recuento de Colonias: <strong>${protocolo.Sedimento_urinario.Recuento_de_Colonias}</strong><span> UFC/ml de orina</span></p>`};
            if (protocolo.Sedimento_urinario.Tipificacion) { texto = texto + `<p>Tipificacion: <strong>${protocolo.Sedimento_urinario.Tipificacion}</strong></p>`};

            if (protocolo.Antibiograma.Sensibles) { texto = texto + `<h6 class="bg-dark text-white mx-auto">Antibiograma: </h6>`};

            if (protocolo.Antibiograma.Sensibles) { texto = texto + `<p>Sensibles: <strong>${protocolo.Antibiograma.Sensibles}</strong></p>`};
            if (protocolo.Antibiograma.Resistentes) { texto = texto + `<p>Resistentes: <strong>${protocolo.Antibiograma.Resistentes}</strong></p>`};
            if (protocolo.Antibiograma.Observaciones) { texto = texto + `<p>Observaciones: <strong>${protocolo.Antibiograma.Observaciones}</strong></p>`};

            texto = texto + `</div></div></div>`;                
            
                
            texto = texto + `
            <div class="col-md-4 mt-2">
            <div class="card">
            <div class="card-header bg-dark text-white">
                Serologia
            </div>
            <div class="card-body">`;
        if (protocolo.Serologia.VDRL) { texto = texto + `<p>VDRL: <strong>${protocolo.Serologia.VDRL}</strong></p>`};
        if (protocolo.Serologia.PRUEBA_TREPONEMICA) { texto = texto + `<p>PRUEBA TREPONEMICA: <strong>${protocolo.Serologia.PRUEBA_TREPONEMICA}</strong></p>`};
        if (protocolo.Serologia.Chagas_HAI_y_ELISA) { texto = texto + `<p>Chagas HAI y ELISA: <strong>${protocolo.Serologia.Chagas_HAI_y_ELISA}</strong></p>`};
        if (protocolo.Serologia.Chagas_HAI) { texto = texto + `<p>Chagas HAI: <strong>${protocolo.Serologia.Chagas_HAI}</strong></p>`};
        if (protocolo.Serologia.Chagas_ELISA) { texto = texto + `<p>Chagas ELISA: <strong>${protocolo.Serologia.Chagas_ELISA}</strong></p>`};
        if (protocolo.Serologia.Huddleson) { texto = texto + `<p>Huddleson: <strong>${protocolo.Serologia.Huddleson}</strong></p>`};
        if (protocolo.Serologia.Toxoplasmosis_AD) { texto = texto + `<p>Toxoplasmosis AD: <strong>${protocolo.Serologia.Toxoplasmosis_AD}</strong></p>`};
        if (protocolo.Serologia.HIV_AP) { texto = texto + `<p>HIV AP: <strong>${protocolo.Serologia.HIV_AP}</strong></p>`};
        if (protocolo.Serologia.HBsAg) { texto = texto + `<p>HBsAg: <strong>${protocolo.Serologia.HBsAg}</strong></p>`};
        if (protocolo.Serologia.HCV) { texto = texto + `<p>HCV: <strong>${protocolo.Serologia.HCV}</strong></p>`};
        if (protocolo.Serologia.Toxoplasmosis_IGM) { texto = texto + `<p>Toxoplasmosis IGM: <strong>${protocolo.Serologia.Toxoplasmosis_IGM}</strong></p>`};
        if (protocolo.Serologia.AELO) { texto = texto + `<p>AELO: <strong>${protocolo.Serologia.AELO}</strong></p>`};
        if (protocolo.Serologia.Artritest) { texto = texto + `<p>Artritest: <strong>${protocolo.Serologia.Artritest}</strong></p>`};
        if (protocolo.Serologia.Proteina_C_Reactiva) { texto = texto + `<p>Proteina C Reactiva: <strong>${protocolo.Serologia.Proteina_C_Reactiva}</strong></p>`};

        texto = texto + `</div></div></div>`;                
                
        texto = texto + `
        <div class="col-md-4 mt-2">
        <div class="card">
        <div class="card-header bg-dark text-white">
            Enzimnas
        </div>
        <div class="card-body">`;
    if (protocolo.Enzimas.GOT) { texto = texto + `<p>GOT: <strong>${protocolo.Enzimas.GOT}</strong><span> U/L (VR: H: h' 38  M: h' 32)</span></p>`};
    if (protocolo.Enzimas.GPT) { texto = texto + `<p>GPT: <strong>${protocolo.Enzimas.GPT}</strong><span> U/L (VR: H: h' 41  M: h' 31)</span></p>`};
    if (protocolo.Enzimas.Fosfatasa_Alc) { texto = texto + `<p>Fosfatasa Alc: <strong>${protocolo.Enzimas.Fosfatasa_Alc}</strong><span> U/L (Adul: h' 300 Niñ: h' 645)</span></p>`};
    if (protocolo.Enzimas.GammaGT) { texto = texto + `<p>GammaGT: <strong>${protocolo.Enzimas.GammaGT}</strong><span> U/L (H:h'50  M:h' 32)</span></p>`};
    if (protocolo.Enzimas.Amilasa) { texto = texto + `<p>Amilasa: <strong>${protocolo.Enzimas.Amilasa}</strong><span> U/L (h'125)</span></p>`};

        texto = texto + `</div></div></div>`;                
                    
        texto = texto + `
        <div class="col-md-4 mt-2">
        <div class="card">
        <div class="card-header bg-dark text-white">
            Bilirrubina
        </div>
        <div class="card-body">`;
    if (protocolo.Bilirrubina.Total) { texto = texto + `<p>Total: <strong>${protocolo.Bilirrubina.Total}</strong><span> mg/dl</span></p>`};
    if (protocolo.Bilirrubina.Directa) { texto = texto + `<p>Directa: <strong>${protocolo.Bilirrubina.Directa}</strong><span> mg/dl</span></p>`};
    if (protocolo.Bilirrubina.Indirecta) { texto = texto + `<p>Indirecta: <strong>${protocolo.Bilirrubina.Indirecta}</strong><span> mg/dl</span></p>`};

    texto = texto + `</div></div></div>`;                

                    
        texto = texto + `
        <div class="col-md-4 mt-2">
        <div class="card">
        <div class="card-header bg-dark text-white">
            Coagulacion
        </div>
        <div class="card-body">`;
    if (protocolo.Coagulacion.Protrombina) { texto = texto + `<p>Protrombina: <strong>${protocolo.Coagulacion.Protrombina}</strong><span> Seg.</span></p>`};
    if (protocolo.Coagulacion.Actividad) { texto = texto + `<p>Actividad: <strong>${protocolo.Coagulacion.Actividad}</strong><span> %</span></p>`};
    if (protocolo.Coagulacion.KPTT) { texto = texto + `<p>KPTT: <strong>${protocolo.Coagulacion.KPTT}</strong><span> Seg.</span></p>`};

    texto = texto + `</div></div></div>`;                

                    
        texto = texto + `
        <div class="col-md-4 mt-2">
        <div class="card">
        <div class="card-header bg-dark text-white">
            Prueba Tolerancia oral a la glucosa
        </div>
        <div class="card-body">`;
    if (protocolo.PRUEBA_DE_TOLERANCIA_ORAL_A_LA_GLUCOSA.Glucemia_en_ayunas) { texto = texto + `<p>Glucemia en ayunas: <strong>${protocolo.PRUEBA_DE_TOLERANCIA_ORAL_A_LA_GLUCOSA.Glucemia_en_ayunas}</strong></p>`};
    if (protocolo.PRUEBA_DE_TOLERANCIA_ORAL_A_LA_GLUCOSA.Glucemia_a_los_60_min_post_sobrecarga) { texto = texto + `<p>Glucemia 60 min post sobrecarga: <strong>${protocolo.PRUEBA_DE_TOLERANCIA_ORAL_A_LA_GLUCOSA.Glucemia_a_los_60_min_post_sobrecarga}</strong></p>`};
    if (protocolo.PRUEBA_DE_TOLERANCIA_ORAL_A_LA_GLUCOSA.Glucemia_a_los_120_minutos_post_sobrecarga) { texto = texto + `<p>Glucemia 120 min post sobrecarga: <strong>${protocolo.PRUEBA_DE_TOLERANCIA_ORAL_A_LA_GLUCOSA.Glucemia_a_los_120_minutos_post_sobrecarga}</strong></p>`};

    texto = texto + `</div></div></div>`;                

                    
        texto = texto + `
        <div class="col-md-4 mt-2">
        <div class="card">
        <div class="card-header bg-dark text-white">
            Grupo Sanguineo
        </div>
        <div class="card-body">`;
    if (protocolo.Grupo_Sanguineo) { texto = texto + `<p>Grupo Sanguineo: <strong>${protocolo.Grupo_Sanguineo}</strong></p>`};
    if (protocolo.Factor_RH) { texto = texto + `<p>Factor RH: <strong>${protocolo.Factor_RH}</strong></p>`};

    texto = texto + `</div></div></div>`;                
                    
        texto = texto + `
        <div class="col-md-4 mt-2">
        <div class="card">
        <div class="card-header bg-dark text-white">
            IONOGRAMA
        </div>
        <div class="card-body">`;
    if (protocolo.IONOGRAMA.cNa) { texto = texto + `<p>cNa+: <strong>${protocolo.IONOGRAMA.cNa}</strong><span> mmol/l (VR: 135 - 148 mmol/l)</span></p>`};
    if (protocolo.IONOGRAMA.cK) { texto = texto + `<p>cK+: <strong>${protocolo.IONOGRAMA.cK}</strong><span> mmol/l (VR: 3,7 - 5,3 mmol/l)</span></p>`};
    if (protocolo.IONOGRAMA.cCl) { texto = texto + `<p>cCl-: <strong>${protocolo.IONOGRAMA.cCl}</strong><span> mmol/l (VR: 98 - 109 mmol/l)</span></p>`};
    if (protocolo.IONOGRAMA.cCa) { texto = texto + `<p>cCa++: <strong>${protocolo.IONOGRAMA.cCa}</strong><span> mmol/l (VR: 1,0 - 1,4 mmol/l)</span></p>`};

    texto = texto + `</div></div></div>`;                

                    
        texto = texto + `
        <div class="col-md-4 mt-2">
        <div class="card">
        <div class="card-header bg-dark text-white">
            Otros
        </div>
        <div class="card-body">`;
    if (protocolo.HCG_EN_SANGRE) { texto = texto + `<p>HCG EN SANGRE: <strong>${protocolo.HCG_EN_SANGRE}</strong></p>`};
    if (protocolo.EXUDADO_VAGINAL_ANAL) { texto = texto + `<p>EXUDADO VAGINAL ANAL: <strong>${protocolo.EXUDADO_VAGINAL_ANAL}</strong></p>`};
    if (protocolo.PROTEINURIA_24_hs) { texto = texto + `<p>PROTEINURIA 24hs: <strong>${protocolo.PROTEINURIA_24_hs}</strong><span> mg/24hs (VR: 30-140 mg/24hs)</span></p>`};
    if (protocolo.STROUT) { texto = texto + `<p>STROUT: <strong>${protocolo.STROUT}</strong></p>`};

    texto = texto + `</div></div></div>`;                

    
        texto = texto + `
        <div class="col-md-4 mt-2">
        <div class="card">
        <div class="card-header bg-dark text-white">
            Otros
        </div>
        <div class="card-body">`;
    if (protocolo.TIROIDE_TSH) { texto = texto + `<p>TIROIDE TSH: <strong>${protocolo.TIROIDE_TSH}</strong><span> uUI/ml (VR: 0,27 - 4,2 uUI/ml)</span></p>`};
    if (protocolo.TIROIDE_T4) { texto = texto + `<p>TIROIDE T4: <strong>${protocolo.TIROIDE_T4}</strong><span> ug/dl (VR: 4,6 - 12 ug/dl)</span></p>`};
    if (protocolo.IGA_TGG_celiuaquia) { texto = texto + `<p>IGA TGG celiuaquia: <strong>${protocolo.IGA_TGG_celiuaquia}</strong><span> UI/ml (VR: hasta 10UI/ml)</span></p>`};
    if (protocolo.HbA1c_hemoglobina_glicosilada) { texto = texto + `<p>HbA1c hemoglobina glicosilada: <strong>${protocolo.HbA1c_hemoglobina_glicosilada}</strong><span> % (VR: 4,8 a 6%)</span></p>`};

    texto = texto + `</div></div></div>`;                

                    
        texto = texto + `
        <div class="col-md-4 mt-2">
        <div class="card">
        <div class="card-header bg-dark text-white">
            Otros
        </div>
        <div class="card-body">`;
    if (protocolo.PSA_prostatico) { texto = texto + `<p>PSA prostatico: <strong>${protocolo.PSA_prostatico}</strong><span> ng/ml (VR: menor a 4 ng/ml)</span></p>`};
    if (protocolo.POLIMORFOS_NUCLEARES_EN_MATERIA_FECAL) { texto = texto + `<p>POLIMORFOS NUCLEARES EN MATERIA FECAL: <strong>${protocolo.POLIMORFOS_NUCLEARES_EN_MATERIA_FECAL}</strong></p>`};
    if (protocolo.COPROPARASITOLOGICO_SERIADO) { texto = texto + `<p>COPROPARASITOLOGICO SERIADO: <strong>${protocolo.COPROPARASITOLOGICO_SERIADO}</strong></p>`};
    if (protocolo.ESCOBILLADO_ANAL) { texto = texto + `<p>ESCOBILLADO ANAL: <strong>${protocolo.ESCOBILLADO_ANAL}</strong></p>`};
    if (protocolo.SOMF_sangre_oculta_en_materia_fecal) { texto = texto + `<p>SOMF sangre oculta en materia fecal: <strong>${protocolo.SOMF_sangre_oculta_en_materia_fecal}</strong></p>`};


    texto = texto + `</div></div></div>`;                


    
        texto = texto + `</div></div></div>`;


                divProtocolo.append(texto)
          }
        });
      });

})