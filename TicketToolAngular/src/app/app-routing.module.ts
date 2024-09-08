import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepartmentComponent } from './components/department/department.component';
import { ParentCategoryComponent } from './components/parent-category/parent-category.component';
import { ChildCategoryComponent } from './components/child-category/child-category.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { NewTicketComponent } from './components/new-ticket/new-ticket.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '', component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'department', component: DepartmentComponent },
      { path: 'parent-category', component: ParentCategoryComponent },
      { path: 'child-category', component: ChildCategoryComponent },
      { path: 'employee', component: EmployeeComponent },
      { path: 'new-ticket', component: NewTicketComponent },
      { path: 'ticket-list', component: TicketListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
