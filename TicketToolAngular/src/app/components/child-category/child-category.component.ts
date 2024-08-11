import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryObj } from 'src/app/interfaces/categoryObj';
import { ChildCategoryObj } from 'src/app/interfaces/child-category-obj';
import { DeptObj } from 'src/app/interfaces/new-dept-obj';
import { CategoryService } from 'src/app/services/category.service';
import { ChildcategoryService } from 'src/app/services/childcategory.service';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-child-category',
  templateUrl: './child-category.component.html',
  styleUrls: ['./child-category.component.css']
})
export class ChildCategoryComponent implements OnInit {

  childCategoryForm!: FormGroup;
  categoryList: CategoryObj[] = [];
  departmentList: DeptObj[] = [];
  childCategoryList: ChildCategoryObj[] = [];
  isResetting: boolean = false;
  selectedCategoryName: string = '';

  constructor(
    private DepartmentService: DepartmentService,
    private categoryService: CategoryService,
    private childCategoryService: ChildcategoryService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) { 
    this.childCategoryForm = this.fb.group({
      categoryName: ['', [Validators.required]],
      parentCategoryName: ['', [Validators.required]],
      childCategoryId: [0]
    });
  }

  ngOnInit(): void {
    this.getAllChildCategories();
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllParentCategory().subscribe((res: any) => {
      // debugger;
      this.categoryList = res.data;
      console.log(this.categoryList);
    })
  }

  getAllChildCategories() {
    this.childCategoryService.getAllChildCategory().subscribe((res: any) => {
      // debugger;
      this.childCategoryList = res.data;
      console.log(this.childCategoryList);
    })
  }

  resetChildCategoryForm() {
    // debugger;
    this.isResetting = true;  //? indicate that the form is being reset.
    this.childCategoryForm.reset({
      categoryName: '',
      parentCategoryName: '',
      childCategoryId: 0,
    });

    //? to ensure that isResetting returns false after the reset is complete
    setTimeout(() => {
      this.isResetting = false;
    }, 0);
  }

  saveChildCategory() {
    if (this.isResetting) return; //? exit if the form is being reset

    if (this.childCategoryForm.valid) {
      // debugger;
      const newChildCategory: ChildCategoryObj = this.childCategoryForm.value;
      this.childCategoryService.createChildCategory(newChildCategory).subscribe((res: any) => {
        // debugger;
        if (res.result) {
          this.toastr.success('Child Category created successfully!', 'Created');
          this.getAllChildCategories(); //? To call and refresh table categories
        } else {
          this.toastr.error(res.message, 'Error');
        }
      });
    } else {
      this.toastr.warning('Please complete the form correctly.', 'Warning');
    }
  }

  onEdit(data: ChildCategoryObj) {
    console.log('Data onEdit', data);
    // const formatedDate = new Date(data.createdDate).toISOString().split('T')[0]; 
    this.childCategoryForm.patchValue({
      categoryName: data.categoryName,
      parentCategoryName: data.parentCategoryName,
      childCategoryId: data.childCategoryId,
    });
  }

  updateChildCategory() {
    if (this.childCategoryForm.valid) {
      // debugger;
      const newChildCategory: ChildCategoryObj = this.childCategoryForm.value;
      this.childCategoryService.updateChildCategory(newChildCategory).subscribe((res: any) => {
        // debugger;
        if (res.result) {
          this.toastr.success('Child Category updated successfully!', 'updated');
          this.getAllChildCategories(); //? To call and refresh table categories
        } else {
          this.toastr.error(res.message, 'Error');
        }
      });
    } else {
      this.toastr.warning('Please complete the form correctly.', 'Warning');
    }
  }

  deleteChildCategory(id: number) {
    const isDeleted = confirm('Are you sure you want to delete');
    if (isDeleted) {
      this.childCategoryService.DeleteChildCategory(id).subscribe((res: any) => {
        if (res.result) {
          this.toastr.success('Child Category deleted successfully!', 'Success');
          this.getAllChildCategories();
        } else {
          this.toastr.error(res.message, 'Error');
        }
      });
    }
  }

  selectCategory(category: CategoryObj) {
    this.childCategoryForm.patchValue({ categoryId: category.categoryId });
    this.selectedCategoryName = category.categoryName;
  }

}


