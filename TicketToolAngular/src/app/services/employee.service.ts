import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiURL: string = 'https://freeapi.miniprojectideas.com/api/TicketsNew/';

  constructor(
    private http: HttpClient
  ) { }

  getEmployees() {
    return this.http.get(`${this.apiURL}GetEmployees`);
  }
  
  getEmployeeRole() {
    return this.http.get(`${this.apiURL}GetAllRoles`);
  }

  createEmployee(obj: Employee): Observable<any> {
    return this.http.post(`${this.apiURL}CreateEmployee`, obj);
  }

  updateEmployee(obj: Employee): Observable<any> {
    return this.http.put(`${this.apiURL}UpdateEmployee`, obj);
  }

  DeleteEmployee(id: number) {
    return this.http.delete(`${this.apiURL}DeleteEmployee?id=${id}`, );
  }

}
