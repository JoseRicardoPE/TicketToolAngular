import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { DeptObj } from '../interfaces/new-dept-obj';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  apiURL: string = 'https://freeapi.miniprojectideas.com/api/TicketsNew/';

  constructor(
    private http: HttpClient
  ) { }

  login(obj: Login): Observable<any> {
    return this.http.post<any>(`${this.apiURL}Login`, obj);
  }

  getAllDepartments() {
    return this.http.get(`${this.apiURL}GetDepartments`);
  }

  createDepartment(obj: DeptObj): Observable<any> {
    return this.http.post(`${this.apiURL}CreateDepartment`, obj);
  }

  updateDepartment(obj: DeptObj): Observable<any> {
    return this.http.put(`${this.apiURL}UpdateDepartment`, obj);
  }

  deleteDepartment(id: number) {
    return this.http.delete(`${this.apiURL}DeleteDepartment?id=${id}`, );
  }

}
