import { Component, OnInit } from '@angular/core';
import { Client } from './clientModel';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../clientService';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  client: Client;
  newMode: boolean = true;

  constructor(private route: ActivatedRoute, private clientService: ClientService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const clientResolver: Client = data.clientResolver
      
      if(clientResolver != null) {
        this.newMode = false;
        this.client = clientResolver;
      }
      else {
        this.newMode = true;
        this.client = new Client(this.clientService.getClients().length + 1, '');
      }
    });
  }

}
