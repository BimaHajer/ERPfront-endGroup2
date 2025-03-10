import { ProductsService } from './../products.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrl: './product-delete.component.css'
})
export class ProductDeleteComponent {
 @Input() allSelected: number[] | undefined
    @Output() closed = new EventEmitter<boolean>();
    @Output() saved = new EventEmitter<boolean>();

    alertError: boolean = false
    validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
    toDisable: number[] = []
    toDelete: number[] = []
    msgAlertDisable: string = ''
    msgAlertDelete: string = ''

    constructor(private ProductsService:ProductsService) { }

    ngOnInit(): void {
      if (this.allSelected?.length != 0) {
        this.ProductsService.getProducts({ loadRelationIds: true, where: { id: {type: "in", value: this.allSelected} } }).subscribe(
          data => {
            data[0].forEach((element:any) => {
             this.toDelete.push(element.id)

              if (this.toDelete.length + this.toDisable.length == this.allSelected?.length) {
                if (this.toDisable.length != 0) {
                  if (this.toDisable.length == 1) {
                    this.msgAlertDisable = "Produit: \" " + this.toDisable + " \" a des relations avec d'autres tables. Vous ne pouvez que le désactiver !"
                  } else
                    this.msgAlertDisable = "Les Produits: \" " + this.toDisable + " \" ont des relations avec d'autres tables. Vous ne pouvez que les désactiver !"
                }
                if (this.toDelete.length != 0) {
                  if (this.toDelete.length == 1) {
                    this.msgAlertDelete = "Voulez-vous vraiment supprimer Produit: \" " + this.toDelete + " \" !"
                  } else
                    this.msgAlertDelete = "Voulez-vous vraiment supprimer Les produits: \" " + this.toDelete + " \" !"
                }
              }
            })
          })
      }
    }

    close() {
      this.closed.emit(false);
    }

    deleteProduct() {
      if (this.allSelected?.length != 0) {
        this.validateBtnState = ClrLoadingState.LOADING
        this.ProductsService.deleteMultiple(this.toDelete, this.toDisable).subscribe(
          data => {
            if (data == true) {
              this.alertError = false
              this.saved.emit(true);
            } else
              this.alertError = true
          },
          err => {
            console.error('Observer got an error: ' + err)
            this.alertError = true
            this.validateBtnState = ClrLoadingState.ERROR
          }
        );
      }
    }
}
