import { Component } from '@angular/core';
import { Category } from '../category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { Alert } from '../../shared/shared.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css'
})
export class CategoryEditComponent {
    categoryId!: number
    Category: Category = new Category()
    success: boolean = false
    registerForm: FormGroup
    validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
    alert: Alert = new Alert()
  
    constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private CategoriesService: CategoriesService) {
      this.registerForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        description: [''],
        active: [],
        });
  
    }
  
    ngOnInit() {
      this.activatedRoute.paramMap.subscribe((params:ParamMap )=> {
        this.categoryId = Number(params.get('id'));
        this.getCategory()
      });
    }
  
    getCategory() {
      this.CategoriesService.getCategory(this.categoryId).subscribe(
        (data:any) => {
          this.Category = data
          this.registerForm.patchValue(this.Category)
        },
        err => { console.error('Observer got an error: ' + err) },
      )
    }
  
    actionClose() {
      this.success = false
    }
  
    submitAction(top: HTMLElement) {
      if (!this.registerForm.valid) {
        return;
      }
    
      this.validateBtnState = ClrLoadingState.LOADING;
      
      if (this.categoryId) {
        this.CategoriesService.editCategory(this.categoryId, this.registerForm.value).subscribe(
          (data) => {
            this.Category = data;
            this.success = true;
            this.validateBtnState = ClrLoadingState.SUCCESS;
            this.alert = { success: true, msgSuccess: "La modification de catégorie " + this.Category.id + " a été effectuée avec succès !", echec: false, open: true }
          },
          (err) => {
            console.error("Observer got an error: " + err);
            this.alert = { success: false, msgEchec: "La modification de catégorie a été échouée ..", echec: true, open: true }
            this.success = false;
            this.validateBtnState = ClrLoadingState.ERROR;
          }
        );
      }
    
      this.scroll(top);
    }
  
  scroll(el: HTMLElement) {
    el.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
  
  redirectTo() {
    window.history.back()
  }
}
