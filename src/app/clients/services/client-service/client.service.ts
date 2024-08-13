import { computed, inject, Injectable, signal } from '@angular/core';
import Client from '../../interfaces/Client.interface';
import { Observable, of, throwError, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

//datos de prueba 
const clients: Client[] = [];

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private http : HttpClient = inject(HttpClient);

  apiUrl = `${environment.apiBaseUrl}/api/clients`;

  private clients = signal<Client[]|null>(null);
  public clientsValue = computed<Client[] | null>(()=> this.clients());

  constructor() { }

  getAll() : Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl).pipe(
      tap( clients => this.clients.set(clients))
    );
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
}
