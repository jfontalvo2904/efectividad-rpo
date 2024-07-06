import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css'
})
export class LogoComponent {

  @Input()
  logoUrl : string = '../../../assets/images/logo/logo.png';

}
