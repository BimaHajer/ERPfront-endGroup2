import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { Brand } from '../../brands/brands';
import { BrandsService } from '../../brands/brands.service';
import { Alert } from '../../shared/shared.service';
import { ModelsService } from '../models.service';
import { SharedModule } from "../../shared/shared.module";

@Component({
  selector: 'app-add-modele',
  templateUrl: './models-add.component.html',
  styleUrl: './models-add.component.css',
})
export class ModelsAddComponent {

  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  success: boolean = false;
  erreurMsg: string = '';
  alert: Alert = new Alert()
  brands: Brand[] = []
    loading: boolean = false

  modeleForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private modelsService: ModelsService,
    private brandsService: BrandsService
  ) {

    this.modeleForm= this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        description: [''],
        active: [true],
        brandId: [, [Validators.required]],
      },
    );
  }

  ngOnInit() {}



  onSearchChange(args: string) {
    this.loading = true
    let filter: any={}
    if (args) {
      filter.take = 10
        filter.where = { name: { type: "ilike", value: args  }, active: true }

    } else {
      filter.take = 15
        filter.where = { active: true }
    }
        this.getBrands(filter)

    }


    getBrands(filter: any) {
      console.log("Filtre utilisé pour la recherche des marques :", filter);
      filter.select = ['id', 'name'];

      this.brandsService.getBrands(filter).subscribe(
          data => {
              console.log("Données reçues :", data);
              this.brands = data[0];
          },
          err => {
              console.error('Erreur lors de la récupération des marques:', err);
          },
          () => this.loading = false
      );
  }


  submitAction(top: HTMLElement) {
    if (this.modeleForm.valid) {
      this.validateBtnState = ClrLoadingState.LOADING;
      this.modelsService.addModel(this.modeleForm.value).subscribe(
        (data) => {
          this.validateBtnState = ClrLoadingState.SUCCESS;
          this.modeleForm.reset({ active: true });
          this.alert = { success: true, msgSuccess: "L'ajout de modèle " + data.id + " a été effectué avec succès! ", echec: false, open: true };

                },
        (err) => {
          console.error('Observer got an error: ' + err);
          this.alert = { success: false, msgEchec: "L'ajout a échoué.", echec: true, open: true };
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
    window.history.back();
  }
}
