import { Component } from '@angular/core';
import { Tva } from '../tva';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TvaService } from '../tva.service';

@Component({
  selector: 'app-tva-edit',
  templateUrl: './tva-edit.component.html',
  styleUrl: './tva-edit.component.css'
})
export class TvaEditComponent {
    tvaId!: number
    tva: Tva = new Tva()
    success: boolean = false
    erreurMsg: string = ''
    registerForm: FormGroup
    validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
    msgAlert: string = ''
  
    constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private TvaService: TvaService) {
      this.registerForm = this.formBuilder.group({
        value: ['', [Validators.required]]
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
            this.msgAlert = "La modification de Tva " + this.tva.id + " a été effectuée avec succès !";
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
