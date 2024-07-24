import { Injectable } from '@angular/core';
import Client from '../../interfaces/Client.interface';
import { Observable, of, throwError } from 'rxjs';

//datos de prueba 
const clients: Client[] = [
  { id: 1, nit: 1234567890, name: "Ecopetrol", email: "info@ecopetrol.com.co", aconomicActivity: "Oil & Gas" },
  { id: 2, nit: 2234567890, name: "Grupo Aval", email: "contacto@grupoaval.com", aconomicActivity: "Financial Services" },
  { id: 3, nit: 3234567890, name: "Bancolombia", email: "soporte@bancolombia.com", aconomicActivity: "Banking" },
  { id: 4, nit: 4234567890, name: "Avianca", email: "info@avianca.com", aconomicActivity: "Airline" },
  { id: 5, nit: 5234567890, name: "Almacenes Éxito", email: "contacto@exito.com", aconomicActivity: "Retail" },
  { id: 6, nit: 6234567890, name: "Cementos Argos", email: "info@argos.com.co", aconomicActivity: "Construction Materials" },
  { id: 7, nit: 7234567890, name: "Nutresa", email: "info@nutresa.com", aconomicActivity: "Food Processing" },
  { id: 8, nit: 8234567890, name: "Bavaria", email: "info@bavaria.com", aconomicActivity: "Beverages" },
  { id: 9, nit: 9234567890, name: "Grupo Sura", email: "info@gruposura.com", aconomicActivity: "Insurance" },
  { id: 10, nit: 1334567890, name: "Terpel", email: "info@terpel.com", aconomicActivity: "Oil & Gas" },
  { id: 11, nit: 1434567890, name: "Claro Colombia", email: "info@claro.com.co", aconomicActivity: "Telecommunications" },
  { id: 12, nit: 1534567890, name: "Tigo", email: "info@tigo.com.co", aconomicActivity: "Telecommunications" },
  { id: 13, nit: 1634567890, name: "Postobón", email: "info@postobon.com", aconomicActivity: "Beverages" },
  { id: 14, nit: 1734567890, name: "Carvajal", email: "info@carvajal.com", aconomicActivity: "Manufacturing" },
  { id: 15, nit: 1834567890, name: "Colombina", email: "info@colombina.com", aconomicActivity: "Food Processing" },
  { id: 16, nit: 1934567890, name: "Colpatria", email: "info@colpatria.com", aconomicActivity: "Banking" },
  { id: 17, nit: 1134567890, name: "Davivienda", email: "info@davivienda.com", aconomicActivity: "Banking" },
  { id: 18, nit: 1235567890, name: "ISA", email: "info@isa.com.co", aconomicActivity: "Energy" },
  { id: 19, nit: 1335567890, name: "Promigas", email: "info@promigas.com", aconomicActivity: "Energy" },
  { id: 20, nit: 1435567890, name: "Cementos Argos", email: "info@argos.com.co", aconomicActivity: "Construction Materials" }
];

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  getAll() : Observable<Client[]> {
    return of(clients)
  }

  getClientById(id : number): Observable<Client> {
    const client: Client | undefined = clients.find( client => client.id === id);
    
    return client ? of(client) : throwError( () =>  new Error('No se ha encontrado el cliente') )
  } 
}
