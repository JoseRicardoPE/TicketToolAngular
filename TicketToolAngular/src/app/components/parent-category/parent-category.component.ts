import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryObj } from 'src/app/interfaces/categoryObj';
import { DeptObj } from 'src/app/interfaces/new-dept-obj';
import { CategoryService } from 'src/app/services/category.service';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-parent-category',
  templateUrl: './parent-category.component.html',
  styleUrls: ['./parent-category.component.css']
})
export class ParentCategoryComponent implements OnInit {

  newCategoryForm!: FormGroup;
  categoryList: CategoryObj[] = [];
  departmentList: DeptObj[] = [];
  isResetting: boolean = false;
  selectedDepartmentName: string = '';

  constructor(
    private DepartmentService: DepartmentService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) { 
    this.newCategoryForm = this.fb.group({
      categoryId: [0],
      categoryName: ['', [Validators.required]],
      deptId: [0],
    });
  }

  ngOnInit(): void {
    this.getAllParentCategories();
    this.getAllDepartments();
  }

  getAllDepartments() {
    this.DepartmentService.getAllDepartments().subscribe((res: any) => {
      // debugger;
      this.departmentList = res.data;
      console.log(this.departmentList);
    })
  }

  getAllParentCategories() {
    this.categoryService.getAllParentCategory().subscribe((res: any) => {
      // debugger;
      this.categoryList = res.data;
      console.log(this.categoryList);
    })
  }

  resetCategoryForm() {
    // debugger;
    this.isResetting = true;  //? indicate that the form is being reset.
    this.newCategoryForm.reset({
      categoryId: 0,
      categoryName: '',
      deptId: 0,
    });

    //? to ensure that isResetting returns false after the reset is complete
    setTimeout(() => {
      this.isResetting = false;
    }, 0);
  }

  saveParentCategory() {
    if (this.isResetting) return; //? exit if the form is being reset

    if (this.newCategoryForm.valid) {
      // debugger;
      const newCategory: CategoryObj = this.newCategoryForm.value;
      this.categoryService.createParentCategory(newCategory).subscribe((res: any) => {
        // debugger;
        if (res.result) {
          this.toastr.success('Category created successfully!', 'Created');
          this.getAllParentCategories(); //? To call and refresh table categories
        } else {
          this.toastr.error(res.message, 'Error');
        }
      });
    } else {
      this.toastr.warning('Please complete the form correctly.', 'Warning');
    }
  }

  onEdit(data: CategoryObj) {
    console.log('Data onEdit', data);
    // const formatedDate = new Date(data.createdDate).toISOString().split('T')[0]; 
    this.newCategoryForm.patchValue({
      categoryId: data.categoryId,
      categoryName: data.categoryName,
      deptId: data.deptId,
    });
  }

  updateParentCategory() {
    if (this.newCategoryForm.valid) {
      // debugger;
      const newCategory: CategoryObj = this.newCategoryForm.value;
      this.categoryService.updateParentCategory(newCategory).subscribe((res: any) => {
        // debugger;
        if (res.result) {
          this.toastr.success('Category updated successfully!', 'updated');
          this.getAllParentCategories(); //? To call and refresh table categories
        } else {
          this.toastr.error(res.message, 'Error');
        }
      });
    } else {
      this.toastr.warning('Please complete the form correctly.', 'Warning');
    }
  }

  deleteParentCategory(id: number) {
    const isDeleted = confirm('Are you sure you want to delete');
    if (isDeleted) {
      this.categoryService.DeleteParentCategory(id).subscribe((res: any) => {
        if (res.result) {
          this.toastr.success('Category deleted successfully!', 'Success');
          this.getAllParentCategories();
        } else {
          this.toastr.error(res.message, 'Error');
        }
      });
    }
  }

  selectDepartment(department: DeptObj) {
    this.newCategoryForm.patchValue({ deptId: department.deptId });
    this.selectedDepartmentName = department.deptName;
  }

}
