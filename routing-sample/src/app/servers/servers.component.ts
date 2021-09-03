import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerService } from '../serverService';
import { Server } from './serverModel';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  servers: Server[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private serverService: ServerService) { }

  ngOnInit(): void {
    this.servers = this.serverService.getServers();
  }

  onReloadServers(){
    //this.router.navigate(['servers'], { relativeTo: this.route});
  }
}
