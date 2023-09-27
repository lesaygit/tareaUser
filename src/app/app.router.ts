import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'tareas',
        loadChildren: () => import('./tareas/tareas.routes')
        // loadComponent: () => import('./tareas/listar-tareas/listar-tareas.component')
    },
    {
        path: 'registrar',
        loadComponent: () => import('./usuarios/registrar-usuario/registrar-usuario.component')
    },
    {
        path: 'autenticar',
        loadComponent: () => import('./usuarios/autenticar-usuario/autenticar-usuario.component')
    }];