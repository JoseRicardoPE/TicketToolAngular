import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from 'src/app/services/master.service';
import { NewDeptObj } from '../../interfaces/new-dept-obj';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  newDeptForm!: FormGroup;
  departmentList: any[] = [];

  constructor(
    private masterService: MasterService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) { 
    this.newDeptForm = this.fb.group({
      deptName: ['', [Validators.required]],
      createdDate: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments() {
    this.masterService.getDepartments().subscribe((res: any) => {
      debugger;
      this.departmentList = res.data;
    })
  }

  saveDepartment() {
    if (this.newDeptForm.valid) {
      debugger;
      const newDept: NewDeptObj = this.newDeptForm.value;
      this.masterService.createDepartment(newDept).subscribe((res: any) => {
        debugger;
        if (res.result) {
          this.toastr.success('Dept created successfully!', 'Created');
          this.getDepartments();
        } else {
          this.toastr.error(res.message, 'Error');
        }
      });
    } else {
      this.toastr.warning('Por favor, completa el formulario correctamente.', 'Advertencia');
    }
  }

}
