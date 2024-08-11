
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryObj } from '../interfaces/categoryObj';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiURL: string = 'https://freeapi.miniprojectideas.com/api/TicketsNew/';

  constructor(
    private http: HttpClient
  ) { }

  getAllParentCategory() {
    return this.http.get(`${this.apiURL}GetParentCategory`);
  }

  createParentCategory(obj: CategoryObj): Observable<any> {
    return this.http.post(`${this.apiURL}CreateParentCategory`, obj);
  }

  updateParentCategory(obj: CategoryObj): Observable<any> {
    return this.http.put(`${this.apiURL}UpdateParentCategory`, obj);
  }

  DeleteParentCategory(id: number) {
    return this.http.delete(`${this.apiURL}DeleteParentCategory?id=${id}`, );
  }

}
