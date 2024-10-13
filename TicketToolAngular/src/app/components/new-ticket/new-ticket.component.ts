import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryObj } from 'src/app/interfaces/categoryObj';
import { CreateNewTicket } from 'src/app/interfaces/create-new-ticket';
import { DepartmentService } from 'src/app/services/department.service';
import { DeptObj } from 'src/app/interfaces/new-dept-obj';
import { CategoryService } from 'src/app/services/category.service';
import { ChildcategoryService } from 'src/app/services/childcategory.service';
import { getChildCategoryObj } from 'src/app/interfaces/child-category-obj';
import { NewTicketService } from 'src/app/services/new-ticket.service';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent implements OnInit {

  formCreateTicket!: FormGroup;
  departmentList: DeptObj[] = [];
  parentCategoryList: CategoryObj[] = [];
  severityList: CreateNewTicket[] = [];
  getChildCategoryObj: getChildCategoryObj[] = [];
  filterCategory: any[] = [];
  selectedDepartmentName: string = '';
  selectedCategoryName: string = '';
  selectedChildCategoryName: string = '';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private departmentService: DepartmentService,
    private categoryService: CategoryService,
    private childCategoryService: ChildcategoryService,
    private newTicketService: NewTicketService
  ) {
    this.formCreateTicket = this.fb.group({
      employeeId: [0],
      severity: ['', [Validators.required]],
      childCategoryId: [0],
      deptId: [0],
      requestDetails: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const loggedUserData = localStorage.getItem('ticketUser');
    if (loggedUserData != null) {
      const userData = JSON.parse(loggedUserData);
      this.formCreateTicket.patchValue({
        employeeId: userData.employeeId,
      });
    }

    this.getAllDepartments();
    this.getAllParentCategories();
    this.getAllChildCategories();
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
  
  getAllChildCategories() {
    this.childCategoryService.getAllChildCategory().subscribe((res: any) => {
      // debugger;
      this.getChildCategoryObj = res.data;
      console.log('child Category List from new ticket: ', this.getChildCategoryObj);
    });
  }

  selectDepartment(department: DeptObj) {
    this.formCreateTicket.patchValue({ deptId: department.deptId });
    this.selectedDepartmentName = department.deptName;
    console.log('New Ticket department name: ', this.selectedDepartmentName);
  }

  selectCategory(category: CategoryObj) {
    this.formCreateTicket.patchValue({ childCategoryId: 0 });
    this.selectedCategoryName = category.categoryName;
    
    this.filterCategory = this.getChildCategoryObj.filter(child => child.parentCategoryName === category.categoryName);

    console.log('Child categories filter: ', this.filterCategory);
  }

  selectChildCategory(childCategory: getChildCategoryObj) {
    this.formCreateTicket.patchValue({ childCategoryId: childCategory.childCategoryId });
    this.selectedChildCategoryName = childCategory.categoryName;
    console.log('child category name: ', this.selectedChildCategoryName);
  }

  createTicket() {
    debugger;
    if (this.formCreateTicket.valid) {
      const newTicket: CreateNewTicket = this.formCreateTicket.value;
      console.log(newTicket);
      this.newTicketService.createTicket(newTicket).subscribe((res: any) => {
        debugger;
        if (res.result) {
          this.toastr.success('Ticket created successfully!', 'Created');
          console.log('createTicket res: ', res);
        } else {
          this.toastr.error(res.message, 'Error');
        }
      });
    } else {
      this.toastr.warning('Please complete the form correctly.', 'Warning');
    }
  }

}
