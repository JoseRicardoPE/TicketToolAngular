import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DepartmentComponent } from './components/department/department.component';
import { ParentCategoryComponent } from './components/parent-category/parent-category.component';
import { ChildCategoryComponent } from './components/child-category/child-category.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { NewTicketComponent } from './components/new-ticket/new-ticket.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    ParentCategoryComponent,
    ChildCategoryComponent,
    EmployeeComponent,
    NewTicketComponent,
    TicketListComponent,
    DashboardComponent,
    LoginComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
