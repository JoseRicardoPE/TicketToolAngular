import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { NewDeptObj } from '../interfaces/new-dept-obj';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiURL: string = 'https://freeapi.miniprojectideas.com/api/TicketsNew/';

  constructor(
    private http: HttpClient
  ) { }

  login(obj: Login): Observable<any> {
    return this.http.post<any>(`${this.apiURL}Login`, obj);
  }

  getDepartments() {
    return this.http.get(`${this.apiURL}GetDepartments`);
  }

  createDepartment(obj: NewDeptObj): Observable<any> {
    return this.http.post(`${this.apiURL}CreateDepartment`, obj);
  }

  updateDepartment(obj: any) {
    this.http.put(`${this.apiURL}UpdateDepartment`, obj);
  }

  deleteDepartment(id: number) {
    this.http.delete(`${this.apiURL}DeleteDepartment?id=${id}`, );
  }

}
