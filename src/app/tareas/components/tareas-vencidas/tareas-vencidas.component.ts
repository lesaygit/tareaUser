import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TareaService } from '../../serviceTarea/tarea.service';
import { Tarea } from '../../model/tarea.interface';

@Component({
  selector: 'app-tareas-vencidas',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './tareas-vencidas.component.html',
  styleUrls: ['./tareas-vencidas.component.scss']
})
export class TareasVencidasComponent implements OnInit {
  tareas: Tarea[] = [];
  constructor(private tareaService: TareaService) { }

  ngOnInit() {
    this.tareas = this.tareaService.getTareasVencidas();
  }

}
