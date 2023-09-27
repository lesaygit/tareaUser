import { Injectable, inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TareaService } from '../serviceTarea/tarea.service'
import { Observable, of } from 'rxjs';
import { Tarea } from '../model/tarea.interface';

export const tareaResolver: ResolveFn<Tarea> = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot, tareaServive: TareaService = inject(TareaService)) => {
  // return true;
  if (route.params && route.params['id']) {
    return tareaServive.getTarea(route.params['id']);
  }
  return of({ name: '', startDate: '', endDate: '', description: '', state: '' });

};
