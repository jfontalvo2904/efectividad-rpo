import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import User from '../../interfaces/User.interface';
import { LoadingModalComponent } from '../../../shared/components/loading-modal/loading-modal.component';
import { Router } from '@angular/router';
import CustomSwal from '../../../shared/utils/CustomSwal';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, LoadingModalComponent,MatButtonModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

 
  public isLoading : WritableSignal<boolean> = signal(false);

  private formBuilder : FormBuilder = inject(FormBuilder);
  private autService : AuthService = inject(AuthService);
  router : Router = inject(Router);
  

  public loginForm: FormGroup = this.formBuilder.group({
    email : ['stephanymore2002@gmail.com', [Validators.required, Validators.email]],
    password: ['2019114034',[Validators.required]]
  });

  login() {

    if(this.loginForm.invalid) {
      CustomSwal.toast({icon:'error', title:'Rellena los campos correctamente'})
      return
    };

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
          if(err.status === 404) {
            CustomSwal.modalError("Lo sentimos", "No hemos podido encontrar al usuario");
          }else if(err.status === 400){
            CustomSwal.modalError("Verifica tus datos","El usuario o contraseña son incorrectos")
          }else{
            CustomSwal.modalError("Algo ha salido mal","Por favor intenta nuevamente en otro momento")
          }
        }
      });
    
    }
  }

}
