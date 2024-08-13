import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import User from '../../interfaces/User.interface';
import { LoadingModalComponent } from '../../../shared/components/loading-modal/loading-modal.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, LoadingModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

 
  public isLoading : WritableSignal<boolean> = signal(false);

  private formBuilder : FormBuilder = inject(FormBuilder);
  private autService : AuthService = inject(AuthService);
  router : Router = inject(Router);
  

  public loginForm: FormGroup = this.formBuilder.group({
    email : ['stephanymore2002@gmail.com', [Validators.required]],
    password: ['2019114034',[Validators.required]]
  });

  login() {

    if(this.loginForm.invalid) {return};

    let username: string = this.loginForm.get('email')?.value;
    let password: string = this.loginForm.get('password')?.value;
    
    if(username && password) {
      this.isLoading.set(true);
      this.autService.login(username,password).subscribe({
        next : (user : User) => {
          this.isLoading.set(false);
          this.router.navigate(['/clients'])

        },
        error : (err : any) => {
          this.isLoading.set(false);
          console.log("Ha ocurrido un error")
        }
      });
    
    }
  }

}
