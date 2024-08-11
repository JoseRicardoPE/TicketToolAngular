import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChildCategoryObj } from '../interfaces/child-category-obj';

@Injectable({
  providedIn: 'root'
})
export class ChildcategoryService {

  apiURL: string = 'https://freeapi.miniprojectideas.com/api/TicketsNew/';

  constructor(
    private http: HttpClient
  ) { }

  getAllChildCategory() {
    return this.http.get(`${this.apiURL}GetChildCategory`);
  }

  createChildCategory(obj: ChildCategoryObj): Observable<any> {
    return this.http.post(`${this.apiURL}CreateChildCategory`, obj);
  }

  updateChildCategory(obj: ChildCategoryObj): Observable<any> {
    return this.http.put(`${this.apiURL}UpdateChildCategory`, obj);
  }

  DeleteChildCategory(id: number) {
    return this.http.delete(`${this.apiURL}DeleteChildCategory?id=${id}`, );
  }

}
