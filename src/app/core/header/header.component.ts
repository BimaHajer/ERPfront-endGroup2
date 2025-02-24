import { UserService } from './../../user/user.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { User } from '../../user/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  id: number | undefined
  firstName: string = '';
  lastName: string = '';
  user: User = new User()
  idUser: number = 0;

  constructor( private router: Router, private sharedService: SharedService, private userService: UserService) {}

  ngOnInit(): void {
    this.idUser = +this.sharedService.getCookie('idUser')
    this.getUser();

  }

  getUser() {
    this.userService.getUser(this.idUser).subscribe(
      data => {
        this.user = data
      }
    )
  }

  logout() {
    document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    localStorage.clear()
    this.router.navigate(['/account/login']);
  }

}
