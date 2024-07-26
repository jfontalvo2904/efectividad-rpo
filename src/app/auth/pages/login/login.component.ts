import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import User from '../../interfaces/User.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private formBuilder : FormBuilder = inject(FormBuilder);
  private autService : AuthService = inject(AuthService);

  public loginForm: FormGroup = this.formBuilder.group({
    email : ['emilys', [Validators.required]],
    password: ['emilyspass',[Validators.required]]
  });

  login() {
    if(this.loginForm.invalid) {return};

    let username: string = this.loginForm.get('email')?.value;
    let password: string = this.loginForm.get('password')?.value;
    
    if(username && password) {

     if(this.autService.login(username, password) ) {
        console.log(this.autService.userValue())
     }
    }
  }

}
