import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  id: number | undefined
  firstName: string = '';
  lastName: string = '';

  constructor( private router: Router, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.firstName = this.sharedService.getCookie('firstName')
    this.lastName = this.sharedService.getCookie('lastName')

  }


  logout() {
    document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    localStorage.clear()
    this.router.navigate(['/account/login']);
  }

}
