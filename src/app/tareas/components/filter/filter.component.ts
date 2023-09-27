import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { TareaEstadoFilter } from '../../model/tarea.enum.filter';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Output() state: EventEmitter<string> = new EventEmitter(false);
  @Output() textConten: EventEmitter<string> = new EventEmitter(false);
  @Output() timeProces = new EventEmitter();
  @Output() vencidas = new EventEmitter();

  states = Object.values(TareaEstadoFilter);
  defaulValue: string = TareaEstadoFilter.TODAS;

  onState(state: string) {
    this.state.emit(state);
  }
  onText(event: any) {
    //let text = event.target.value;
    const filterValue = (event.target as HTMLInputElement).value;
    this.textConten.emit(filterValue);
  }


}
