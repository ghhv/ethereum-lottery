import { DataService } from './../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../validate.service';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showAlert: Boolean = false;
  name: String;
  email: String;
  password: String;
  confirm: String;
  params;

  constructor(
    private validate: ValidateService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cookie: CookieService,
    private data: DataService
  ) { }

  ngOnInit() {
    this.auth.logout();
    this.route.queryParams.subscribe(params => {this.params = params; });
    this.cookie.set( 'Ref', this.params.ref );
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      confirm: this.confirm
    };
    // Validate Fields
    if (this.validate.validateRegister(user) && this.validate.validateEmail(this.email)) {
      if (this.cookie.get('Ref')) {
        user['bonus'] = true;
      }
        this.auth.registerUser(user).subscribe(data => {
          if (data.success) {
            this.router.navigate(['/login']);
          } else {
            console.log(data);
            this.router.navigate(['/register']);
          }
        });
      } else {
        this.showAlert = true;
      }
  }

}
