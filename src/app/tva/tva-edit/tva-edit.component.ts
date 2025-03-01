import { Component } from '@angular/core';
import { Tva } from '../tva';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TvaService } from '../tva.service';
import { Alert } from '../../shared/shared.service';

@Component({
  selector: 'app-tva-edit',
  templateUrl: './tva-edit.component.html',
  styleUrl: './tva-edit.component.css'
})
export class TvaEditComponent {
    tvaId!: number
    tva: Tva = new Tva()
    success: boolean = false
    registerForm: FormGroup
    validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
    alert: Alert = new Alert()
  
    constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private TvaService: TvaService) {
      this.registerForm = this.formBuilder.group({
        value: ['', [Validators.required]],
        active: [],
        });
  
    }
  
    ngOnInit() {
      this.activatedRoute.paramMap.subscribe((params:ParamMap )=> {
        this.tvaId = Number(params.get('id'));
        this.getTva()
      });
    }
  
    getTva() {
      this.TvaService.getTva(this.tvaId).subscribe(
        (data:any) => {
          this.tva= data
          this.registerForm.patchValue(this.tva)
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
      
      if (this.tvaId) {
        this.TvaService.editTva(this.tvaId, this.registerForm.value).subscribe(
          (data) => {
            this.tva = data;
            this.success = true;
            this.validateBtnState = ClrLoadingState.SUCCESS;
            this.alert = { success: true, msgSuccess: "La modification de Tva " + this.tva.id + " a été effectuée avec succès !", echec: false, open: true }
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
