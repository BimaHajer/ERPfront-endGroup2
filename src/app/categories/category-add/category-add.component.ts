import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.css'
})
export class CategoryAddComponent {
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  success: boolean = false;
  erreurMsg: string = '';
  msgAlert: string = '';
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private CategoriesService: CategoriesService,
  ) {
  this.registerForm = this.formBuilder.group(
    {
      name: ['', [Validators.required]],
      description: [''],
      active: [true],
    }
  );
}
    
ngOnInit() {}
    
close() {
  this.success = false;
}
    
    
submitAction(top: HTMLElement) {
  if (this.registerForm.valid) {
    this.validateBtnState = ClrLoadingState.LOADING;
    
    this.CategoriesService.addCategory(this.registerForm.value).subscribe(
      (data) => {
        this.validateBtnState = ClrLoadingState.SUCCESS;
        this.registerForm.reset({ active: true });

        this.msgAlert =
          "L'ajout de la catégorie " + data.name + " a été effectué avec succès! ";
      },
      (err) => {
        console.error('Erreur lors de l\'ajout de la catégorie :', err);

        if (/catégorie existe déjà/.test(err.error.message)) {
          this.erreurMsg = err.error.message;
        } else {
          this.erreurMsg = "L'ajout de la catégorie a échoué.";
        }

        this.validateBtnState = ClrLoadingState.ERROR;
        this.success = false;
      }
    );
  }
  this.scroll(top);
}

    
  scroll(el: HTMLElement) {
    el.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
    
  redirectTo() {
    window.history.back();
  }
}
