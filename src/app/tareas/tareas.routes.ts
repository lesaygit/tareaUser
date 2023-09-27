import { Route } from '@angular/router';
import { FormTareaComponent } from './containers/form-tarea/form-tarea.component';
import { TareasComponent } from './containers/tareas/tareas.component';
import { tareaResolver } from './resolve/tarea.resolver';
import { estadoTareaGuard } from './guard/estado-tarea.guard';

export default [
    { path: '', component: TareasComponent },
    { path: 'new', component: FormTareaComponent, resolve: { tarea: tareaResolver } },
    {
        path: 'edit/:id',
        component: FormTareaComponent,
        canActivate: [estadoTareaGuard],
        resolve: { tarea: tareaResolver }
    }

] as Route[];