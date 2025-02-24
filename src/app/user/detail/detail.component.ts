import { Component } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from '../user.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {

  user = new User()
  // userAdd = new User()
  // userEdit = new User()
  showAlert: boolean = false;
  userId: number = -1;
  currentUser: number = -1
  // disable: boolean = false;
  // created: string = ''
  // updated: string = ''
  // src: string;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.currentUser = +this.sharedService.getCookie('idUser')

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.userId = Number(params.get('id'))
      this.getUser()

    })
  }

  getUser() {
    this.userService.getUser(this.userId).subscribe(
      (data:any) => {
        this.user = data
      },
      err => { console.error('Observer got an error: ' + err) },
    )
  }

  deleteAction() {
    this.showAlert = true;
  }

  close() {
    this.showAlert = false;
  }

  save() {
    this.router.navigate(['../../users']);
    this.showAlert = false;
  }

  redirectTo() {
   window.history.back();
  }
}
