import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateNewTicket } from '../interfaces/create-new-ticket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewTicketService {

  apiURL: string = 'https://freeapi.miniprojectideas.com/api/TicketsNew/';

  constructor(
    private http: HttpClient
  ) { }

  createTicket(obj: CreateNewTicket): Observable<any> {
    return this.http.post(`${this.apiURL}CreateNewTicket`, obj);
  }

  deleteTicket(id: number) {
    return this.http.delete(`${this.apiURL}DeleteTicket?id=${id}`);
  }

}
