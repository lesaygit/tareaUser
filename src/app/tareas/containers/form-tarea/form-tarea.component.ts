import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TareaEstado } from '../../model/tarea.enum';
import { MatDatepickerModule, matDatepickerAnimations } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TareaService } from '../../serviceTarea/tarea.service';
import { Tarea } from '../../model/tarea.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-form-tarea',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule,
    MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, RouterLink],
  templateUrl: './form-tarea.component.html',
  styleUrls: ['./form-tarea.component.scss']
})
export class FormTareaComponent implements OnInit {
  public formTarea!: FormGroup;
  estadoTareas = Object.values(TareaEstado);

  tareaEdit!: Tarea;

  constructor(private fb: FormBuilder, private tareaService: TareaService, private route: ActivatedRoute, private _snackBar: MatSnackBar, private location: Location) { }

  ngOnInit(): void {
    const tarea = this.route.snapshot.data['tarea'];
    this.tareaEdit = tarea;
    console.log(tarea);
    this.formTarea = this.fb.group({
      id: [tarea.id],
      name: [tarea.name, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      startDate: [tarea.startDate, [Validators.required]],
      endDate: [tarea.endDate, [Validators.required]],
      description: [tarea.description, [Validators.maxLength(250)]],
      state: [tarea.state]
    });
  }

  saveTarea() {
    if (this.tareaEdit.id) {
      //edit
      this.tareaService.editTarea(this.formTarea.value).subscribe({
        next: dat => this._snackBar.open('Task updated successfully.', '', { duration: 2000 }),
        error: err => this._snackBar.open(err, "", { duration: 2000 }),
        complete: () => { this.location.back(); }
      });

    } else {
      //create
      this.tareaService.saveTarea(this.formTarea.value as Tarea).pipe(
      ).subscribe({
        next: dat => this._snackBar.open(dat.name, "se a añadido...", { duration: 2000 }),
        error: err => this._snackBar.open(err, "", { duration: 2000 }),
        complete: () => this.formTarea.reset({ name: '', startDate: '', endDate: '', description: '' })
      });
    }
  }

  onCancel() {
    this.location.back();
  }

}
