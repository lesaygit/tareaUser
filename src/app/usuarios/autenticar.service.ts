import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AutenticarService {
  url = 'http://localhost:3000/users';//ver error de tipado en estavariable en esta claseService????
  private readonly usersKey = 'users';

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  addUser(user: any) {
    // Obtén la lista actual de usuarios desde el localStorage
    let users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');

    // Agrega el nuevo usuario a la lista
    users.push(user);

    // Almacena la lista actualizada de usuarios en el localStorage
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }
  getUsers() {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }


}
