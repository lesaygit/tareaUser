import { Injectable } from '@angular/core';
import { Tarea } from '../model/tarea.interface';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { tareaPage } from '../model/tarea-page.interface';
import { TareaEstadoFilter } from '../model/tarea.enum.filter';
import { TareaEstado } from '../model/tarea.enum';

@Injectable({
  providedIn: 'root'
})

export class TareaService {

  private readonly tareaKey = 'tareas';
  private readonly tareaVencidaKey = 'tareasVencidas';
  private readonly duracionKey = 'duracion';

  tPage = { tareas: [], totalElements: 0, totalPages: 0 };
  private tareaSubjectPage = new BehaviorSubject<tareaPage>(this.tPage);
  public tareaObsvtPage = new Observable<tareaPage>;

  constructor() {
    this.tareaObsvtPage = this.tareaSubjectPage.asObservable();
    this.getTareas();
  }
  getTareas(page = 0, pageSize = 10) {
    let tareas: Tarea[] = JSON.parse(localStorage.getItem(this.tareaKey) || '[]');
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    let newArray = tareas.slice(startIndex, endIndex);
    const pagina = { tareas: newArray, totalElements: tareas.length };
    this.tareaSubjectPage.next(pagina);
  }

  getTareasState(state: string) {
    let tareas: Tarea[] = JSON.parse(localStorage.getItem(this.tareaKey) || '[]');
    if (state == TareaEstadoFilter.TODAS) {
      const pagina = { tareas: tareas, totalElements: tareas.length };
      this.tareaSubjectPage.next(pagina);
      return;
    }
    let arrayToFilter = tareas.filter(tarea => {
      return tarea.state === state;
    });
    const pagina = { tareas: arrayToFilter, totalElements: arrayToFilter.length };
    this.tareaSubjectPage.next(pagina);
  }

  saveTarea(tareaNueva: Tarea): Observable<Tarea> {
    return of(tareaNueva).pipe(
      tap(newTarea => {
        if (this.loadTareaName(newTarea.name)) {
          //alert('Ese nombre de tarea ya existe, prueba otro.');
          throw new Error('Nombre de tarea duplicado');
        }

        // Obtén la lista actual de tareas desde el localStorage
        let tareas = JSON.parse(localStorage.getItem(this.tareaKey) || '[]') as Tarea[];
        const lastId = tareas.length > 0 ? tareas[tareas.length - 1].id : '0';
        const newId = parseInt(lastId) + 1;

        // Agrega el nuevo ID a la tarea y estado CREADO x defecto
        tareaNueva.id = newId.toString();
        newTarea.state = TareaEstado.CREADO;
        // Agrega el nuevo usuario a la lista
        tareas.push(newTarea);
        // Almacena la lista actualizada de tareas en el localStorage
        localStorage.setItem(this.tareaKey, JSON.stringify(tareas));

        const pagina = { tareas: tareas, totalElements: tareas.length };
        this.tareaSubjectPage.next(pagina);
      }),
      catchError(err => { throw new Error("Proceso invalido al salvar, problemas con la API-Tareas.") })
    );
  }

  editTarea(editTarea: Tarea): Observable<Tarea> {
    return of(editTarea).pipe(
      tap(tarea => {
        const tareas = JSON.parse(localStorage.getItem(this.tareaKey) || '[]');
        const tareaIndex = tareas.findIndex((t: Tarea) => t.id === tarea.id);

        if (tareaIndex === -1) {
          throw new Error('La tarea no existe en la lista.');
        }

        tareas[tareaIndex] = tarea;

        // Verifica si la tarea venció su fecha límite
        const fechaLimite = new Date(tarea.endDate);
        const fechaActual = new Date();
        if (fechaLimite < fechaActual) {
          // Marca la tarea como vencida
          let tareasVencidas = JSON.parse(localStorage.getItem(this.tareaVencidaKey) || '[]');
          tareasVencidas.push(tarea);
          localStorage.setItem(this.tareaVencidaKey, JSON.stringify(tareasVencidas));
        }

        //verificando duracion
        if (tarea.state !== TareaEstado.EN_PROCESO) {
          const fechaInicio = new Date(tarea.startDate);
          const fechaActual = new Date();
          const duracionEnMs = fechaActual.getTime() - fechaInicio.getTime();

          // Convierte la duración de milisegundos a minutos
          //const duracionEnMinutos = duracionEnMs / (1000 * 60);

          // Crea un objeto con la tarea y su duración
          const tareaConDuracion = {
            tarea: tarea,
            duracion: duracionEnMs
          };

          // Almacena la tarea y su duración en el arreglo "duracion" en el localStorage
          let duracionTareas = JSON.parse(localStorage.getItem(this.duracionKey) || '[]');
          duracionTareas.push(tareaConDuracion);
          localStorage.setItem(this.duracionKey, JSON.stringify(duracionTareas));
        }






        // Almacena la lista actualizada de tareas en el localStorage
        localStorage.setItem(this.tareaKey, JSON.stringify(tareas));
        const pagina = { tareas: tareas, totalElements: tareas.length };
        this.tareaSubjectPage.next(pagina);
      }),
      catchError(err => { throw new Error("Proceso invalido al editar, problemas con la API-Tareas.") })
    );
  }

  getTarea(id: string) {
    //buscar una tarea x su id y retornamos la creacion de un observable para el resolve
    let tareas = JSON.parse(localStorage.getItem(this.tareaKey) || '[]');
    const tareaEncontrada = tareas.find((tarea: Tarea) => tarea.id == id);
    return of(tareaEncontrada);
  }

  getTareaById(id: string): Tarea {
    //buscar una tarea x su id y retornamos la tarea
    let tareas = JSON.parse(localStorage.getItem(this.tareaKey) || '[]');
    const tareaEncontrada = tareas.find((tarea: Tarea) => tarea.id == id);
    return tareaEncontrada;
  }

  removeTarea(id: string): Observable<boolean> {
    let tareas = JSON.parse(localStorage.getItem(this.tareaKey) || '[]');
    //const tareaDeleted = tareas.find((tarea: Tarea) => tarea.id == id);
    const taskIndex = tareas.findIndex((tarea: Tarea) => tarea.id === id);

    if (taskIndex !== -1) {
      // Si se encuentra la tarea, eliminarla del array
      tareas.splice(taskIndex, 1);

      localStorage.setItem(this.tareaKey, JSON.stringify(tareas));
      const pagina = { tareas: tareas, totalElements: tareas.length };
      this.tareaSubjectPage.next(pagina);

      return of(true);
    } else {
      return of(false);
    }

  }

  private loadTareaName(tituloTarea: string): boolean {
    //buscar una tarea x su nombre
    let tareas = JSON.parse(localStorage.getItem(this.tareaKey) || '[]');
    const tareaEncontrada = tareas.find((tarea: Tarea) => tarea.name === tituloTarea);
    return tareaEncontrada !== undefined;
  }

  getTareasVencidas(): Tarea[] {
    const tareasVencidas = JSON.parse(localStorage.getItem(this.tareaVencidaKey) || '[]');
    return tareasVencidas as Tarea[];
  }

  getTareaTextConten(filterValue: string) {
    let tareas = JSON.parse(localStorage.getItem(this.tareaKey) || '[]');
    const tareasFiltradas = tareas.filter((tarea: Tarea) => {
      return tarea.name.includes(filterValue);
    })

    const pagina = { tareas: tareasFiltradas, totalElements: tareas.length };
    this.tareaSubjectPage.next(pagina);

  }

}
