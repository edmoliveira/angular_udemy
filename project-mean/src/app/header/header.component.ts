import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticantionService } from "../shared/authenticaton.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: Observable<boolean>;

  constructor(private router: Router, private authenticantionService: AuthenticantionService) {

  }

  ngOnInit() {
    this.isAuthenticated = this.authenticantionService.authenticatonStation;
  }

  logout() {
    this.authenticantionService.logout();
    this.router.navigate(['/auth']);
  }
}
