import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';
import { DepartmentService } from 'src/app/services/department.service';
import { Employee, GetEmployee } from 'src/app/interfaces/employee';
import { DeptObj } from 'src/app/interfaces/new-dept-obj';
import { CategoryObj } from 'src/app/interfaces/categoryObj';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeForm!: FormGroup;
  isResetting: boolean = false;
  departmentList: DeptObj[] = [];
  employeeList: GetEmployee[] = [];
  roleList: string[] = [];
  parentCategoryList: CategoryObj[] = [];
  isNewEmployee!: boolean;
  selectedDepartmentName: string = '';
  selectedRoleName: string = '';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
  ) {
    this.employeeForm = this.fb.group({
      employeeId: [0],
      employeeName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      password: ['', [Validators.required]],
      contactNo: ['', [Validators.required]],
      emailId: ['', [Validators.required]],
      deptId: [0],
      role: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllDepartments();
    this.getAllEmployees();
    this.getEmployeeRoles();
  }

  getAllDepartments() {
    this.departmentService.getAllDepartments().subscribe((res: any) => {
      this.departmentList = res.data;
      console.log('Department List', this.departmentList);
    });
  }

  getAllEmployees() {
    this.employeeService.getEmployees().subscribe((res: any) => {
      this.employeeList = res.data;
      console.log('Employee List', this.employeeList);
    });

  }

  getEmployeeRoles() {
    this.employeeService.getEmployeeRole().subscribe((res: any) => {
      this.roleList = res.data;
      console.log('Employee Role List', this.roleList);
    });
  }

  selectCategory(department: DeptObj) {
    // debugger;
    this.employeeForm.patchValue({ deptId: department.deptId });
    this.selectedDepartmentName = department.deptName;
  }

  selectRole(role: string) {
    // debugger;
    console.log('selected role', role);
    this.employeeForm.patchValue({ role: role});
    this.selectedRoleName = role;
    console.log('Role', this.selectedRoleName);
  }

  saveEmployee() {
    if (this.isResetting) return; //? exit if the form is being reset
    debugger;
    if (this.employeeForm.valid) {
      const newEmployee: Employee = this.employeeForm.value;
      console.log(newEmployee, 'newEmployee');
      this.employeeService.createEmployee(newEmployee).subscribe((res: any) => {
        // debugger;
        if (res.result) {
          this.toastr.success('Employee created successfully!', 'Created');
          this.getAllEmployees(); //? To call and refresh table departments
        } else {
          this.toastr.error(res.message, 'Error');
        }
      });
    } else {
      this.toastr.warning('Please complete the form correctly.', 'Warning');
    }  
  }

  resetForm() {
    // debugger;
    this.isResetting = true;  //? indicate that the form is being reset.
    this.employeeForm.reset({
      employeeId: 0,
      employeeName: '',
      contactNo: '',
      emailId: '',
      deptId: 0,
      password: '',
      gender: '',
      role: ''
    });

    //? to ensure that isResetting returns false after the reset is complete
    setTimeout(() => {
      this.isResetting = false;
    }, 0);
  }
}
