console.log("Entro al main.js");

const base_url_api = "http://ucamp.alumnos.dev4humans.com.mx/Main/endpoint_animales_zoo";
const tblAnimales = document.getElementById("tblAnimales");
const grafica = document.getElementById('myChart').getContext('2d');

const loaderContainer = document.getElementById("loaderContainer");
const rowContainer = document.getElementById("rowContainer");


function cargarAnimales() {
    //Es una promesa
    fetch(base_url_api + "/Main/animales",
        {
            method: "GET"
        }
    )
        .then(response => response.json())
        .then(result => {
            console.log(result);
            tblUsuarios.innerHTML = "";
            //hacer un ciclo para que pinte en la tabla, es mas comodo hacer un for of
            const labels_for_chart = result.data.map(item => item.nombre);
            const data_for_chart = result.data.map(item => item.cantidad);
            const myChart = new Chart(grafica, {

                type: 'line',

                data: {

                    labels: labels_for_chart,

                    datasets: [
                        {
                            label: 'Animales del zoo',
                            data: data_for_chart,
                            fill: true,
                            backgroundColor: '#ccd9ff',
                            borderColor: '#3366ff'
                        },
                    ]
                },

                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            for (const usuario of result.data) {
                let tr = `<tr>
        <td>${usuario.id}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.cantidad}</td>
        </tr>`;
                tblUsuarios.innerHTML += tr;
            }
            if (result.data.length == 0) {
                tblUsuarios.innerHTML = `<tr><td colspan = "5" class= "text-center">No Hay usuarios</td></tr>`
            }

        loaderContainer.classList.add("d-none");
        rowContainer.classList.remove("d-none");

        })
        .catch((error) => {
            console.log("Error detectado");
        });


}


function agregarUsuario() {
    console.log("entro a agregar user");
    let form_data = new FormData();
    form_data.append("nombre", document.getElementById("nombre").value);
    form_data.append("cantidad", document.getElementById("cantidad").value);


    fetch(base_url_api + "/Main/animales",
        {
            method: "POST",
            body: form_data
        }
    )
        .then(response => response.json())
        .then(result => {
            console.log(result);
            limpiarFormulario();
            cargarAnimales();
        })
        .catch((error) => {
            console.log("Error detectado");
        })


}


function limpiarFormulario() {
    //Limpiar el formulario
    document.getElementById("nombre").value = "";
    document.getElementById("cantidad").value = "";
}

cargarAnimales();