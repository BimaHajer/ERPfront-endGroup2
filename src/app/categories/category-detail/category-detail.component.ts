import { Component } from '@angular/core';
import { Category } from '../category';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.css'
})
export class CategoryDetailComponent {
    Category = new Category
    // CategoryAdd = new Category()
    // CategoryEdit = new Category()
    showAlert: boolean = false;
    categoryId: number = -1;
    currentCategory: number = -1
    // disable: boolean = false;
    // created: string = ''
    // updated: string = ''
    // src: string;
    constructor(private activatedRoute: ActivatedRoute, private router: Router, private CategoriesService: CategoriesService, private sharedService: SharedService) { }
  
    ngOnInit(): void {
      this.currentCategory = +this.sharedService.getCookie('idCategory')
  
      this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
        this.categoryId = Number(params.get('id'))
        this.getCategory()
  
      })
    }
  
    getCategory() {
      this.CategoriesService.getCategory(this.categoryId ).subscribe(
        (data:any) => {
          this.Category = data
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
      this.router.navigate(['../../categories']);
      this.showAlert = false;
    }
  
    redirectTo() {
     window.history.back();
    }

}
