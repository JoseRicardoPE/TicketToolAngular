import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetTicketsService {

  apiURL: string = 'https://freeapi.miniprojectideas.com/api/TicketsNew/';

  constructor(
    private http: HttpClient
  ) { }

  getAssignedTicketsByEmpId(empId: number) {
    return this.http.get(`${this.apiURL}GetAssignedTicketsByEmpId?empId=${empId}`);
  }

  getTicketsCreatedByEmpId(empId: number) {
    return this.http.get(`${this.apiURL}GetTicketsCreatedByEmpId?empId=${empId}`);
  }

  startTicket(ticketId: number) {
    return this.http.post(`${this.apiURL}startTicket?id=${ticketId}`, {});
  }

  closeTicket(ticketId: number) {
    return this.http.post(`${this.apiURL}closeTicket?id=${ticketId}`, {});
  }

}
