import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup,Validator, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private formBuilder : FormBuilder = inject(FormBuilder);

  public loginForm: FormGroup = this.formBuilder.group({
    email : [''],
    password: ['']
  });

}
