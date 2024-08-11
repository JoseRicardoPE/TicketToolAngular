import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/services/department.service';
import { DeptObj } from '../../interfaces/new-dept-obj';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  newDeptForm!: FormGroup;
  departmentList: DeptObj[] = [];
  isResetting: boolean = false;

  constructor(
    private DepartmentService: DepartmentService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) { 
    this.newDeptForm = this.fb.group({
      deptId: [0],
      deptName: ['', [Validators.required]],
      createdDate: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllDepartments();
  }

  resetForm() {
    debugger;
    this.isResetting = true;  //? indicate that the form is being reset.
    this.newDeptForm.reset({
      deptId: 0,
      deptName: '',
      createdDate: '',
    });

    //? to ensure that isResetting returns false after the reset is complete
    setTimeout(() => {
      this.isResetting = false;
    }, 0);
  }

  getAllDepartments() {
    this.DepartmentService.getAllDepartments().subscribe((res: any) => {
      // debugger;
      this.departmentList = res.data;
      console.log(this.departmentList);
    })
  }

  saveDepartment() {
    if (this.isResetting) return; //? exit if the form is being reset

    if (this.newDeptForm.valid) {
      // debugger;
      const newDept: DeptObj = this.newDeptForm.value;
      this.DepartmentService.createDepartment(newDept).subscribe((res: any) => {
        // debugger;
        if (res.result) {
          this.toastr.success('Dept created successfully!', 'Created');
          this.getAllDepartments(); //? To call and refresh table departments
        } else {
          this.toastr.error(res.message, 'Error');
        }
      });
    } else {
      this.toastr.warning('Please complete the form correctly.', 'Warning');
    }
  }

  onEdit(data: DeptObj) {
    console.log('Data onEdit', data);
    const formatedDate = new Date(data.createdDate).toISOString().split('T')[0]; //
    this.newDeptForm.patchValue({
      deptId: data.deptId,
      deptName: data.deptName,
      createdDate: formatedDate,
    });
  }

  updateDepartment() {
    if (this.newDeptForm.valid) {
      // debugger;
      const newDept: DeptObj = this.newDeptForm.value;
      this.DepartmentService.updateDepartment(newDept).subscribe((res: any) => {
        // debugger;
        if (res.result) {
          this.toastr.success('Dept updated successfully!', 'updated');
          this.getAllDepartments(); //? To call and refresh table departments
        } else {
          this.toastr.error(res.message, 'Error');
        }
      });
    } else {
      this.toastr.warning('Please complete the form correctly.', 'Warning');
    }
  }

  deleteDepartment(id: number) {
    const isDeleted = confirm('Are you sure you want to delete');
    if (isDeleted) {
      this.DepartmentService.deleteDepartment(id).subscribe((res: any) => {
        if (res.result) {
          this.toastr.success('Dept deleted successfully!', 'Success');
          this.getAllDepartments();
        } else {
          this.toastr.error(res.message, 'Error');
        }
      });
    }
  }

}
