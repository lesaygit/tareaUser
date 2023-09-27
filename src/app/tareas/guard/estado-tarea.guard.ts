import { CanActivateFn } from '@angular/router';
import { Tarea } from '../model/tarea.interface';
import { inject } from '@angular/core';
import { TareaService } from '../serviceTarea/tarea.service';

export const estadoTareaGuard: CanActivateFn = (route) => {
  // return true;
  const tareaServive = inject(TareaService)
  const tarea: Tarea = tareaServive.getTareaById(route.params['id']);

  if (tarea) {
    // Verifica si la tarea está "terminada" o "no completada"
    if (tarea.state === 'TERMINADA' || tarea.state === 'NO_COMPLETADO') {
      alert('sorry not accesible...')
      console.log('No puedes editar una tarea EN ESE ESTADO.');

      return false;
    } else {
      return true; // La tarea no está terminada, permite la edición
    }
  }
  return true;
};
