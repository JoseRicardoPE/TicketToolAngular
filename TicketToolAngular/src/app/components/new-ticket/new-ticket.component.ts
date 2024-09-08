import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryObj } from 'src/app/interfaces/categoryObj';
import { CreateNewTicket } from 'src/app/interfaces/create-new-ticket';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent implements OnInit {

  formCreateTicket!: FormGroup;
  parentCategoryList: CategoryObj[] = [];
  severityList: CreateNewTicket[] = [];
  selectSeverity: string = '';
  selectedCategoryName: string = '';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.formCreateTicket = this.fb.group({
      employeeId: [0],
      severityInput: ['', [Validators.required]],
      childCategoryId: [0],
      deptId: [0],
      requestDetails: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  selectSeverityList(severity: CreateNewTicket) {
    this.formCreateTicket.patchValue({ severityInput: severity.severity});
    this.selectSeverity = severity.severity;
  }

  selectCategory(category: CategoryObj) {
    this.formCreateTicket.patchValue({ parentCategoryId: category.categoryId });
    this.selectedCategoryName = category.categoryName;
  }

}
