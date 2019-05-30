$(function () {

    const URI_PAC = '/pacientes/seek';

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
                  tbody.append(`
                      <tr>
                        <td>${paciente.Fecha}</td>
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
    })


})