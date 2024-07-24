import { Injectable } from '@angular/core';
import {VacancyState } from '../../interfaces/Vacancy.interface';
import Vacancy from '../../interfaces/Vacancy.interface';
import { Observable, of } from 'rxjs';


const vacancies: Vacancy[] = [
  { id: 1, clientId: 1, name: "Developer", availablePositions: 3, state: VacancyState.Abierta, observations: "Urgent requirement", dateAssignment: "2024-07-01" },
  { id: 2, clientId: 2, name: "Project Manager", availablePositions: 1, state: VacancyState.Abierta, observations: "Experience needed", dateAssignment: "2024-07-02" },
  { id: 3, clientId: 3, name: "QA Engineer", availablePositions: 2, state: VacancyState.Cubierta, observations: "Position filled", dateAssignment: "2024-07-03" },
  { id: 4, clientId: 4, name: "UI/UX Designer", availablePositions: 1, state: VacancyState.Cancelada, observations: "Project canceled", dateAssignment: "2024-07-04" },
  { id: 5, clientId: 5, name: "Data Analyst", availablePositions: 4, state: VacancyState.Abierta, observations: "Remote work", dateAssignment: "2024-07-05" },
  { id: 6, clientId: 6, name: "Systems Administrator", availablePositions: 1, state: VacancyState.Abierta, observations: "Immediate joining", dateAssignment: "2024-07-06" },
  { id: 7, clientId: 7, name: "DevOps Engineer", availablePositions: 2, state: VacancyState.Cubierta, observations: "Hired", dateAssignment: "2024-07-07" },
  { id: 8, clientId: 8, name: "Business Analyst", availablePositions: 1, state: VacancyState.Abierta, observations: "On-site only", dateAssignment: "2024-07-08" },
  { id: 9, clientId: 9, name: "Technical Support", availablePositions: 5, state: VacancyState.Cancelada, observations: "Budget issues", dateAssignment: "2024-07-09" },
  { id: 10, clientId: 10, name: "Network Engineer", availablePositions: 1, state: VacancyState.Abierta, observations: "Experience with Cisco required", dateAssignment: "2024-07-10" },
  { id: 11, clientId: 11, name: "Software Architect", availablePositions: 2, state: VacancyState.Abierta, observations: "Long-term project", dateAssignment: "2024-07-11" },
  { id: 12, clientId: 12, name: "Mobile Developer", availablePositions: 3, state: VacancyState.Abierta, observations: "iOS and Android", dateAssignment: "2024-07-12" },
  { id: 13, clientId: 13, name: "Full Stack Developer", availablePositions: 2, state: VacancyState.Abierta, observations: "React and Node.js", dateAssignment: "2024-07-13" },
  { id: 14, clientId: 14, name: "Database Administrator", availablePositions: 1, state: VacancyState.Abierta, observations: "MySQL experience", dateAssignment: "2024-07-14" },
  { id: 15, clientId: 15, name: "Security Analyst", availablePositions: 2, state: VacancyState.Abierta, observations: "Certified Ethical Hacker", dateAssignment: "2024-07-15" },
  { id: 16, clientId: 16, name: "HR Specialist", availablePositions: 1, state: VacancyState.Cubierta, observations: "Position filled", dateAssignment: "2024-07-16" },
  { id: 17, clientId: 17, name: "Marketing Coordinator", availablePositions: 1, state: VacancyState.Abierta, observations: "Digital marketing", dateAssignment: "2024-07-17" },
  { id: 18, clientId: 18, name: "Sales Manager", availablePositions: 1, state: VacancyState.Cancelada, observations: "Role redefined", dateAssignment: "2024-07-18" },
  { id: 19, clientId: 19, name: "Content Writer", availablePositions: 2, state: VacancyState.Abierta, observations: "SEO knowledge required", dateAssignment: "2024-07-19" },
  { id: 20, clientId: 20, name: "Customer Support", availablePositions: 5, state: VacancyState.Abierta, observations: "Multilingual preferred", dateAssignment: "2024-07-20" },
  { id: 21, clientId: 1, name: "Product Manager", availablePositions: 2, state: VacancyState.Abierta, observations: "Agile experience", dateAssignment: "2024-07-21" },
  { id: 22, clientId: 2, name: "Financial Analyst", availablePositions: 1, state: VacancyState.Abierta, observations: "CPA preferred", dateAssignment: "2024-07-22" },
  { id: 23, clientId: 3, name: "Graphic Designer", availablePositions: 2, state: VacancyState.Abierta, observations: "Adobe Suite", dateAssignment: "2024-07-23" },
  { id: 24, clientId: 4, name: "Operations Manager", availablePositions: 1, state: VacancyState.Abierta, observations: "5+ years experience", dateAssignment: "2024-07-24" },
  { id: 25, clientId: 5, name: "Recruiter", availablePositions: 1, state: VacancyState.Cubierta, observations: "Position filled", dateAssignment: "2024-07-25" },
  { id: 26, clientId: 6, name: "Data Scientist", availablePositions: 3, state: VacancyState.Abierta, observations: "Python and R", dateAssignment: "2024-07-26" },
  { id: 27, clientId: 7, name: "Network Administrator", availablePositions: 2, state: VacancyState.Abierta, observations: "Cisco certification", dateAssignment: "2024-07-27" },
  { id: 28, clientId: 8, name: "Cloud Engineer", availablePositions: 1, state: VacancyState.Abierta, observations: "AWS and Azure", dateAssignment: "2024-07-28" },
  { id: 29, clientId: 9, name: "Frontend Developer", availablePositions: 3, state: VacancyState.Abierta, observations: "React and Vue.js", dateAssignment: "2024-07-29" },
  { id: 30, clientId: 10, name: "Backend Developer", availablePositions: 2, state: VacancyState.Abierta, observations: "Node.js and Python", dateAssignment: "2024-07-30" },
  { id: 31, clientId: 11, name: "Technical Writer", availablePositions: 1, state: VacancyState.Cancelada, observations: "Project postponed", dateAssignment: "2024-07-31" },
  { id: 32, clientId: 12, name: "Scrum Master", availablePositions: 1, state: VacancyState.Abierta, observations: "Certified Scrum Master", dateAssignment: "2024-08-01" },
  { id: 33, clientId: 13, name: "UI Designer", availablePositions: 2, state: VacancyState.Abierta, observations: "Figma experience", dateAssignment: "2024-08-02" },
  { id: 34, clientId: 14, name: "UX Researcher", availablePositions: 1, state: VacancyState.Abierta, observations: "User testing", dateAssignment: "2024-08-03" },
  { id: 35, clientId: 15, name: "SEO Specialist", availablePositions: 1, state: VacancyState.Abierta, observations: "Google Analytics", dateAssignment: "2024-08-04" },
  { id: 36, clientId: 16, name: "IT Support", availablePositions: 3, state: VacancyState.Abierta, observations: "Hardware and software", dateAssignment: "2024-08-05" },
  { id: 37, clientId: 17, name: "Marketing Manager", availablePositions: 1, state: VacancyState.Cubierta, observations: "Position filled", dateAssignment: "2024-08-06" },
  { id: 38, clientId: 18, name: "Logistics Coordinator", availablePositions: 1, state: VacancyState.Abierta, observations: "Supply chain experience", dateAssignment: "2024-08-07" },
  { id: 39, clientId: 19, name: "Event Planner", availablePositions: 1, state: VacancyState.Cancelada, observations: "Event canceled", dateAssignment: "2024-08-08" },
  { id: 40, clientId: 20, name: "Public Relations", availablePositions: 1, state: VacancyState.Abierta, observations: "Media relations", dateAssignment: "2024-08-09" },
  { id: 41, clientId: 1, name: "Business Consultant", availablePositions: 1, state: VacancyState.Abierta, observations: "MBA preferred", dateAssignment: "2024-08-10" },
  { id: 42, clientId: 2, name: "E-commerce Manager", availablePositions: 1, state: VacancyState.Abierta, observations: "Online sales", dateAssignment: "2024-08-11" },
  { id: 43, clientId: 3, name: "Social Media Manager", availablePositions: 1, state: VacancyState.Abierta, observations: "Social media campaigns", dateAssignment: "2024-08-12" },
  { id: 44, clientId: 4, name: "Biomedical Engineer", availablePositions: 1, state: VacancyState.Abierta, observations: "Medical devices", dateAssignment: "2024-08-13" },
  { id: 45, clientId: 5, name: "Research Scientist", availablePositions: 2, state: VacancyState.Abierta, observations: "Lab work", dateAssignment: "2024-08-14" },
  { id: 46, clientId: 6, name: "Cybersecurity Specialist", availablePositions: 1, state: VacancyState.Abierta, observations: "Threat analysis", dateAssignment: "2024-08-15" },
  { id: 47, clientId: 7, name: "Chemist", availablePositions: 1, state: VacancyState.Cubierta, observations: "Position filled", dateAssignment: "2024-08-16" },
  { id: 48, clientId: 8, name: "Mechanical Engineer", availablePositions: 2, state: VacancyState.Abierta, observations: "CAD software", dateAssignment: "2024-08-17" },
  { id: 49, clientId: 9, name: "Electrical Engineer", availablePositions: 1, state: VacancyState.Abierta, observations: "Circuit design", dateAssignment: "2024-08-18" },
];

@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  constructor() { }

  getAll(): Observable<Vacancy[]> {
    return of(vacancies);
  }

  getVacanciesPerClient(clientId: number) : Observable<Vacancy[]> {
    let vacanciesPerClient: Vacancy[] = vacancies.filter( vacancy => vacancy.clientId === clientId);
    return of(vacanciesPerClient);
  }
}
