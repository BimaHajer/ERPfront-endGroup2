import { Component } from '@angular/core';
import { Category } from '../category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css'
})
export class CategoryEditComponent {
    categoryId!: number
    Category: Category = new Category()
    success: boolean = false
    erreurMsg: string = ''
    registerForm: FormGroup
    validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
    msgAlert: string = ''
  
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
            this.msgAlert = "La modification de la catégorie " + this.Category.id + " a été effectuée avec succès !";
          },
          (err) => {
            console.error("Observer got an error: " + err);
            this.erreurMsg = "La modification de la catégorie a échoué ..";
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
