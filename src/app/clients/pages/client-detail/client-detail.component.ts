import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client-service/client.service';
import Client from '../../interfaces/Client.interface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'client-detail',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.css'
})
export class ClientDetailComponent implements OnInit{

  private activedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  public clientId!: number;
  private clientService: ClientService = inject(ClientService);
  public client?: Client;

  constructor() {
    this.activedRoute.paramMap.subscribe( paramMap  => {
      if(paramMap.get('id')) {
        this.clientId = Number(paramMap.get('id'));

        if(!this.clientId) {
          this.router.navigate(['/clientes'])
        }
      }
    })
  }
  ngOnInit(): void {

    this.clientService.getClientById(this.clientId).subscribe({
      next : (client : Client) => {
        this.client = client;
      }
    })
    
  }

}
