import { inject, Injectable } from '@angular/core';
import Vacancy from '../../interfaces/Vacancy.interface';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import Sector from '../../interfaces/Sector.interface';
import VacancyType from '../../interfaces/VacancyType.interface';
import CreateVacancy from '../../interfaces/CreateVacancy.interface';
import VacancyStatus from '../../interfaces/VacancyStatus.interface';
import DeadLineResponse from '../../interfaces/DeadLineResponse.interface';
import SupportStaff from '../../interfaces/SupportStaffByClientResponse';
import AddSupportStaffRequest from '../../interfaces/AddSupportStaffRequest.interface';
import SupportStaffByVacancyResponse from '../../interfaces/SupportStaffByVacancyResponse.interface';



@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  private http: HttpClient = inject(HttpClient);

  apiUrl = environment.apiBaseUrl + '/api/vacancies';

  constructor() {
    
   }

  create(newVacancy:CreateVacancy):Observable<Vacancy> {
  return this.http.post<Vacancy>(`${this.apiUrl}/`,newVacancy);
  }

  getAll(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(this.apiUrl);
  }

  getAllVacancyTypes(): Observable<VacancyType[]> {
    return this.http.get<VacancyType[]>(`${this.apiUrl}/types/`);
  }

  getAllVacancyStatus():Observable<VacancyStatus[]> {
    return this.http.get<VacancyStatus[]>(`${this.apiUrl}/status/`);
  }


  getVacanciesPerClient(clientId: number) : Observable<Vacancy[]> {
    
    return of([]);
  }

  getDeadLineByVacancy(clientId:number,assignmentDate:string):Observable<DeadLineResponse>{
    return this.http.post<DeadLineResponse>(`${this.apiUrl}/deadline/`,{client:clientId,assignment_date:assignmentDate});
  }

  getVacanyById(vacancyId:number):Observable<Vacancy>{
    return this.http.get<Vacancy>(`${this.apiUrl}/${vacancyId}`)
  }

  getAllSectors(): Observable<Sector[]> {
    return this.http.get<Sector[]>(this.apiUrl + '/sector');
  }

  allSupportStaffByVacancy(idUniqueVacancy:string):Observable<SupportStaffByVacancyResponse[]> {
    return this.http.post<SupportStaffByVacancyResponse[]>(`${this.apiUrl}/support_staff_by_vacancy/`,{idunique_vacancy:idUniqueVacancy});
  }

  addSupportStaff(data : AddSupportStaffRequest):Observable<SupportStaffByVacancyResponse> {
    return this.http.post<SupportStaffByVacancyResponse>(`${this.apiUrl}/support_staff/`,data);
  }
}
