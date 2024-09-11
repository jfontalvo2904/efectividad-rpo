import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import User from '../interfaces/User.interface';
import LoginResponse from '../interfaces/LoginResponse.interface';
import { environment } from '../../../environments/environment';
import Role from '../interfaces/Role.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http: HttpClient = inject(HttpClient);

  private readonly apiUrl: string  = `${environment.apiBaseUrl}/api/users`;

  private user: WritableSignal<User | null> = signal(null);

  private roleUser: WritableSignal<Role | null> = signal(null)
  
  constructor() { }

  login(username: string, password : string): Observable<User> {

    let headers : HttpHeaders = new HttpHeaders()
    .set('content-type', 'application/json')

  

    return this.http.post<LoginResponse>(this.apiUrl+'/login', {email:username,password}, {headers}).pipe(
        tap( (data : LoginResponse) => {
          if(data.user && data.token) {
            this.saveTokenInCache(data.token);
            this.user.set(data.user);
            this.getRoleUser(this.user()!.role_id)
          }
        }),
        map( loginResponse => loginResponse.user)
      );

  }

  getRoleUser(roleId: number| null) {
    if(roleId) {
      this.getRoleById(roleId).subscribe({
        next: role => {
          this.roleUser.set(role);
        }
      })
    }
  }

  saveTokenInCache(token:string): void {
    if(token) {
      localStorage.setItem('userToken', token); 
    }
  }

  get userRole(): Role | null {
    return this.roleUser();
  }

  get userValue() {
    return this.user();
  }

  get userToken(): string | null {
    return localStorage.getItem('userToken');
  }

  refreshUser(): Observable< User| null> {
    const token = this.userToken
    
    if(!token) return of(null);

    let headers : HttpHeaders = new HttpHeaders()
    .set('Authorization',`Token ${token}`);

    return this.http.post<{user:User}>(this.apiUrl+'/profile', {}, {headers}).pipe(
      tap( (data : {user: User}) => {
        if(data.user) {
          this.user.set(data.user);
        }
      }),
      map( (data) => data.user )
    );
    
  }

  logOut() {
    this.user.set(null);
    localStorage.removeItem('userToken');

  }

  getRoleById(roleId:number):Observable<Role> {
    return this.http.get<Role>(`${this.apiUrl}/roles/${roleId}/`)
  }

}
