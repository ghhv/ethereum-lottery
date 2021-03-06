import { ValidateService } from './../validate.service';
import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isDashboard: boolean = false;
  constructor(private router: Router, private auth: AuthService, private validate: ValidateService) { }

  ngOnInit() {
    if (this.validate.checkIsDashboard(this.router.url)) {
      this.isDashboard = true;
    }
  }
  onLogout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
