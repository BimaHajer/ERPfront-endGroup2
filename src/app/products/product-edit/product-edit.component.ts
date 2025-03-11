  import { Component } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { Brand } from '../../brands/brands';
  import { BrandsService } from '../../brands/brands.service';
  import { ClrLoadingState } from '@clr/angular';
  import { ProductsService } from '../products.service';
  import { Alert } from '../../shared/shared.service';
  import { CategoriesService } from '../../categories/categories.service';
  import { Category } from '../../categories/category';
  import { Modele } from '../../models/models';
  import { ModelsService } from '../../models/models.service';
  import { ActivatedRoute } from '@angular/router';

  @Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.css']
  })
  export class ProductEditComponent {
    form: FormGroup;
    loading: boolean = false;
    brands: Brand[] = [];
    categories: Category[] = [];
    models: Modele[] = [];
    validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
    alert: Alert = new Alert();
    tvaAlert: Alert = new Alert();
    productId!: number;
    brandAlert: Alert = new Alert();
    brandId: number | null = null;

    constructor(
      private formBuilder: FormBuilder,
      private brandsService: BrandsService,
      private productsService: ProductsService,
      private categoriesService: CategoriesService,
      private modelsService: ModelsService,
      private activatedRoute: ActivatedRoute
    ) {
      this.form = this.formBuilder.group({
        general: this.formBuilder.group({
          name: [, Validators.required],
          description: [],
          active: [true]
        }),
        detail: this.formBuilder.group({
          brandId: [, [Validators.required]],
          categoryId: [, [Validators.required]],
          modelId: [, [Validators.required]]
        }),
        tarif: this.formBuilder.group({
          priceTTC: [0.00, [Validators.pattern((/^\d*[\.,\,]?\d{0,2}$/)), Validators.max(9999999999.99)]],
          tva: [, [Validators.required]],
          priceHT: [0.00, [Validators.pattern((/^\d*[\.,\,]?\d{0,2}$/)), Validators.max(9999999999.99)]],
          initialQuantity: [, [Validators.required]],
          remainingQuantity: []
        }),
      });

      this.form.get('tarif.initialQuantity')?.valueChanges.subscribe(value => {
        if (value !== null && value !== undefined) {
          this.form.get('tarif.remainingQuantity')?.setValue(value);
        }
      });

      this.form.get('detail.brandId')?.valueChanges.subscribe(value => {
        if (!value) {
          this.brandAlert = {
            success: false,
            msgEchec: 'La marque doit être sélectionnée avant de continuer.',
            echec: true,
            open: true
          };
          this.form.get('detail.modelId')?.disable();
        } else {
          this.brandAlert.open = false;
          this.form.get('detail.modelId')?.enable();
        }
      });

      this.form.get('tarif.priceHT')?.valueChanges.subscribe(priceHT => {
        const tva = this.form.get('tarif.tva')?.value;
        if (priceHT !== null && priceHT !== undefined && tva !== null && tva !== undefined) {
          const priceTTC = priceHT * (1 + tva / 100);
          this.form.get('tarif.priceTTC')?.setValue(priceTTC.toFixed(2), { emitEvent: false });
        }

        const tvaCheck = this.form.get('tarif.tva')?.value;
        if (!tvaCheck) {
          this.tvaAlert = {
            success: false,
            msgEchec: 'La TVA doit être remplie avant de continuer.',
            echec: true,
            open: true
          };
        } else {
          this.tvaAlert = { success: true, msgSuccess: '', echec: false, open: false };
        }
      });

      this.form.get('tarif.tva')?.valueChanges.subscribe(tva => {
        const priceHT = this.form.get('tarif.priceHT')?.value;
        if (priceHT !== null && priceHT !== undefined && tva !== null && tva !== undefined) {
          const priceTTC = priceHT * (1 + tva / 100);
          this.form.get('tarif.priceTTC')?.setValue(priceTTC.toFixed(2), { emitEvent: false });
        }

        if (!tva) {
          this.tvaAlert = {
            success: false,
            msgEchec: 'La TVA doit être remplie avant de continuer.',
            echec: true,
            open: true
          };
        } else {
          this.tvaAlert = { success: true, msgSuccess: '', echec: false, open: false };
        }
      });

    }

    ngOnInit() {
      this.activatedRoute.paramMap.subscribe(params => {
        this.productId = Number(params.get('id'));
        if (this.productId) {
          this.getProduct();
        }
      });
    }

    getProduct() {
      this.productsService.getProduct(this.productId).subscribe(
        (data: any) => {
          console.log('Données récupérées:', data);

          this.form.patchValue({
            general: {
              name: data.name,
              description: data.description,
              active: data.active
            },
            detail: {
              brandId: data.modelId.brandId,
              categoryId: data.categoryId,
              modelId: data.modelId
            },
            tarif: {
              priceTTC: data.priceTTC,
              tva: data.tva,
              priceHT: data.priceHT,
              initialQuantity: data.initialQuantity,
              remainingQuantity: data.remainingQuantity
            }
          });
        },
        err => {
          console.error('Erreur lors de la récupération du produit:', err);
        }
      );
    }
    onSearchChange(args: string, type: string) {
      this.loading = true;
      let filter: any = {};
      if (args) {
        filter.take = 10;
        filter.where = { name: { type: "ilike", value: args }, active: true };
      } else {
        filter.take = 15;
        filter.where = { active: true };
      }
      if (this.form.get('detail.brandId')?.value) {
        this.brandId = this.form.get('detail.brandId')?.value;
      }
      if (type === 'brands') {
        this.form.patchValue({
          detail: {
            modelId: ''
          },

        })}
      if (type === 'brands') {
        this.getBrands(filter);
      } else if (type === 'categories') {
        this.getCategories(filter);
      } else if (type === 'models') {
        this.getModels(filter);
      }
    }

    getBrands(filter: any) {
      filter.select = ['id', 'name'];
      this.brandsService.getBrands(filter).subscribe(
        data => {
          console.log('Données récupérées:', data);
          this.brands = data[0];
        },
        err => {
          console.error('Erreur lors de la récupération des marques:', err);
        },
        () => this.loading = false
      );
    }


    getCategories(filter: any) {
      filter.select = ['id', 'name'];
      this.categoriesService.getCategories(filter).subscribe(
        data => {
          this.categories = data[0];
        },
        err => {
          console.error('Erreur lors de la récupération des catégories:', err);
        },
        () => this.loading = false
      );
    }

    getModels(filter: any) {
      filter.select = ['id', 'name'];
      filter.where = Object.assign(filter.where, {brandId : this.brandId})
      this.modelsService.getModels(filter).subscribe(
        data => {
          this.models = data[0];
        },
        err => {
          console.error('Erreur lors de la récupération des modèles:', err);
        },
        () => this.loading = false
      );
    }

    submit(top: HTMLElement) {
      const tva = this.form.get('tarif.tva')?.value;

      if (!tva || tva <= 0) {
        this.tvaAlert = {
          success: false,
          msgEchec: 'La TVA est obligatoire et doit être supérieure à 0.',
          echec: true,
          open: true
        };
        return;
      }

      let product = {
        name: this.form.value.general.name,
        description: this.form.value.general.description,
        active: this.form.value.general.active,
        brandId: this.form.value.detail.brandId,
        categoryId: this.form.value.detail.categoryId,
        modelId: this.form.value.detail.modelId,
        priceTTC: this.form.value.tarif.priceTTC,
        tva: this.form.value.tarif.tva,
        priceHT: this.form.value.tarif.priceHT,
        initialQuantity: this.form.value.tarif.initialQuantity,
        remainingQuantity: this.form.value.tarif.remainingQuantity
      };

      if (this.form.valid && this.productId) {
        this.validateBtnState = ClrLoadingState.LOADING;
        this.productsService.editProduct(this.productId, product).subscribe(
          (data) => {
            this.validateBtnState = ClrLoadingState.SUCCESS;
            this.alert = { success: true, msgSuccess: "La modification de produit " + data.id + " a été effectuée avec succès !", echec: false, open: true }
          },
          (err) => {
            this.alert = { success: false, msgEchec: err.error.message, echec: true, open: true };
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
