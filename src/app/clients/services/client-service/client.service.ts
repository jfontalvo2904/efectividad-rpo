import { computed, inject, Injectable, signal } from '@angular/core';
import Client from '../../interfaces/Client.interface';
import { Observable, of, throwError, tap, catchError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import CreateClientData from '../../interfaces/CreateClientData.interface';
import UserRoleByClient from '../../interfaces/UserRoleByClient.interface';
import Leader from '../../interfaces/Leader.interface';
import SupportStaff from '../../../vacancy/interfaces/SupportStaffByClientResponse';
import SupportStaffByClientResponse from '../../../vacancy/interfaces/SupportStaffByClientResponse';

//datos de prueba 
const clients: Client[] = [];

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private http : HttpClient = inject(HttpClient);

  apiUrl = `${environment.apiBaseUrl}/api/clients`;

  private clients = signal<Client[]|null>(null);

  constructor() { }

  get clientsValue(): Client[]|null {
    return this.clients();
  }

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl).pipe(
      tap( clients => this.clients.set(clients))
    );
  }

  getAllLeaders():Observable<Leader[]> {
    return this.http.get<Leader[]>(`${this.apiUrl}/leader_list/`);
  }

  getClientById(id : number): Observable<Client> {
    const client: Client | undefined = clients.find( client => client.id === id);
    
    return client ? of(client) : throwError( () =>  new Error('No se ha encontrado el cliente') )
  }
  
  editClient(client : Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${client.id}/`,{...client}).pipe(
      tap(clientResponse => {
        if(this.clients()){
          this.clients.set( this.clients()!.map(client => client.id === clientResponse.id ? clientResponse : client));
        }
        
      })
    );
  }

  deleteClient(clientId : number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${clientId}`).pipe(
      tap( ()=> {
        this.clients.set(this.clients()!.filter(client => client.id !== clientId));
      })
    );
  }

  createClient(client : CreateClientData):Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/`, client)
    .pipe(tap((client)=> {
      this.clients.set([...this.clients()!,client])
    }));
  }

  userRoleByClient(clientId:number, userId:number): Observable<UserRoleByClient> {
    return this.http.post<UserRoleByClient>(`${this.apiUrl}/role/`,{client:clientId,user:userId});
  }

  getAllSupportStaffByClient(clientId:number): Observable<SupportStaffByClientResponse[]> {
    return this.http.get<SupportStaffByClientResponse[]>(`${this.apiUrl}/role_by_client/${clientId}`)
  }
}
