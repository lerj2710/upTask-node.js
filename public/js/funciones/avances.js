import Swal from 'sweetalert2';

export const actulizarAvance = () => {
	//selecionar las tareas existente
	const tareas = document.querySelectorAll('li.tarea');

	if (tareas.length) {
		//selecionar tareas completadas
		const tareasCompletadas = document.querySelectorAll('i.completo');

		//calcular el avance
		const avance = Math.round(tareasCompletadas.length / tareas.length * 100);
		// mostrar el avance
		const porcentaje = document.querySelector('#procentaje');
		porcentaje.style.width = avance + '%';
		if (avance === 100) {
			Swal.fire('Completaste el proyecto', 'Felicidades, has terminado', 'success');
		}
	}
};
