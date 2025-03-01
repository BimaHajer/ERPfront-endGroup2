import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { CategoriesService } from '../categories.service';
import { Alert } from '../../shared/shared.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.css'
})
export class CategoryAddComponent {
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  success: boolean = false;
  alert: Alert = new Alert()
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
        this.alert = { success: true, msgSuccess: "L'ajout de catégorie " + data.id + " a été effectué avec succès! ", echec: false, open: true };
      },
      (err) => {
        console.error('Erreur lors de l\'ajout de la catégorie :', err);

        if (/catégorie existe déjà/.test(err.error.message)) {
          this.alert = { success: false, msgEchec: err.error.message, echec: true, open: true }
        } else {
          this.alert = { success: false, msgEchec: "L'ajout de catégorie a été échoué ..", echec: true, open: true }
        }

        this.validateBtnState = ClrLoadingState.ERROR
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
