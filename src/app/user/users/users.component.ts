import { Component } from '@angular/core';
import { User } from '../user';
import { ClrDatagridSortOrder, ClrDatagridStateInterface } from '@clr/angular';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { pageSize, pageSizeOptions, SharedService } from '../../shared/shared.service';
import { FilterDto } from '../../filter.dto';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: any[] = []
  showAlert: boolean = false;
  count: number = 0;
  loading: boolean = true
  state: ClrDatagridStateInterface = {}

  allSelected: User[] = [];
  descSort: ClrDatagridSortOrder = ClrDatagridSortOrder.DESC
  idsSelected: any = [];
  filter: FilterDto = new FilterDto()

  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  currentUser: number = -1;
  constructor(private userService: UserService, private router: Router, private sharedService:SharedService) {}

  ngOnInit() {
    this.currentUser = +this.sharedService.getCookie('idUser')
  }

  refresh(state: ClrDatagridStateInterface) {
    this.loading = true
    this.state = state
    const page = this.state.page?.current || 1
    this.filter.take = this.state.page?.size || pageSize
    this.filter.skip =  (page - 1) * (this.filter.take)
    this.getUsers()
  }

  getUsers() {
    this.userService.getUsers(this.filter).subscribe(
      data => {
        this.users = data[0]
        this.count = data[1]
      },
      err => console.error('Observer got an error: ' + err),
      () => {
        this.loading = false
      }
    )
  }

  close() {
    this.showAlert = false;
  }

  save() {
    this.showAlert = false;
    this.allSelected = []
    this.refresh(this.state)
  }

  existInSelected(item: User) {
    return this.allSelected.findIndex(elem => elem.id == item.id) >= 0
  }

  selectionChanged() {
    this.allSelected = this.allSelected.reverse()
      .filter((item, index, self) => index === self.findIndex((tab) => (tab.id === item.id)))
      this.idsSelected = this.allSelected.map(elem => elem.id)
    }

  deleteMultipleAction() {
    this.idsSelected = this.allSelected.map(elem => elem.id)
    this.showAlert = true
  }

  editAction() {
    this.router.navigate(['/users/edit/', this.allSelected[0].id]);
  }

}
