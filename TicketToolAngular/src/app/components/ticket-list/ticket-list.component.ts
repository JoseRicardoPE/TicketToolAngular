import { Component, OnInit } from '@angular/core';
import { TicketList } from '../../interfaces/ticket-list';
import { GetTicketsService } from 'src/app/services/get-tickets.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  mode: string = 'My Tickets';
  ticketList: any[] = [];
  loggedUserEmployeeId: any;

  constructor(
    private getTicketsService: GetTicketsService,
  ) { }

  ngOnInit(): void {
    const loggedUserData = localStorage.getItem('ticketUser');
    if (loggedUserData !== null) {
      const userData = JSON.parse(loggedUserData);
      this.loggedUserEmployeeId = userData.employeeId;
    }

    this.changeMode(this.mode);
  }

  changeMode(param: string) {
    this.mode = param;
    if (this.mode === 'My Tickets') {
      this.getTicketsService.getTicketsCreatedByEmpId(this.loggedUserEmployeeId).subscribe((res: any) => {
        this.ticketList = res.data;
      });
    } else {
      this.getTicketsService.getAssignedTicketsByEmpId(this.loggedUserEmployeeId).subscribe((res: any) => {
        this.ticketList = res.data;
      });

    }
  }

  changeStatus(status: string, ticketId: number) {
    if (status === 'Start') {
      this.getTicketsService.startTicket(ticketId).subscribe((res: any) => {
        if (res.result) {
          alert('Ticket status changed');
          this.changeMode(this.mode);
        } else {
          alert(res.message);
        }
      });
    } else {
      this.getTicketsService.closeTicket(ticketId).subscribe((res: any) => {
        if (res.result) {
          alert('Ticket closed');
          this.changeMode(this.mode);
        } else {
          alert(res.message);
        }
      });
      
    }
  }  

}
