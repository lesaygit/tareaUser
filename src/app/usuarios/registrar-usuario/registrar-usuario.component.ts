import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss']
})
export default class RegistrarUsuarioComponent {

}
