import axios from 'axios';
import Swal from 'sweetalert2';
import { actulizarAvance } from '../funciones/avances';

const tareas = document.querySelector('.listado-pendientes');

if (tareas) {
	tareas.addEventListener('click', (e) => {
		if (e.target.classList.contains('fa-check-circle')) {
			const icono = e.target;
			const idTarea = icono.parentElement.parentElement.dataset.tarea;

			const url = `${location.origin}/tareas/${idTarea}`;
			// console.log(url);

			axios.patch(url, { idTarea }).then(function(respuesta) {
				if (respuesta.status === 200) {
					icono.classList.toggle('completo');

					actulizarAvance();
				}
			});
		}

		if (e.target.classList.contains('fa-trash')) {
			console.log(e.target);

			const tareaHTML = e.target.parentElement.parentElement;
			let idTarea = tareaHTML.dataset.tarea;

			Swal.fire({
				title: 'Deseas Borrar Esta Tarea?',
				text: 'Una tarea eliminada no se puede recuperar!',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Si, Borrar!',
				cancelButtonText: 'No, Cancelar'
			}).then((result) => {
				if (result.isConfirmed) {
					const url = `${location.origin}/tareas/${idTarea}`;
					axios.delete(url, { prams: { idTarea } }).then(function(respuesta) {
						// eliminar el node
						tareaHTML.parentElement.removeChild(tareaHTML);

						//mensaje de alerta
						Swal.fire('Tarea Eliminada', respuesta.data, 'success');
						actulizarAvance();
					});
				}
			});
		}
	});
}

export default tareas;
