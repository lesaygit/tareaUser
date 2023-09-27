import { TareaEstado } from './tarea.enum'
export interface Tarea {
    id: string,
    name: string,
    startDate: Date,
    endDate: Date,
    description?: string,
    state: TareaEstado
}