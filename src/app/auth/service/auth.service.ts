import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import User from '../interfaces/User.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http: HttpClient = inject(HttpClient);

  private readonly apiUrl: string  = 'https://dummyjson.com/auth';

  private user: WritableSignal<User | null> = signal(null);

  public userValue: Signal<User | null> = computed( ()=> this.user() );

  constructor() { }

  login(username: string, password : string): boolean {

    let headers : HttpHeaders = new HttpHeaders()
    .set('content-type', 'application/json');

    this.http.post<User>(this.apiUrl+'/login', {username,password}, {headers}).subscribe({
      next : (user : User) => {
        this.user.set(user);
      },
      error(err) {
          alert('Ha ocurrido un error');
      },
    })

    return this.userValue() ? true : false;

  }

  register() {

  }
}
