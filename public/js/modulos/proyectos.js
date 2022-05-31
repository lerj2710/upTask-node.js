import Swal from 'sweetalert2';
import axios, { AxiosError } from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
	btnEliminar.addEventListener('click', (e) => {
		const urlProyecto = e.target.dataset.proyectoUrl;

		// console.log(urlProyecto);
		// return;
		Swal.fire({
			title: 'Deseas borrar este proyecto?',
			text: 'Un proyecto eliminado no se puede recuperar!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, Borrar!',
			cancelButtonText: 'No, Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				//enviar peticion
				const url = `${location.origin}/proyectos/${urlProyecto}`;

				axios.delete(url, { params: { urlProyecto } })
                    .then(function(respuesta) {
					console.log(respuesta);
				});
				return;

				Swal.fire('ELiminado!', 'El proyecto se ha eliminado.', 'success');

				setTimeout(() => {
					window.location.href = '/';
				}, 3000);
			}
		});
	});
}

export default btnEliminar;
