import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Server } from '../serverModel';
import { ServerService } from '../../serverService';

@Component({
  selector: 'app-server-edit',
  templateUrl: './server-edit.component.html',
  styleUrls: ['./server-edit.component.css']
})
export class ServerEditComponent implements OnInit {
  server: Server;
  allowEdit: boolean;

  constructor(private route: ActivatedRoute, private serverService: ServerService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.server = this.serverService.getServers().find(item => item.id == params["id"]);
    });

    this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams["allowEdit"] === 'true';
    });
  }

}
