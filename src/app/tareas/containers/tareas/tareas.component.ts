import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { tareaPage } from '../../model/tarea-page.interface';
import { Observable } from 'rxjs';
import { TareasListComponent } from '../../components/tareas-list/tareas-list.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TareaService } from '../../serviceTarea/tarea.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarea } from '../../model/tarea.interface';
import { TareaEstado } from '../../model/tarea.enum';
import { FilterComponent } from '../../components/filter/filter.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TareasVencidasComponent } from '../../components/tareas-vencidas/tareas-vencidas.component';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatToolbarModule, TareasListComponent, NgIf, MatPaginatorModule, FilterComponent, MatDialogModule, MatSnackBarModule],
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {

  tareas$: Observable<tareaPage> | null = null;
  pageIndex = 0;
  pageSize = 10;
  private readonly duracionKey = 'duracion';

  constructor(
    public dialog: MatDialog,
    private tareaService: TareaService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() { this.tareas$ = this.tareaService.tareaObsvtPage; }

  refresh(event: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }) {
    this.tareaService.getTareas(event.pageIndex, event.pageSize);
  }

  state(state: string) {
    this.tareaService.getTareasState(state);
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  onEdit(tarea: Tarea) {
    this.router.navigate(['edit', tarea.id], { relativeTo: this.route });
  }

  onTimeProces() {
    const duracionTareas = JSON.parse(localStorage.getItem(this.duracionKey) || '[]');

    if (duracionTareas.length > 0) {
      duracionTareas.sort((a: any, b: any) => b.duracion - a.duracion);
      const tareaMasLarga = duracionTareas[0].tarea;
      this.snackBar.open('Tarea con mas tiempo en proceso:' + tareaMasLarga.name, 'X');
    } else {
      console.log('No hay tareas en el arreglo de duración.');
    }

  }

  onRemove(tarea: Tarea) {
    if (tarea.state == TareaEstado.TERMINADA || tarea.state == TareaEstado.NO_COMPLETADO) {
      //alert('No es posible en dicho estado');
      this.snackBar.open('No es posible en dicho estado!', 'X', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      //return;
    } else {
      //alert('eliminando')
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: 'Seguro quiere eliminar esta tarea?'
      });
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.tareaService.removeTarea(tarea.id).subscribe({
            next: () => {
              //this.refresh();
              this.snackBar.open('Tarea eliminada!', 'X', {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
            }
            //error
          });
        }
      });


    }
  }

  tareasVencidas() {
    this.dialog.open(TareasVencidasComponent);
  }

  applyFilter(text: string) {
    this.tareaService.getTareaTextConten(text);
  }















  //filtro x tareas segun su  estado
  filterState(state: string) {
    // this.tareaService.tareasEstados(state);
  }
  //filtro x tareas que contengan este texto en el titulo de la tarea
  filterName(textConten: string) {
    //this.tareaService.tareasEstados(state);
  }
  //filtro x tareas con mas tiempo en proceso
  filterTimeProces() {

  }

  //filtro x tareas que vencieron fecha limite de realizacion
  filterDataLimit() { }

  onError() { }





  onView() { }



}
