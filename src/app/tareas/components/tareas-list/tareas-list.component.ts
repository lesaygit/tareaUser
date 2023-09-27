import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Tarea } from '../../model/tarea.interface';
import { MatSelectModule } from '@angular/material/select';
import { TareaEstado } from '../../model/tarea.enum';
import { MatBadgeModule } from '@angular/material/badge';
import { EstadoColorPipe } from 'src/app/shared/pipes/estado-color.pipe';

@Component({
  selector: 'app-tareas-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatSelectModule, MatBadgeModule, EstadoColorPipe],
  templateUrl: './tareas-list.component.html',
  styleUrls: ['./tareas-list.component.scss']
})
export class TareasListComponent {
  estadoTareas = Object.values(TareaEstado);

  @Input() tareas: Tarea[] = [];
  @Output() details: EventEmitter<Tarea> = new EventEmitter(false);
  @Output() edit: EventEmitter<Tarea> = new EventEmitter(false);
  @Output() remove: EventEmitter<Tarea> = new EventEmitter(false);
  @Output() add: EventEmitter<boolean> = new EventEmitter(false);
  @Output() view: EventEmitter<Tarea> = new EventEmitter(false);

  readonly displayedColumns = ['name', 'startDate', 'endDate', 'state', 'actions'];

  onDetails(record: Tarea) {
    this.details.emit(record);
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(record: Tarea) {
    this.edit.emit(record);
  }

  onRemove(record: Tarea) {
    this.remove.emit(record);
  }

  onView(record: Tarea) {
    this.view.emit(record);
  }

}
