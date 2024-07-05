import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from 'src/app/services/master.service';
import { Login } from '../../interfaces/login';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private masterService: MasterService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {}

  onLogin() {
    if (this.loginForm.valid) {
      const loginData: Login = this.loginForm.value;
      console.log('login data', loginData);
      this.masterService.login(loginData).subscribe( (res: any) => {
        console.log('response', res);
        if (res.result) {
          localStorage.setItem('ticketUser', JSON.stringify(res.data));
          this.toastr.success('Inicio de sesión exitoso!', 'Éxito');
          this.router.navigateByUrl('dashboard');
        } else {
          this.toastr.error(res.message, 'Error');
        }
      }, (error) => {
        this.toastr.error('Ocurrió un error al intentar iniciar sesión', 'Error');
      });
    } else {
      this.toastr.warning('Por favor, completa el formulario correctamente.', 'Advertencia');
    }
  }

}
