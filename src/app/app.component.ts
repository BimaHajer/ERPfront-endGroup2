import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { tokenGetter } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showMenu = false
  clrVerticalNavCollapsed: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    event.target.innerWidth;
    if (event.target.innerWidth < 992) {
      this.clrVerticalNavCollapsed = true
    }
    else {
      this.clrVerticalNavCollapsed = false
    }
  }
  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        if (window.screen.width < 992 && !this.clrVerticalNavCollapsed)  {
          this.clrVerticalNavCollapsed = true
        }
        if (event.url === '/account/login') {
          this.showMenu = false;
        } else {
          if (event.url === '/') {
            if (tokenGetter().length == 0) {
              this.showMenu = false;
              this.router.navigate(['account/login']);
            }
            else {
              this.showMenu = true;
              this.router.navigate(['dashboard']);

            }
          }
          else {
            this.showMenu = true;
          }
        }
      }
    });
  }
}
