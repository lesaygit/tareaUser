import { Tarea } from './tarea.interface';

export interface tareaPage {
    tareas: Tarea[];
    totalElements: number;
    totalPages?: number;
}
