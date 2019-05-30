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
            },
            error: function (err) {
                console.log(err);
            }
        })
    });

    $('table').on('click', '.update-button', function() {
        let row = $(this).closest('tr');
        let id = row.find('.id').text();
        console.log(id);
      });
      $.ajax({
        url: `${URI_PRO}/${id}`,
        method: 'POST',
        success: function(protocolo) {
            let divProtocolo = $('#repepe');
            //divProtocolo.html('');
            divProtocolo.append(`
                  <p> Este es mi parrafo
                  </p>
              `)
        },
        error: function (err) {
            console.log(err);
        }
  });

})