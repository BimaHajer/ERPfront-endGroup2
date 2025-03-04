import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ClrLoadingState } from '@clr/angular';
import { Brand } from '../../brands/brands';
import { BrandsService } from '../../brands/brands.service';
import { Alert } from '../../shared/shared.service';
import { Modele } from '../models';
import { ModelsService } from '../models.service';

@Component({
  selector: 'app-edit-modele',
  templateUrl: './models-edit.component.html',
  styleUrls:[ './models-edit.component.css']
})
export class ModelsEditComponent {

  modeleId!: number
  modele: Modele = new Modele()
  success: boolean = false
  modeleForm: FormGroup
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
  alert: Alert = new Alert()
  brands: Brand[] = []
    loading: boolean = false

  constructor(private formBuilder: FormBuilder,  private activatedRoute: ActivatedRoute, private modeleService: ModelsService, private brandsService: BrandsService) {   this.modeleForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [],
      active: [],
      brandId: [, [Validators.required]],
      });

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params:ParamMap )=> {
      this.modeleId = Number(params.get('id'));
      console.log( this.modeleId)
      this.getModele()
    });
  }

  getModele() {
    this.modeleService.getModel(this.modeleId).subscribe(
      (data:any) => {
        this.modele = data
        console.log(" this.modele ", this.modele )
        this.modeleForm.patchValue(this.modele)
      },
      err => { console.error('Observer got an error: ' + err) },
    )
  }

onSearchChange(args: string) {
  this.loading = true
  let filter: any={}
  if (args) {
    filter.take = 10
      filter.where = { name: { type: "ilike", value:args }, active: true }

  } else {
    filter.take = 15
      filter.where = { active: true }
  }
      this.getBrands(filter)

  }


    getBrands(filter: any) {

      filter.select
       = ['id', 'name']
          this.brandsService.getBrands(filter).subscribe(
            data => {
              this.brands = data[0]
            },
            err => {
              console.error('Observer got an error: ' + err)
            },
            () => this.loading = false
          );
        }


  submitAction(top: HTMLElement) {
    if (this.modeleForm.valid) {
      this.validateBtnState = ClrLoadingState.LOADING;
      if (this.modeleId) {
        this.modeleService.editModel(this.modeleId, this.modeleForm.value).subscribe(
          (data) => {
            this.modele = data;
            this.validateBtnState = ClrLoadingState.SUCCESS;
            this.alert = { success: true, msgSuccess: "La modification du modèle été effectuée avec succès!", echec: false, open: true };
          },
          (err) => {
            console.error('Erreur lors de la modification de la modèle:', err);
            this.alert = { success: true, msgSuccess: "La modification de client " + this.modele.id + " a été effectuée avec succès !", echec: false, open: true }
                  this.validateBtnState = ClrLoadingState.ERROR;
          }
        );
      }
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
