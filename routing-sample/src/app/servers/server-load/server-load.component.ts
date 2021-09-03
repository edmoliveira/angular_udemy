import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-server-load',
  templateUrl: './server-load.component.html',
  styleUrls: ['./server-load.component.css']
})
export class ServerLoadComponent implements OnInit {
  id: string;
  name: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.name = params["name"];
    });
  }

  openEdit() {
    this.router.navigate(['servers', this.id], { queryParamsHandling: 'preserve' });
  }
}
