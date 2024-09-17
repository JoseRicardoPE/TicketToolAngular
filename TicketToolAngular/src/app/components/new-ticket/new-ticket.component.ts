import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryObj } from 'src/app/interfaces/categoryObj';
import { CreateNewTicket } from 'src/app/interfaces/create-new-ticket';
import { DepartmentService } from 'src/app/services/department.service';
import { DeptObj } from 'src/app/interfaces/new-dept-obj';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent implements OnInit {

  formCreateTicket!: FormGroup;
  parentCategoryList: CategoryObj[] = [];
  severityList: CreateNewTicket[] = [];
  selectedDepartmentName: string = '';
  selectedCategoryName: string = '';
  departmentList: DeptObj[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private departmentService: DepartmentService,
    private categoryService: CategoryService,
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
    this.getAllDepartments();
    this.getAllParentCategories();
  }

  getAllDepartments() {
    this.departmentService.getAllDepartments().subscribe((res: any) => {
      this.departmentList = res.data;
      console.log('Department List from new ticket: ', this.departmentList);
    });
  }

  getAllParentCategories() {
    this.categoryService.getAllParentCategory().subscribe((res: any) => {
      this.parentCategoryList = res.data;
      console.log('Parent Category List from new ticket: ', this.parentCategoryList);
    });
  }

  selectDepartment(department: DeptObj) {
    this.formCreateTicket.patchValue({ deptId: department.deptId });
    this.selectedDepartmentName = department.deptName;
    console.log('New Ticket department name: ', this.selectedDepartmentName);
  }

  selectCategory(category: CategoryObj) {
    this.formCreateTicket.patchValue({ childCategoryId: category.categoryId });
    this.selectedCategoryName = category.categoryName;
    console.log('New Ticket category name: ', this.selectedCategoryName);
  }

}
